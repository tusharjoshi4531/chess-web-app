import express from "express";
import { signin, signup } from "../controllers/userController";

export const userRouter = express.Router();

userRouter.post("/signup", signup);

userRouter.post("/signin", signin);
