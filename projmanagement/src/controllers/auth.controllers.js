import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiErrors } from "../utils/api-errors.js";
import { emailVerificationMailgenContent, sendEmail } from "../utils/mail.js";
import jwt from "jsonwebtoken"



const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({
            validateBeforeSave: false,
        });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiErrors(
            500,
            "Something went wrong! whilel genrating the access token",
            [],
        );
    }
};

// for registering a new user
const registerUser = asyncHandler(async (req, res) => {
    const { email, username, password, role } = req.body;

    const existingUser = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (existingUser) {
        throw new ApiErrors(
            409,
            "User with email or username already exist",
            [],
        );
    }

    // User - mongoose model , user - jo hamne methods attach kiye the model me wo ispe available honge once its created not to the User
    const user = await User.create({
        email,
        password,
        username,
        isEmailVerified: false,
    });

    const { unHashedToken, hashedToken, tokenExpiry } =
        user.generateTemporaryToken();

    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = tokenExpiry;

    await user.save({ validateBeforeSave: false });

    await sendEmail({
        email: user?.email,
        subject: "Please verify your email",
        mailgenContent: emailVerificationMailgenContent(
            user.username,
            `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`,
        ),
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
    );

    if (!createdUser) {
        throw new ApiErrors(
            500,
            "Something went wrong, while registering the user",
        );
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                200,
                { user: createdUser },
                "User registered successfully and verification email has been sent on your email",
            ),
        );
});

// for login
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        throw new ApiErrors(400, "Email is required!");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiErrors(400, "User does not exists!");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiErrors(400, "Invalid credentials.");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        user._id,
    );

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
    );

    //save tokens in cookies as well

    //options is just a object that specifies that cokkies are http and browser can edit them only
    const options = {
        httpOnly: true,
        secure: true,
    };

    //return and set cookies
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                },
                "User logged in successfully.",
            ),
        );
});

//for logout
const logoutUser = asyncHandler(async (req, res, next) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: "", //mark the refresh token as empty in the database
            },
        },
        {
            new: true, //return a new updated object
        },
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"));
});

//get current user
const getCurrentUser = asyncHandler(async (req, res, next) => {
    return res
        .status(200)
        .json(
            new ApiResponse(200, req.user, "Current user fetched successfully"),
        );
});

//verifyEmail
const verifyEmail = asyncHandler(async (req, res, next) => {
    const { verificationToken } = req.params; //verificationToken : this is available from route

    if (!verificationToken) {
        throw new ApiErrors(400, "Email verification token is missing");
    }

    let hashedToken = crypto
        .createHash(256)
        .update(verificationToken)
        .digest("hex");

    const user = await User.findOne({
        emailVerificationToken: hashedToken,
        emailVerificationExpiry: { $gt: Date.now() },
    });

    if (!user) {
        throw new ApiErrors(
            400,
            "Email verification token is invalid or expired",
        );
    }

    user.emailVerificationToken = undefined;
    user.emailVerificationExpiry = undefined;

    user.isEmailVerified = true;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                isEmailVerified: true,
            },
            "Email is verified",
        ),
    );
});

//resend email verification 
const resendEmailVerification = asyncHandler(async (req,res,next) => {
    const user = await User.findById(req.user?._id)

    if(!user){
        throw new ApiErrors(404,"User does not exists")
    }

    if(user.isEmailVerified){
        throw new ApiErrors(409,"User email already verified")
    }

    const {unHashedToken, hashedToken, tokenExpiry} = user.generateTemporaryToken()

    user.emailVerificationToken = hashedToken
    user.emailVerificationExpiry = tokenExpiry

    await user.save({validateBeforeSave : false})

    await sendEmail({
        email : user?.email,
        subject : "Please verify your email",
        mailgenContent : emailVerificationMailgenContent(
            user.username,
            `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`,
        )
    })

    return res.status(200).json(new ApiResponse(200,{},"Email has been sent successfully to your email id"))

})

//refresh acess token
const refreshAccessToken = asyncHandler(async (req,res,next) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    
    if(!incomingRefreshToken){
        throw new ApiErrors(401,"Unauthorised access")
    }
    
    try {
        const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
        
        const user = await User.findById(decodedToken?._id)

        if(!user){
        throw new ApiErrors(401,"Invalid refresh token")
    }

    if(incomingRefreshToken !== user?.refreshToken){
        throw new ApiErrors(401,"Refresh token is expired")
    }

    const options = {
        httpOnly : true,
        secure : true,
    }

    const {accessToken, refreshToken : newRefreshToken} = await generateAccessAndRefreshTokens(user._id)

    user.refreshToken = newRefreshToken;
    await user.save()

    return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",newRefreshToken,options).json(new ApiResponse(200,{accessToken,refreshToken : newRefreshToken},"Access token refreshed"))

    } catch (error) {
        throw new ApiErrors(401,"invalid refresh token")
    }
})

// const getCurrentUser = asyncHandler(async (req,res,next) => {
// })
// const getCurrentUser = asyncHandler(async (req,res,next) => {
// })
// const getCurrentUser = asyncHandler(async (req,res,next) => {
// })
export { registerUser, login, logoutUser, getCurrentUser, verifyEmail };
