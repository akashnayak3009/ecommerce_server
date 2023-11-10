import express from "express";
import { createUser, getAllUser, loginUserCtrl } from "../controllers/userController.js";

const authRouter = express.Router();

authRouter.post("/register", createUser);
authRouter.post("/login", loginUserCtrl);

authRouter.get("",getAllUser)

export default authRouter;
