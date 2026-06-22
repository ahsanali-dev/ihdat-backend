const { uploadImage } = require("../services/imagekit.service");

async function handleImageUpload(req, res) {
  try {
    const { file, fileName } = req.body;
    if (!file) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "No file provided"
      });
    }

    const uploadedUrl = await uploadImage(file, fileName);
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Image uploaded successfully to ImageKit",
      url: uploadedUrl
    });
  } catch (error) {
    console.error("Image upload controller error:", error);
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Failed to upload image",
      error: error.message
    });
  }
}

module.exports = {
  handleImageUpload,
};
