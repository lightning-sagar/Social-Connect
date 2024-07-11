import User from "../models/user.js";
import Post from "../models/post.js";
import { v2 as cloudinary } from "cloudinary";
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
const getPosts = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
        
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}
        // filter out the frozen user's posts
        


		res.status(200).json(post);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getuserPost = async(req,res)=>{
    const {username} = req.params;
    
    try {
        console.log(username,"username")
        const user  = await User.findOne({username:username});
         
        if(!user) return res.status(400).json({error:"User not found"}); 

        console.log(user.isFrozen)
        if(user.isFrozen) return res.status(400).json({error:"User has been frozen"});
        const posts = await Post.find({posted_by:user._id}).sort({createdAt:-1});
        console.log(posts)
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({error:"Server error"});
    }
}
  
const createPost = async (req, res) => {
	try {
        console.log(req.body)
		const { posted_by, text } = req.body;
		let { img } = req.body;

		if (!posted_by || !text) {
			return res.status(400).json({ error: "Postedby and text fields are required" });
		}

		const user = await User.findById(posted_by);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (user._id.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to create post" });
		}

		const maxLength = 500;
		if (text.length > maxLength) {
			return res.status(400).json({ error: `Text must be less than ${maxLength} characters` });
		}

		if (img) {
			const uploadedResponse = await cloudinary.uploader.upload(img);
			img = uploadedResponse.secure_url;
		}

		const newPost = new Post({ posted_by, text, img });
		await newPost.save();

		res.status(201).json(newPost);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log(err);
	}
};

const deleteReply = async(req,res)=>{
    try {
        const {rId,pId} = req.params;
        const post = await Post.findById(pId);
        if(!post) return res.status(400).json({error:"Post not found"});

        const reply = post.replies.id(rId);
        if(!reply) return res.status(400).json({error:"Reply not found"});
        if(reply.posted_by.toString() !== req.user._id.toString()){
            return res.status(400).json({error:"not authorized"});
        }

        post.replies.pull(rId);
        await post.save();
        res.status(200).json({message:"Reply deleted successfully"});
        
    } catch (error) {
        res.status(500).json({error:"Server error"});
    }
} 

const deletePost = async(req,res)=>{
    try {
        const {id} = req.params;
        const post = await Post.findById(id);
        if(!post) return res.status(400).json({error:"Post not found"});

        if(post.posted_by.toString() !== req.user._id.toString()){
            return res.status(400).json({error:"not authorized"});
        }

        if(post.img){
            const publicId = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(publicId);
        }

        await Post.findByIdAndDelete(id);
        res.status(200).json({message:"Post deleted successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"Server error"});
    }
}
const likeUnLikePost = async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);
      if (!post) return res.status(400).json({ error: "Post not found" });
  
      const userLikePost = post.likes.includes(req.user._id);
  
      if (userLikePost) {
        // Unlike post
        await Post.findByIdAndUpdate(id, { $pull: { likes: req.user._id } });
        res.status(200).json({ message: "Post unliked successfully" });
      } else {
        // Like post
        post.likes.push(req.user._id);
        await post.save();
        res.status(200).json({ message: "Post liked successfully" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  };
  
  
const relpyPost = async (req, res) => {
    try {
        console.log(req.body)
        const { id: postId } = req.params;
        const { text } = req.body;
        const userId = req.user._id;
        const userProfilepic = req.user.profilePic;
        const username = req.user.username;

        if (!text) return res.status(400).json({ error: "All fields are required" });
        const post = await Post.findById(postId);
        if (!post) return res.status(400).json({ error: "Post not found" });

        const newReply = {
            userId,
            userPic:userProfilepic,
            username,
            text
        };
        console.log(newReply)
        post.replies.push(newReply);
        await post.save();

        res.status(200).json({ reply: newReply });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};


export {createPost,getPosts,getuserPost,deletePost,likeUnLikePost,relpyPost,getFeedPosts,deleteReply}