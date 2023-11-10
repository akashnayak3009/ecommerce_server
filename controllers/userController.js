import { generateToken } from "../config/jwtToken.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

export const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        status: false,
        message: "User Already Exists",
      });
    }
    const newUser = await User.create(req.body);

    return res.status(200).json({
      status: true,
      message: "User Created",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "User not created",
    });
  }
});

export const loginUserCtrl = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });

    if (findUser && (await findUser.isPasswordMatched(password))) {
      const { _id, firstname, lastname, email, mobile } = findUser;
      res.status(200).json({
        status: true,
        _id,
        firstname,
        lastname,
        email,
        mobile,
        token: generateToken(_id),
      });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Login doesn't happend!!!" });
  }
});

export const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    if (!getUsers) {
      return res
        .status(404)
        .json({ status: false, message: "Users Not found" });
    }
    return res.status(201).json({
      status: true,
      message: "All User fetched Successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Fetching All User Failed!!!" });
  }
});
