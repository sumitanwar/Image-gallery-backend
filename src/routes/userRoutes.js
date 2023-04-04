const express = require("express");
const { registerUser, loginUser } = require("../controller/userController");

const router = express.Router();
router.route("/user/registration").post(registerUser);
router.route("/user/login").post(loginUser);
module.exports = router;
