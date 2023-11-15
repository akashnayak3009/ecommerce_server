import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createUser,
  deleteAUser,
  getAUser,
  getAllUser,
  loginUserCtrl,
  updateUser,
} from "../controllers/userController.js";

const authRouter = express.Router();

authRouter.post("/register", createUser);
authRouter.post("/login", loginUserCtrl);

authRouter.get("/all-users", authMiddleware, getAllUser);
authRouter.get("/:id", authMiddleware, getAUser);

authRouter.put("/:id", authMiddleware, updateUser);

authRouter.delete("/:id", authMiddleware, deleteAUser);

export default authRouter;
