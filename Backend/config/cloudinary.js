require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
exports.uploadImage = async (file) => {
  const fileBuffer = file.buffer;

  //upload the image to cloudnary
  return new Promise((res, rej) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) {
          rej(error);
        } else {
          res(result);
        }
      })
      .end(fileBuffer);
  });
};
