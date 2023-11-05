import express from 'express';
import { createUser } from '../controllers/userController.js';

const authRouter = express.Router();

authRouter.post("/register", createUser)


export default authRouter;