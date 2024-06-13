import mongoose from "mongoose";
import user from "./user.js";

const postSchema = new mongoose.Schema({
    posted_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type:String,
        maxLength:500
    },
    img:{
        type:String
    },
    likes:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"User",
        default:[]
    },
    replies:[
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Comment",
                required:true
            },
            text:{
                type:String,
                maxLength:500
            },
            userPic:{
                type:String,
                required:true
            },
            username:{
                type:String,
                required:true
            },
            
        }
    ]
},{timestamps:true})

const Post = mongoose.model("Post",postSchema)

export default Post