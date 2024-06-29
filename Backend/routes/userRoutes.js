import express from "express";
import {signupuser,loginuser,logoutuser,followUnFollow,updateuser,getuserProfile} from "../controllers/user.js";
import protectRoute from "../middleware/protectRoute.js";
 
const router = express.Router();

router.get('/profile/:query',protectRoute,getuserProfile);
router.post('/signup',signupuser);
router.post('/login',loginuser);
router.post('/logout',logoutuser);
router.put('/follow/:userId',protectRoute,followUnFollow);
router.put('/update/:id',protectRoute,updateuser);
export default router