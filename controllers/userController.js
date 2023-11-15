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
      getUsers,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Fetching All User Failed!!!" });
  }
});

export const getAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getUser = await User.findById(id);
    if (!getUser) {
      return res
        .status(404)
        .json({ status: false, message: "Users Not found" });
    }
    return res.status(201).json({
      status: true,
      message: " User fetched Successfully",
      getUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Fetching User Failed!!!" });
  }
});

export const deleteAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      return res
        .status(404)
        .json({ status: false, message: "Users Not found" });
    }
    return res.status(201).json({
      status: true,
      message: " User Deleted Successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Deleting User Failed!!!" });
  }
});

export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).json({
      status: true,
      message: "User Updated Successfully",
      updateUser,
    });
  } catch (error) {
    console.log("Update User error", error);
    return res.status(500).json({
      status: false,
      message: "ISE In update user",
    });
  }
});

export const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      status: true,
      message: "User Blocked Successfully",
      block
    });
  } catch (error) {
    console.log("Block User Error", error);
    return res.status(500).json({
      status: false,
      message: "ISP block user",
    });
  }
});

export const unBlockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const unBlock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      status: true,
      message: "User UnBlocked Successfully",
      unBlock
    });
  } catch (error) {
    console.log("UnBlock User Error", error);
    return res.status(500).json({
      status: false,
      message: "ISP UnBlock user",
    });
  }
});
