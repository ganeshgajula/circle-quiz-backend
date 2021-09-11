const jwt = require("jsonwebtoken");

const authVerify = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("authverify", { token });
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log({ decoded });
    req.user = { userId: decoded.userId };
    return next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access, please add the token.",
      errorMessage: error.message,
    });
  }
};

module.exports = { authVerify };
