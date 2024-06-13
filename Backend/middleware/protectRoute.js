import User from "../models/user.js"
import jwt from "jsonwebtoken"
const protectRoute = async(req,res,next) => {
    try {
        const token = req.cookies.jwt
        if(!token){
            res.status(401).json({message:"Unauthorized user"})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId).select("-password")
        req.user = user
        next()
    } catch (error) {
        console.log(error)
    }

}

export default protectRoute