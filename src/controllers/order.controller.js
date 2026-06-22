const Order = require("../models/order.model");
const Product = require("../models/product.model");
const {
  sendOrderConfirmationEmail,
  sendOrderStatusUpdateEmail,
  sendAdminOrderNotificationEmail,
} = require("../services/mail.service");

async function getOrders(req, res) {
  try {
    const data = await Order.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Orders fetched successfully",
      data: data
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Failed to fetch orders",
      error: error.message
    });
  }
}

async function createOrder(req, res) {
  try {
    const orderItems = req.body.items || [];

    // Process items and decrement product inventories
    for (const item of orderItems) {
      if (item.productId) {
        const decrementVal = parseInt(item.quantity || 1, 10);
        try {
          await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -decrementVal } });
        } catch (e) {
          // Fallback if the id is a standard string (like mock 'prod-1') rather than ObjectId
          await Product.updateOne({ id: item.productId }, { $inc: { stock: -decrementVal } });
        }
      }
    }

    const order = new Order({
      customer: req.body.customer,
      items: orderItems,
      totalAmount: parseFloat(req.body.totalAmount),
      status: "Pending"
    });

    const savedOrder = await order.save();
    
    // Trigger Nodemailer order confirmation email (async, doesn't block response)
    sendOrderConfirmationEmail(savedOrder).catch(console.error);

    // Trigger Admin notification alert email
    sendAdminOrderNotificationEmail(savedOrder).catch(console.error);

    res.status(201).json({
      statusCode: 201,
      success: true,
      message: "Order created successfully",
      data: savedOrder
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Failed to create order",
      error: error.message
    });
  }
}

async function updateOrderStatus(req, res) {
  try {
    const id = req.params.id;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: "Order not found"
      });
    }

    // Trigger Nodemailer status update email
    sendOrderStatusUpdateEmail(updatedOrder).catch(console.error);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Order status updated successfully",
      data: updatedOrder
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Failed to update order status",
      error: error.message
    });
  }
}

async function trackOrder(req, res) {
  try {
    const id = req.params.id;
    const mongoose = require("mongoose");

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "Invalid Order ID format."
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Order tracked successfully",
      data: order
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Failed to track order",
      error: error.message
    });
  }
}

module.exports = {
  getOrders,
  createOrder,
  updateOrderStatus,
  trackOrder,
};
