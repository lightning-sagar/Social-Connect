import User from "../models/user.js";
import Post from "../models/post.js";

const getFeedPosts = async(req,res)=>{
    try {
        const user = await User.findById(req.user._id);
        const following = user.following;
        following.push(req.user._id);
        const posts = await Post.find({posted_by:{$in:following}}).sort({createdAt:-1});
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
    }
}
const getPosts = async(req,res)=>{
    try {
        const id = req.params;

        const posts = await Post.findbtId(id);

        if(!posts) return res.status(400).json({message:"Post not found"});

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
    }
}
const createPost = async(req,res)=>{
    try {
        const {posted_by,text,img} = req.body;
        if(!text||!img) return res.status(400).json({message:"All fields are required"});
        const user = await User.findById(posted_by);
        if(!user) return res.status(400).json({message:"User not found"});

        if(user._id.toString() !== req.user._id.toString()){
            return res.status(400).json({message:"not authorized"});
        }
        const maxWords = 500;
        if(text.lenght > maxWords){
            res.status(400).json({message:"Text must be less than 500 words"});
        }
        const newPost = new Post({
            posted_by,
            text,
            img
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.error(error);
    }
}
const deletePost = async(req,res)=>{
    try {
        const {id} = req.params;
        const post = await Post.findById(id);
        if(!post) return res.status(400).json({message:"Post not found"});
        if(post.posted_by.toString() !== req.user._id.toString()){
            return res.status(400).json({message:"not authorized"});
        }
        await Post.findByIdAndDelete(id);
        res.status(200).json({message:"Post deleted successfully"});
    } catch (error) {
        console.error(error);
    }
}
const likeUnLikePost = async(req,res)=>{
    try {
        const {id:postId} = req.params;
        const post = await Post.findById(id);
        if(!post) return res.status(400).json({message:"Post not found"});

        const userLikePost = post.likes.includes(req.user._id);

        if(userLikePost){
            //unlike post
            await post.findByIdAndUpdate(postId,{$pull:{likes:req.user._id}});
            res.status(200).json({message:"Post unliked successfully"});
        }
        else{
            //like post
            post.likes.push(req.user._id);
            await post.save();
            res.status(200).json({message:"Post liked successfully"});
        }

        res.status(200).json({message:"Post liked successfully"});
    } catch (error) {
        console.error(error);
    }
}
const relpyPost = async(req,res)=>{
    try {
        const {id:postId} = req.params;
        const {text} = req.body;
        const userId = req.user._id;
        const userProfilepic = req.user.profilePic;
        const username = req.user.username;
        
        if(!text) return res.status(400).json({message:"All fields are required"});
        const post = await Post.findById(postId);
        if(!post) return res.status(400).json({message:"Post not found"});

        const newReply = {
            userId,
            userProfilepic,
            username,
            text
        }
        post.replies.push(newReply);
        await post.save();
        
        res.status(200).json({message:"Reply added successfully"});
    } catch (error) {
        console.error(error);
    }
}

export {createPost,getPosts,deletePost,likeUnLikePost,relpyPost,getFeedPosts}