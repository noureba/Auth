import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
    const { userId } = req.body;
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({
        success: false,
        message: "user not found",
      });
    }
      res.json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
        isAcountVerified: user.isAcountVerified,
      },
    });
  } catch (error) {
     return res.json({
      success: false,
      message: error.message
    });
  }
};
