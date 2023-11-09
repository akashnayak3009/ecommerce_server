import User from "../models/userModel.js";
import asyncHandler from 'express-async-handler'

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
