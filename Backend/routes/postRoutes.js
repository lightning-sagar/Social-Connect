import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {createPost,getPosts,deletePost,likeUnLikePost,relpyPost,getFeedPosts, getuserPost} from "../controllers/post.js";
const router = express.Router();


router.get('/feed',protectRoute,getFeedPosts);
router.get('/:id',getPosts);
router.get('/user/:username',getuserPost);
router.post('/create', protectRoute,createPost);
router.delete('/:id',protectRoute,deletePost);
router.put('/like/:id',protectRoute,likeUnLikePost);
router.put('/reply/:id', protectRoute, relpyPost);

export default router
