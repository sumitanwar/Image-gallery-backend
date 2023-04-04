const UserColl = require("../models/userModel");
const bcrypt = require("bcryptjs");
// Register User to Db
exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(403)
      .json({ success: false, message: "name,email,password are mandatory" });
  }
  let user = await UserColl.findOne({ email });
  if (user) {
    return res
      .status(403)
      .json({ success: false, message: "User already Exist" });
  }
  user = await UserColl.create(req.body);
  try {
    res.status(200).json({ success: true, user });
  } catch (e) {
    res.status(401).json({ success: false, message: e.message });
  }
};
// User login
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(500)
      .json({ success: false, message: "email and password are mandatory " });
  }

  let user = await UserColl.findOne({ email });
  if (!user) {
    return res
      .status(500)
      .json({ success: false, message: "User does not exist" });
  }
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    return res
      .status(500)
      .json({ success: false, message: "Invalid credentials" });
  }
  const token = user.getToken();
  try {
    res.status(200).json({ success: true, user, token });
  } catch (e) {
    res.status(401).json({ success: false, message: e.message });
  }
};
// get all Users
exports.getAllIUsers = async (req, res, next) => {
  const users = await UserColl.find();
  try {
    res.status(200).json({ success: true, users });
  } catch (e) {
    res.status(401).json({ success: false, message: e.message });
  }
};

//deleting User
exports.deleteUser = async (req, res, next) => {
  const user = await UserColl.findByIdAndDelete({ _id: req.params.id });
  try {
    res
      .status(200)
      .json({ success: true, message: "User Deleted Successfully" });
  } catch (e) {
    res.status(401).json({ success: false, message: e.message });
  }
};
