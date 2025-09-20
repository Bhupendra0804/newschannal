import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { uploadPhotoOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const userRegistration = asyncHandler(async (req, res) => {
    const { email, username, fullname, password } = req.body; //get user Details

    if ([fullname, email, username, password].some((field) => field?.trim() === "")) {  //user details not empty
        throw new ApiError(400, "All filed fill mendetory")
    }

    const userExist = await User.findOne({      //check user is existing or not
        $or: [{ username }, { email }]
    })

    if (userExist) {
        throw new ApiError(409, "User alredy Exist", userExist)
    }

    const profilepicLoaclPath = await req.files?.profilepic[0]?.path;
    console.log(profilepicLoaclPath);
    
    if (!profilepicLoaclPath) {
        throw new ApiError(400, "Avatar file is reqired")
    }

    const profile = await uploadPhotoOnCloudinary(profilepicLoaclPath)

    const coverpicLocalpath = await req.files?.coverpic[0]?.path;
    if (!coverpicLocalpath) {
        throw new ApiError(400, "cover photo is reqired")
    }
    const cover = await uploadPhotoOnCloudinary(coverpicLocalpath) 

    const userData = await User.create(
        {
            fullname,
            username,
            email,
            password,
            profilepic : profile.url || "",
            coverpic : cover.url || ""
        }
    )

    const checkUser = await User.findById(userData._id).select(-password -refreshToken )
    if(!checkUser){
        throw new ApiError(500, "User Creation failed due to while register wrong Entry in the field")
    }

    return res.status(201).json(
        new ApiResponse(200, userData, "Created User Successfully" )    )
})


export { userRegistration }