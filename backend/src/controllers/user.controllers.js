import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { uploadPhotoOnCloudinary } from "../utils/cloudinary.js";




const userRegistration = asyncHandler(async(req, res)=>
{
        const {email, username, fullname,password} = req.body; //get user Details
        
        if([fullname,email,username,password].some((field)=>field?.trim()==="")){  //user details not empty
            throw new ApiError(400, "All filed fill mendetory")
        }

        const userExist = await User.findOne({      //check user is existing or not
            $or : [{username}, {email}]
        })

        if(userExist){
            throw new ApiError(409, "User alredy Exist", userExist)
        }

        const profilepicLoaclPath =await req.files?.profilepic[0]?.path;
        if(!profilepicLoaclPath){
            throw new ApiError(400, "Avatar file is reqired")
        }

        const profile = await uploadPhotoOnCloudinary(profilepicLoaclPath)
        
        const coverpicLocalpath = await req.files?.coverpic[0]?.path;
        if(!coverpicLocalpath) {
            throw new ApiError(400, "cover photo is reqired")
        }
        const cover = await uploadPhotoOnCloudinary(coverpicLocalpath)
        
        // if (email ==="" || username ==="" || fullname ==="" || password===""){
        //         throw new ApiError(400, "All field filled mendetory")
        // }

   

// res.status(200).json({
//         message : "Print firts news"
//     })   
})


export {userRegistration}