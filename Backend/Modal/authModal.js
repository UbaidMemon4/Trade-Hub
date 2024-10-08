const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "username is requried"],
    },
    email: {
      type: String,
      require: [true, "email is requried"],
    },
    password: {
      type: String,
      require: [true, "password is requried"],
    },
    otp: {
      type: String,
      require: [true, "otp is requried"],
    },
    number: {
      type: String,
      require: [true, "number is requried"],
    },
    token: {
      type: String,
      require: [true, "token is requried"],
    },
    post: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);
const AuthModal = mongoose.model("Auth", AuthSchema);
module.exports = AuthModal;
