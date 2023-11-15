import User from "../models/userModel.js";
import jwt, { decode } from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        if (user) {
          req.user = user;
          next();
        } else {
          return res
            .status(500)
            .json({ status: false, message: "User Not Found" });
        }
      }
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, message: "Not Authorized, Please Login Again" });
    }
  } else {
    return res
      .status(500)
      .json({ status: false, message: "No Token Provided" });
  }
});

export const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  try {
    const isAdmin = await User.findOne({ email });
    if (!isAdmin) {
      return res.status(404).json({
        status: false,
        message: "Admin Not Found",
      });
    }
    if (isAdmin.role !== "admin") {
      return res.status(403).json({
        status: false,
        message: "You are not admin role",
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
});





// export const restrictTo=(...role)=>{
//   return asyncHandler(async(req,res,next)=>{
//     if(!role.includes(req.user.role)){
//       return res.status(403).json({
//         status:false,
//         message:"Your are not authorized"
//       })
//     }else{
//       next();
//     }
//   })
// }
