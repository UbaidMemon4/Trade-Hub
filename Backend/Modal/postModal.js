const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "title is requried"],
    },
    description: {
      type: String,
      require: [true, "description is requried"],
    },
    category: {
      type: String,
      require: [true, "category is requried"],
    },
    img: {
      type: String,
      require: [true, "image is requried"],
    },
    location: {
      type: String,
      require: [true, "location is requried"],
    },
    modal: {
      type: String,
    },
    auth: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Auth",
      },
    ],
  },
  { timestamps: true }
);
const PostModal = mongoose.model("Post", PostSchema);
module.exports = PostModal;
