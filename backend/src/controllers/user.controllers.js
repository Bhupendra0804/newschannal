import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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

    const profileLocalPath = await req.files?.profilePic[0]?.path;
    const coverLocalPath =await req.files?.coverPic[0]?.path;

    if(!profileLocalPath){
        throw new ApiError(400, "Profile Pic Requier")
    }
    const profilePic = await uploadOnCloudinary(profileLocalPath);
    const coverPic = await uploadOnCloudinary(coverLocalPath);


    const userData = await User.create(
        {
            username,
            email,
            fullname,
            profilepic : profilePic.url || "",
            coverpic : coverPic.url || "",
            password,
        }
    )
    // console.log(userData)
    const checkUser = await User.findById(userData._id).select("-password -refreshToken" )
    if(!checkUser){
        throw new ApiError(500, "User Creation failed due to while register wrong Entry in the field")
    }

    return res.status(201).json(
        new ApiResponse(200, userData, "Created User Successfully" )    )
})


export { userRegistration }