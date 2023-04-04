const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: "../config/config.env" });
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Enter name ,name field is required"],
  },
  email: { type: String, required: [true, "Enter email,email is required"] },
  password: {
    type: String,
    required: [true, "Enter password ,password is required"],
  },
});

UserSchema.methods.getToken = function () {
  const token = jwt.sign(
    { id: this._id },
    process.env.SECRET || "D5FSS555DGDG5DC4F4G983G8H",
    {
      expiresIn: process.env.JWTEXPIRES || "5d",
    }
  );
  return token;
};
UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});
const UserColl = mongoose.model("UserCollection", UserSchema);

module.exports = UserColl;
