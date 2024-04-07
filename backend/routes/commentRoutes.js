import express from "express";
import { getComments, updateComment, deleteComment, createComment, createReply, updateReply, deleteReply } from "../controllers/commentController.js";
import {protect} from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/').get(protect,getComments).post(protect,createComment)
router.route("/:id").put(protect, updateComment).delete(protect,deleteComment)
router.route('/:id/reply').post(protect,createReply).put(protect,updateReply)
router.route('/:id/deleteReply').put(protect,deleteReply)
export default router;
