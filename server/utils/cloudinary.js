const cloudinary = require('cloudinary').v2;
const dotenv = require("dotenv")
dotenv.config({});

cloudinary.config({
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    cloud_name: process.env.CLOUD_NAME,
})

const uploadMedia = async(file)=>{
    try {
        const uploadResponse = await cloudinary.uploader.upload(file,{
            resource_type:"auto",

        })
        return uploadResponse
        
    } catch (error) {
        console.log(error)
        
    }
}
const deleteMedia = async(publicId)=>{
    try {
        await cloudinary.uploader.destroy(publicId)
        
    } catch (error) {
        console.log(error);
        
    }
}

const deleteVideo = async(publicId)=>{

    try{
        await cloudinary.uploader.destroy(publicId,{resource_type:"video"})

    }catch(error){
        console.log(error);
    }
}

module.exports = {uploadMedia,deleteMedia, deleteVideo}