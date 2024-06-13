import User from "../models/user.js";
import bcrypt from "bcryptjs"
import genereateTokenanssetcookie from "../utils/helper/cookies.js";
import user from "../models/user.js";

const getuserProfile = async(req,res)=>{
 try {
    const {username} = req.params;
    const user = await User.findOne({username}).select("-password").select("-updatedAt");
    if(!user){
        res.status(404).json({error:"User not found"});
    }
    res.status(200).json(user);
 } catch (error) {
    console.log(error);
 }   
}
const signupuser = async (req, res) => {
	try {
		const { name, email, username, password } = req.body;
        console.log(name, email, username, password)
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
		res.status(500).json({ error: err.message });
		console.log("Error in signupUser: ", err.message);
	}
};
  
  const loginuser = async(req,res)=>{
    try {
        const {username,password}=req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = user && (await bcrypt.compare(password,user?.password || ""));
        if(!user || !isPasswordCorrect){
            res.status(400).json({error:"Invalid credentials"});
        }
            genereateTokenanssetcookie(user._id,res);
            res.status(200).json(user);
    } catch (error) {
        console.error(error);
    }
}
const logoutuser = async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:1});
        res.status(200).json({error:"Successfully logged out"});
    } catch (error) {
        console.error(error);
    }
}
const followUnFollow = async(req,res)=>{
    try {
        const {userId}=req.params;
        const userToModify = await User.findById(userId);
        if(!userToModify){
            res.status(404).json({error:"User not found"});
        }
        const currentUser = await User.findById(req.user._id);
        if(id === req.user._id.toString()){
            res.status(400).json({error:"You cannot follow yourself"});
        }
        const isFollowing = currentUser.followers.includes(id);
        if(isFollowing){
            //unfollow
            await user.findByIdAndUpdate(req.user._id,{$pull:{followers:id}});
            await user.findByIdAndUpdate(id,{$pull:{following:req.user._id}});
            res.status(200).json(user);
        }else{
            //follow
            await user.findByIdAndUpdate(req.user._id,{$push:{followers:id}});
            await user.findByIdAndUpdate(id,{$push:{following:req.user._id}});
            res.status(200).json(user);         
        }
    } catch (error) {
        console.error(error);
    }   
}
const updateuser = async(req,res)=>{
    try {
        const {name,username,email,password,profilePic,bio}=req.body;
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
            const hashedPassword = await bcrypt.hash(password || user.password, salt);
        }
        const updatedUser = await User.findByIdAndUpdate(userId,{
            name:name || user.name,
            username:username || user.username,
            email:email || user.email,
            password:hashedPassword || user.password,
            profilePic:profilePic || user.profilePic,
            bio:bio || user.bio
        },{new:true});
        if(updatedUser){
            res.status(200).json(updatedUser);
        }else{
            res.status(400).json({error:"Failed to update user"});
        }
    } catch (error) {
        console.error(error);
    }
}

export {signupuser,loginuser,logoutuser,followUnFollow,updateuser,getuserProfile}