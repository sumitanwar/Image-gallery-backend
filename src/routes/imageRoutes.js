const express = require("express");
const {
  addImage,
  getAllImages,
  deleteImage,
} = require("../controller/imageController");
const { isAuthenticated } = require("../middleware/authentication");
const router = express.Router();
router.route("/images").post(isAuthenticated, addImage).get(getAllImages);
router.route("/images/:id").delete(isAuthenticated, deleteImage);

module.exports = router;
