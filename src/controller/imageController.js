const ImageColl = require("../models/imageModel");
const ApiSearch = require("../utils/ApiSearch");
// adding images to Db
exports.addImage = async (req, res, next) => {
  const image = await ImageColl.create(req.body);
  const totalImgs = await ImageColl.countDocuments();
  try {
    res.status(200).json({ success: true, image, totalImgs });
  } catch (e) {
    res.status(401).json({ success: false, message: e.message });
  }
};

// get all images
exports.getAllImages = async (req, res, next) => {
  const totalImgs = await ImageColl.countDocuments();
  const apiFilter = new ApiSearch(ImageColl.find(), req.query).Search();
  const images = await apiFilter.query;
  try {
    res.status(200).json({ success: true, images, totalImgs });
  } catch (e) {
    res.status(401).json({ success: false, message: e.message });
  }
};

//deleting image
exports.deleteImage = async (req, res, next) => {
  const image = await ImageColl.findByIdAndDelete({ _id: req.params.id });
  try {
    res
      .status(200)
      .json({ success: true, message: "Image Deleted Successfully" });
  } catch (e) {
    res.status(401).json({ success: false, message: e.message });
  }
};
