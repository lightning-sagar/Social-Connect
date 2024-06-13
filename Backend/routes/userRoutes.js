import express from "express";
import {signupuser,loginuser,logoutuser,followUnFollow,updateuser,getuserProfile} from "../controllers/user.js";
import protectRoute from "../middleware/protectRoute.js";
 
const router = express.Router();

router.get('/prfile/:id',protectRoute,getuserProfile);
router.post('/signup',signupuser);
router.post('/login',loginuser);
router.post('/logout',logoutuser);
router.post('/follow/:id',protectRoute,followUnFollow);
router.put('/update/:id',protectRoute,updateuser);
export default router