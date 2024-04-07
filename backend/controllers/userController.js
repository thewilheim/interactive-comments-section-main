import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { genToken } from "../utils/genToken.js";

//@desc Auth user & get token
//@route Get /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  console.log(req.body);

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    genToken(res, user._id);

    res.status(200).json({
      _id: user.id,
      username: user.username,
      image: user.image,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@desc Register user
//@route Post /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, password, image } = req.body;

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    username,
    password,
    image
  });

  if (user) {
    genToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      username: user.username,
      image: user.image
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc logout user, clear cookie
//@route Post /api/users/logout
//@access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "logged out sucessfully" });
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { authUser, registerUser, logoutUser, getUserById };
