const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "placeholder_pub",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "placeholder_priv",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "placeholder_url",
});

async function uploadImage(fileBase64, fileName) {
  try {
    const uploadResponse = await imagekit.upload({
      file: fileBase64, // base64 data URI string
      fileName: fileName || `product-${Date.now()}.webp`,
      folder: "/products",
    });
    return uploadResponse.url;
  } catch (error) {
    console.error("ImageKit upload service error:", error);
    throw error;
  }
}

module.exports = { uploadImage };
