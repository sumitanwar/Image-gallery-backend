const jwt = require("jsonwebtoken");
const UserColl = require("../models/userModel");
require("dotenv").config({ path: "../config/config.env" });
exports.isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Token Missing / Login first" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.SECRET || "D5FSS555DGDG5DC4F4G983G8H"
    );
    req.user = await UserColl.findById(decoded.id);
    // console.log(req.user);
    next();
  } catch (e) {
    return res.status(400).json({ success: false, message: e.message });
  }
};
