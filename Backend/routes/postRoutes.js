import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {createPost,getPosts,deletePost,likeUnLikePost,relpyPost,getFeedPosts} from "../controllers/post.js";
const router = express.Router();

router.get('/feed',protectRoute,getFeedPosts);
router.get('/:id',protectRoute,getPosts);
router.post('/create',protectRoute,createPost);
router.delete('/:id',protectRoute,deletePost);
router.post('/like/:id',protectRoute,likeUnLikePost);
router.post('/relpy/:id',protectRoute,relpyPost);

export default router
