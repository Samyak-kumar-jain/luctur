const express = require("express");
const { upload } = require("../utils/multer.js");
const { uploadMedia } = require("../utils/cloudinary.js");

const router = express.Router();

router.post("/uploadVideo", upload.single("file"), async (req, res) => {
    try {
        // Log file details
        console.log("🔹 Upload request received");
        if (!req.file) {
            console.error("❌ No file uploaded.");
            return res.status(400).json({ message: "No file uploaded", success: false });
        }
        console.log(`📁 File received: ${req.file.originalname} (${req.file.mimetype})`);
        
        // Upload to Cloudinary
        console.log("🚀 Uploading file to Cloudinary...");
        const result = await uploadMedia(req.file.path);
        
        console.log("✅ Upload successful!");
        console.log("🌐 Cloudinary Response:", result);

        res.status(200).json({
            message: "File uploaded successfully",
            data: result,
            success: true
        });
    } catch (e) {
        console.error("❌ Error during upload:", e.message);
        res.status(500).json({
            message: "Error uploading file",
            success: false,
        });
    }
});

module.exports = router;
