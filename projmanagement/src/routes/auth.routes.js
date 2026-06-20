import { Router } from "express";
import { login, logoutUser, registerUser } from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";


import { userRegisterValidator, userLoginValidator } from "../validators/index.js";
import {verifyJWT} from "../middlewares/auth.middleware.js"
const router = Router();

router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(login);

//secure routes
router.route("/logout").post(verifyJWT,logoutUser); //get the user details in between the req using the auth middleware and then log out the user.


export default router;
