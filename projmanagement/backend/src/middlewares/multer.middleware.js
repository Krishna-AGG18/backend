import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configure Cloudinary with credentials from .env
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer to use Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "workloom_uploads",
        allowed_formats: ["jpg", "jpeg", "png", "gif", "pdf", "docx"], // Allow specific file types
        public_id: (req, file) => `${Date.now()}-${file.originalname.split('.')[0]}` // Use original name (without extension)
    },
});

export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Increased limit to 5MB for attachments
    }
});