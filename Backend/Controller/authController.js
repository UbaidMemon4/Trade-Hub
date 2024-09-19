const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const AuthModal = require("../Modal/authModal");

//make a transporter for mail send
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "Ubaidasif510@gmail.com",
    pass: "qfdd mqum psfs vazw",
  },
});

// Create User/Register User
exports.registerController = async (req, res) => {
  try {
    const { email } = req.body;
    if (existingUser) {
      return res.status(401).send({
        success: false,
        message: "User Aleady Exisits",
      });
    }

    //Existing User
    const existingUser = await AuthModal.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        success: false,
        message: "User Aleady Exisits",
      });
    }
    //generate otp
    const VerificationOtp = Math.floor(1000 + Math.random() * 9000);
    //send mail
    const info = await transporter.sendMail({
      from: "Ubaidasif510@gmail.com",
      to: email,
      subject: "OTP verification",
      html: `
         <div>Your Trade_Hub verification OTP is ${VerificationOtp} <br/>
         Please do not share the OTP with unknown people.<div/>`,
    });
    if (info) {
      return res.status(201).send({
        success: true,
        message: "New User Created Verification OTP Send Succesfully",
        VerificationOtp,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Error In Register CallBack",
      success: false,
      error,
    });
  }
};

//Otp Send User Register
exports.registerControllerOtp = async (req, res) => {
  try {
    const { username, email, password, otp, VerificationOtp } = req.body;
    //validation
    if (!username || !email || !password || !otp || !VerificationOtp) {
      return res.status(400).send({
        success: false,
        message: "Please fill in all fields",
      });
    }
    //otp verification
    if (otp !== VerificationOtp) {
      return res.status(400).send({
        success: false,
        message: "OTP does not match",
      });
    }
    //hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    //save new user
    const user = new AuthModal({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "New User Created Succesfully",
      user,
    });
  } catch (error) {
    console.log(error, "error form register user");
    return res.status(500).send({
      message: "Error in registration callBack",
      success: false,
      error,
    });
  }
};

//Login User
exports.loginUsers = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide email or password",
      });
    }
    //Find User
    const user = await AuthModal.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    //Password Check
    const isMatch = await bcrypt.compare(password, user.passward);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    // Generate JWT token with expiration time
    const token = jwt.sign(
      {
        email,
        exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days in seconds
      },
      process.env.SECRET_KEY
    );
    if (token) {
      await UserModal.findOneAndUpdate(
        { email: email }, // Query
        { token: token }, // Update
        { new: true }
      );

      return res.status(200).send({
        success: true,
        message: "Login Succesfully",
        user,
        token,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in login callback",
      error,
    });
  }
};

//Forget Password
exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    //generate otp
    const ForgetOtp = Math.floor(1000 + Math.random() * 9000);
    // Update user's OTP
    const otpSave = await AuthModal.findOneAndUpdate(
      { email: email }, // Query
      { otp: ForgetOtp }, // Update
      { new: true }
    );
    if (!otpSave) {
      return res.status(200).send({
        success: false,
        message: "Email is not Registered",
      });
    }
    //send mail
    const info = await transporter.sendMail({
      from: "Ubaidasif510@gmail.com",
      to: email,
      subject: "Trade Hub Forget Password OTP",
      html: `
  <div>Your Trade_Hub Forget Password OTP is ${ForgetOtp} <br/>
  Please do not share the OTP with unknown people.<div/>`,
    });
    return res.status(201).send({
      success: true,
      message: "Forget Password OTP Send Succesfully",
      email,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something Went Wrong..",
      error,
    });
  }
};

//New Password
exports.newPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    // Validate data
    if (!email || !otp || !password) {
      return res.status(401).json({
        success: false,
        message: "Please provide all required data",
      });
    }
    //Find User
    const user = await UserModal.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User not found",
      });
    }
    //check otp
    if (user.otp !== otp) {
      return res.status(401).send({
        success: false,
        message: "OTP mismatch",
      });
    }
    //hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    const passwordUpdated = await AuthModal.findOneAndUpdate(
      { email: email }, // Query
      { password: hashedPassword }, // Update
      { new: true }
    );
    if (passwordUpdated) {
      return res.status(201).send({
        success: true,
        message: "Password updated succesfully",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Failed to update password",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//Update User Detail
exports.updateUserContoller = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModal.findOneAndUpdate(
      { token: id },
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "User Updated Suceesful",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while updating user",
      error,
    });
  }
};
