import mongoose, {Schema} from "mongoose";

const newsSchema = new Schema(
    {
        newsImage :{
            type : String,   //url cloudinary
            required: true
        },
        title :{
            type : String,
            required : true,
        },
        description : {
            type : String,
            required : true
        },
        video : {
            type : String,
        },
        viwes:{
            type : Number,
            default : 0
        },
        isPublished : {
            type : Boolean, 
             default: true
        },
        Auther:{
            type : Schema.Types.ObjectId,
            ref : "User"
        }
    },
    {
        timestamps: true
    }
)
export const News = mongoose.model("News", newsSchema)