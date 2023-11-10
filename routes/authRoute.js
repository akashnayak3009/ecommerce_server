import express from "express";
import { createUser, deleteAUser, getAUser, getAllUser, loginUserCtrl } from "../controllers/userController.js";

const authRouter = express.Router();

authRouter.post("/register", createUser);
authRouter.post("/login", loginUserCtrl);

authRouter.get("/all-users",getAllUser)
authRouter.get("/:id",getAUser)

authRouter.delete("/:id",deleteAUser); 

export default authRouter;
