import express from "express";
import {authUser, registerUser, logoutUser, getUserById} from '../controllers/userController.js'


const router = express.Router();

router.route('/').post(registerUser)
router.route('/:id').get(getUserById)
router.post("/logout",logoutUser)
router.post("/auth",authUser)



export default router;
