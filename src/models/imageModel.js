const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ImageSchema = new Schema({
  label: { type: String, required: [true, "Add label to image"] },
  imageUrl: { type: String, required: [true, "Add image by Url"] },
  user: {
    type: mongoose.Schema.ObjectId,
    // required: true,
    ref: "UserCollection",
  },
});

const ImageColl = mongoose.model("ImageCollection", ImageSchema);

module.exports = ImageColl;
