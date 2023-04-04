const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
exports.Server = () => {
  const URI =
    process.env.URL ||
    "mongodb+srv://Sumitkumar:Sk123456@cluster0.gpgh4wq.mongodb.net/idreamCareer?retryWrites=true&w=majority";
  // console.log(process.env.URL);
  mongoose.connect(URI).then(() => {
    console.log("Connected to DB");
  });
};
