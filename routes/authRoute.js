import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
import {
  blockUser,
  createUser,
  deleteAUser,
  getAUser,
  getAllUser,
  loginUserCtrl,
  unBlockUser,
  updateUser,
} from "../controllers/userController.js";

const authRouter = express.Router();

authRouter.post("/register", createUser);
authRouter.post("/login", loginUserCtrl);

authRouter.get("/all-users", authMiddleware, getAllUser);
authRouter.get("/:id", authMiddleware, isAdmin, getAUser);

authRouter.put("/:id", authMiddleware, isAdmin, updateUser);
authRouter.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
authRouter.put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser);

authRouter.delete("/:id", authMiddleware, deleteAUser);

export default authRouter;
