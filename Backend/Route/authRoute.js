const express = require("express");
const {
  loginUsers,
  registerController,
  registerControllerOtp,
  forgetPassword,
} = require("../Controller/authController");

// router object
const router = express.Router();

//register USer || Post
router.post("/register", registerController);

//Register USer || Post
router.post("/register-otp", registerControllerOtp);

//Login USer || Post
router.post("/login", loginUsers);

//Forget Password || Post
router.post("/forget-password", forgetPassword);
