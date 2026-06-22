const Product = require("../models/product.model");

async function getProducts(req, res) {
  try {
    const data = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Products fetched successfully",
      data: data
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Failed to fetch products",
      error: error.message
    });
  }
}

async function getProductById(req, res) {
  try {
    const id = req.params.id;
    const p = await Product.findById(id);
    if (!p) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: "Product not found"
      });
    }
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Product details fetched successfully",
      data: p
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Failed to fetch product details",
      error: error.message
    });
  }
}

async function createProduct(req, res) {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json({
      statusCode: 201,
      success: true,
      message: "Product created successfully",
      data: savedProduct
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Failed to create product",
      error: error.message
    });
  }
}

async function updateProduct(req, res) {
  try {
    const id = req.params.id;
    const productData = { ...req.body, updatedAt: new Date() };
    delete productData.id;
    delete productData._id;

    const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: "Product not found"
      });
    }
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Product updated successfully",
      data: updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Failed to update product",
      error: error.message
    });
  }
}

async function deleteProduct(req, res) {
  try {
    const id = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: "Product not found"
      });
    }
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Product deleted successfully",
      id: id
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Failed to delete product",
      error: error.message
    });
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
