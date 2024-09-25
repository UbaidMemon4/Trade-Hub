const express = require("express");
const {
  loginUsers,
  registerController,
  registerControllerOtp,
  forgetPassword,
  newPassword,
  updateUserContoller,
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

//New Password || Post
router.post("/new-password", newPassword);

//Update Profile || Post
router.post("/update-profile", updateUserContoller);

module.exports = router;
