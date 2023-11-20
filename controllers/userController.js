import { generateToken, generateRefreshToken } from "../config/jwtToken.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import { validateMongodbId } from "../utils/validateMongodbId.js";

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

    const user = await User.findOne({ email });

    if (!user || !(await user.isPasswordMatched(password))) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid email or password" });
    }

    const { _id, firstname, lastname, mobile } = user;
    const refreshToken = generateRefreshToken(user._id);

    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      {
        refreshToken,
      },
      { new: true }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    const authToken = generateToken(_id);
    return res.status(200).json({
      status: true,
      _id,
      firstname,
      lastname,
      email,
      mobile,
      token: authToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      status: false,
      message: "Login failed. Please try again later.",
    });
  }
});

export const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    return res.json({ message: "No Refresh Token in cookies" })
  }
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    return res.json({ message: "No refresh token present in db or not matched" })
  };
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      const accessToken = generateToken(user?.id);
      res.json({ accessToken });
    }
  })
});

export const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    return res.json({ message: "No Refresh Token in cookies" })
  }
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
   res.clearCookie('refreshToken',{
    httpOnly:true,
    secure: true
   })
   return res.status(204); // Forbidden
  };
  await User.findByIdAndUpdate(refreshToken, {
    refreshToken: ""
  });
  res.clearCookie('refreshToken',{
    httpOnly:true,
    secure: true
   })
   return res.status(204); //NO content
})

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
  validateMongodbId(id);
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
  validateMongodbId(id);
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
  validateMongodbId(id);
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
  validateMongodbId(id);
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
  validateMongodbId(id);
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
