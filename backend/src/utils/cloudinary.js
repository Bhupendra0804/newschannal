import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'


cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_Key,
    api_secret : process.env.CLOUDINARY_API_Secret
})

const uploadPhotoOnCloudinary = async (loacFilePath)=>{
    try {
        if(!loacFilePath) return null;
        //upload file on cloudinary
        const imageResponse =await cloudinary.uploader.upload(loacFilePath,{
            resource_type : "auto"
        })
        console.log("File uploaded cloudinary", imageResponse.url); 
        return imageResponse 


    } catch (error) {
        fs.unlink(loacFilePath)
        return null
    }

}

export {uploadPhotoOnCloudinary}

