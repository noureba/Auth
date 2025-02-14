import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";

//register
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      success: false,
      message: "Messing details",
    });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "user already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "welcome",
      text: `hello ${name}, thank you for regisration.`,
    };
    await transporter.sendMail(mailOptions);
    return res.json({
      success: true,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//login
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and password is required",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid Email",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid password",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 20 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({
      success: true,
      message: "Logout succes",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//send verefaction otp to user email
export const sendVerfiyOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    if (user.isAcountVerified) {
      return res.json({
        success: false,
        message: "Account already verfied",
      });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Acount verivation otp",
      text: `yout otp is ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Verivation otp sent to your email",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//verfiy email
export const verfiyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp) {
    return res.json({
      success: false,
      message: "Details messing",
    });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({
        success: false,
        message: "user not found",
      });
    }
    if (user.verifyOtp == "" || user.verifyOtp !== otp) {
      console.log(user.verifyOtp);
      return res.json({
        success: false,
        message: "invalid otp",
      });
    }
    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({
        success: false,
        message: "otp expired",
      });
    }

    user.isAcountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();

    return res.json({
      success: true,
      message: "Email verified successfuly",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//check user if is authenticated
export const isAuthenticated = (req, res) => {
  try {
    return res.json({
      success: true,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//send otp for reset password
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({
      success: false,
      message: "Email is required",
    });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password reset otp",
      text: `yout reset password otp is ${otp}`,
    };
    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "otp sent to your email",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// reset paassword
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.json({
      success: false,
      message: "email or otp or new password are required",
    });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "user not found",
      });
    }
    if (user.resetOtp == "" || user.resetOtp !== otp) {
      return res.json({
        success: false,
        message: "Invalid otp",
      });
    }
    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({
        success: false,
        message: "otp is expired",
      });
    }
    const hashPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save()
    return res.json({
      success: true,
      message: "you password change succssfuly"
    })
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
