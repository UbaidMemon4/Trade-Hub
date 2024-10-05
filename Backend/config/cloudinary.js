const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
exports.uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "Trade_Hub",
    });
    console.log("Image uploaded successfully:", result.secure_url);

    return secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
  }
};
