import jwt from "jsonwebtoken";

const useAuth = async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token)
  if (!token) {
    return res.json({
      success: false,
      message: "Not authorized. token not found",
    });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
    } else {
      return res.json({
        success: false,
        message: "Not authorized. login again",
      });
    }

    next();
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export default useAuth;
