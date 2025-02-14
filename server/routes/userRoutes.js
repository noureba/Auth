import express from "express";
import useAuth from "../middleware/useAuth.js";
import { getUserData } from "../controllers/userControllers.js";

const userRouter = express.Router()

userRouter.get("/data", useAuth, getUserData)


export default userRouter