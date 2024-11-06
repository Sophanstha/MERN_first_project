import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

// it allow you to upload the files .

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Function to upload file to Cloudinary
const uploadFileToCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" });
        fs.unlinkSync(localFilePath); // Delete file only if upload is successful
        return response.url;  // Return only the URL
    } catch (error) {
        fs.unlinkSync(localFilePath); // Remove local file in case of error
        console.error("Error uploading to Cloudinary:", error);
        return null;
    }
};
export {uploadFileToCloudinary}