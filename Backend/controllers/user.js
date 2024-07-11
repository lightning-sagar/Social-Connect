import User from "../models/user.js";
import bcrypt from "bcryptjs"
import genereateTokenanssetcookie from "../utils/helper/cookies.js";
import user from "../models/user.js";
import generateTokenAndSetCookie from "../utils/helper/cookies.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import Post from "../models/post.js";
const getuserProfile = async (req, res) => {
  const { query } = req.params;

  try {
    let user;
    if(mongoose.Types.ObjectId.isValid(query)){
      user = await User.findById(query).select("-password -updatedAt");
    }
    else{
      user = await User.findOne({ username: query }).select("-password -updatedAt");
    }
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const signupuser = async (req, res) => {
    try {
      const { name, email, username, password } = req.body;
      console.log(name, email, username, password);
      const user = await User.findOne({ $or: [{ email }, { username }] });
  
      if (user) {
        return res.status(400).json({ error: "User already exists" });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        name,
        email,
        username,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      if (newUser) {
        generateTokenAndSetCookie(newUser._id, res);
  
        res.status(201).json({
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          username: newUser.username,
          bio: newUser.bio,
          profilePic: newUser.profilePic,
        });
      } else {
        res.status(400).json({ error: "Invalid user data" });
      }
    } catch (err) {
      console.log("Error in signupUser:", err.message);
      res.status(500).json({ error: err.message });
    }
  };
  
  const loginuser = async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log(username, password, "loginuser");
  
      const user = await User.findOne({ username });
      console.log(user, "found");
  
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials no user' });
      }
  
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
  
      if (!isPasswordCorrect) {
        return res.status(400).json({ error: 'Invalid credentials no pass' });
      }

      if(user.isFrozen){
        user.isFrozen = false;
        await user.save();
      }
  
      generateTokenAndSetCookie(user._id, res);
  
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        bio: user.bio,
        profilePic: user.profilePic,
      });
    } catch (error) {
      console.error('Error in loginuser:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
const logoutuser = async(req,res)=>{
  try {
		res.cookie("jwt", "", { maxAge: 1 });
		res.status(200).json({ message: "User logged out successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in signupUser: ", err.message);
	}
}
const followUnFollow = async (req, res) => {
  try {
    console.log(req.params,"wo");
    const { userId } = req.params;
    const id = req.user._id.toString();
    const userToModify = await User.findById(userId);
    if (!userToModify) {
      return res.status(404).json({ error: "User not found" });
    }

    if (id === userId) {
      return res.status(400).json({ error: "You cannot follow yourself" });
    }

    const currentUser = await User.findById(req.user._id);
    const isFollowing = userToModify.followers.includes(id);

    if (isFollowing) {
      // unfollow
      await User.findByIdAndUpdate(userId, { $pull: { followers: id } });
      await User.findByIdAndUpdate(id, { $pull: { following: userId } });
      return res.status(200).json({ message: "Unfollowed successfully" });
    } else {
      // follow
      await User.findByIdAndUpdate(userId, { $push: { followers: id } });
      await User.findByIdAndUpdate(id, { $push: { following: userId } });
      return res.status(200).json({ message: "Followed successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getSuggestedUsers = async (req, res) => {
	try {
		const userId = req.user._id;

		const usersFollowedByYou = await User.findById(userId).select("following");

		const users = await User.aggregate([
			{
				$match: {
					_id: { $ne: userId },
				},
			},
			{
				$sample: { size: 10 },
			},
		]);
		const filteredUsers = users.filter((user) => !usersFollowedByYou.following.includes(user._id));
		const suggestedUsers = filteredUsers.slice(0, 4);

		suggestedUsers.forEach((user) => (user.password = null));

		res.status(200).json(suggestedUsers);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
 
const updateuser = async(req,res)=>{
    try {
        const {name,username,email,bio}=req.body;
        let {profilePic,password}=req.body;
        const userId = req.user._id;
        const user = await User.findById(userId);
        if(req.params.id !== userId.toString()){
            res.status(401).json({error:"Unauthorized user"});
        }
        if(!user){
            res.status(404).json({error:"User not found"});
        }
        if (password) {
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password || user.password, salt);
        }
        if(profilePic){
          if(user.profilePic){
            await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0])
          }

          const uplodedRes = await cloudinary.uploader.upload(profilePic)
          console.log(uplodedRes)
          profilePic = uplodedRes.secure_url
        }
        const updatedUser = await User.findByIdAndUpdate(userId,{
            name:name || user.name,
            username:username || user.username,
            email:email || user.email,
            password:password || user.password,
            profilePic:profilePic || user.profilePic,
            bio:bio || user.bio
        },{new:true});

        await Post.updateMany(
          { "replies.userId": userId },
          {
            $set: {
              "replies.$[reply].username": username||user.username,
              "replies.$[reply].userPic": user.userPic,
            },
          },
          { arrayFilters: [{ "reply.userId": userId }] }
        );

        updatedUser.password = null;
        if(updatedUser){
            res.status(200).json(updatedUser);
        }else{
            res.status(400).json({error:"Failed to update user"});
        }
    } catch (error) {
        console.error(error);
    }
}

const freezeAccount = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		if (!user) {
			return res.status(400).json({ error: "User not found" });
		}

		user.isFrozen = true;
		await user.save();

		res.status(200).json({ success: true });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export {signupuser,loginuser,logoutuser,followUnFollow,updateuser,getuserProfile,getSuggestedUsers,freezeAccount}