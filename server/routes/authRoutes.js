import express from "express";
import {
  isAuthenticated,
  login,
  logout,
  register,
  resetPassword,
  sendResetOtp,
  sendVerfiyOtp,
  verfiyEmail,
} from "../controllers/authControllers.js";
import useAuth from "../middleware/useAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp", useAuth, sendVerfiyOtp);
authRouter.post("/verify-account", useAuth, verfiyEmail);
authRouter.post("/is-auth", useAuth, isAuthenticated);
authRouter.post("/send-reset-otp", sendResetOtp);
authRouter.post("/reset-password", resetPassword);



export default authRouter;
