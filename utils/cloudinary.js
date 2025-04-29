// utils/cloudinary.js
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: (req, file) => {
      let resourceType = "image"; // default
  
      // If it's PDF or Audio (raw files), set resource_type to 'raw'
      if (file.mimetype === "application/pdf") {
        resourceType = "raw";  // PDFs should be 'raw'
      } else if (file.mimetype.startsWith("audio")) {
        resourceType = "raw";  // Audio should be 'raw'
      } else if (file.mimetype.startsWith("video")) {
        resourceType = "video";  // Video should be 'video'
      }
  
      console.log("File MIME Type:", file.mimetype); // Debug log
  
      return {
        folder: "my-app-media",  // Folder in Cloudinary
        resource_type: resourceType,  // Correct resource type
        public_id: `${Date.now()}-${file.originalname}`, // Optional for custom naming
        access_mode: "public", // Force public delivery

      };
    },
  });

const upload = multer({ storage });

module.exports = { cloudinary, upload };
