const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./src/routes/userRoutes");
const imageRouter = require("./src/routes/imageRoutes");
const cors = require("cors");
const { Server } = require("./src/config/server");
const Port = process.env.PORT || 5000;
require("dotenv").config({ path: "/src/config/config.env" });
Server();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use("/api/v1", userRouter);
app.use("/api/v1", imageRouter);
app.get("*", (req, res, next) => {
  res.status(404).json({ success: false, message: "404 ! Page Not Found" });
});
app.listen(Port, (e) => {
  console.log(`Server is setup at Port ${Port} `);
});
