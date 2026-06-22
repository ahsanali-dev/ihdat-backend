const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendOrderConfirmationEmail(order) {
  try {
    const itemsHtml = order.items
      .map(
        (item) => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">
          <img src="${item.image}" alt="${item.name}" width="50" style="vertical-align: middle; margin-right: 10px;" />
          ${item.name} (${item.size}, ${item.colorName || item.color})
        </td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Rs. ${(item.price * item.quantity).toLocaleString()}</td>
      </tr>
    `
      )
      .join("");

    const html = `
      <div style="font-family: serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; background-color: #FAF6F0; color: #111;">
        <h2 style="text-align: center; letter-spacing: 0.2em; text-transform: uppercase;">ihdat</h2>
        <p style="text-align: center; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #C5A880;">Thank you for your order</p>
        <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;" />
        <h3>Order Confirmation</h3>
        <p>Dear ${order.customer.name},</p>
        <p>Your order <strong>#${order.id || order._id}</strong> has been successfully placed. Here are your order details:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 12px;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="padding: 8px; text-align: left;">Item</th>
              <th style="padding: 8px; text-align: center;">Qty</th>
              <th style="padding: 8px; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
            <tr>
              <td colspan="2" style="padding: 8px; font-weight: bold; text-align: right;">Grand Total:</td>
              <td style="padding: 8px; font-weight: bold; text-align: right;">Rs. ${order.totalAmount.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
        <h4>Shipping Address:</h4>
        <p style="font-size: 12px; line-height: 1.5;">
          ${order.customer.name}<br/>
          ${order.customer.address}<br/>
          ${order.customer.city}, ${order.customer.postalCode}<br/>
          Phone: ${order.customer.phone}
        </p>
        <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;" />
        <p style="font-size: 10px; text-align: center; color: #666;">This is an automated confirmation email. For support, please contact info@ihdat.com</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"ihdat" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: order.customer.email,
      subject: `Order Confirmation #${order.id || order._id} - ihdat`,
      html,
    });
    console.log("Order confirmation email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Failed to send order confirmation email:", error);
  }
}

async function sendOrderStatusUpdateEmail(order) {
  try {
    const html = `
      <div style="font-family: serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; background-color: #FAF6F0; color: #111;">
        <h2 style="text-align: center; letter-spacing: 0.2em; text-transform: uppercase;">ihdat</h2>
        <p style="text-align: center; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #C5A880;">Order Status Update</p>
        <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;" />
        <h3>Your Order Status Has Changed</h3>
        <p>Dear ${order.customer.name},</p>
        <p>The status of your order <strong>#${order.id || order._id}</strong> has been updated to:</p>
        <div style="margin: 20px 0; padding: 15px; background-color: #fff; border: 1px solid #ddd; text-align: center; font-size: 18px; font-weight: bold; letter-spacing: 0.05em; text-transform: uppercase; color: ${
          order.status === "Cancelled" ? "#7D1D2B" : order.status === "Delivered" ? "#15803d" : "#C5A880"
        };">
          ${order.status}
        </div>
        <p style="font-size: 12px; color: #555;">We are working hard to ensure your garments reach you as expected. If you have any questions, feel free to reply to this email.</p>
        <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;" />
        <p style="font-size: 10px; text-align: center; color: #666;">This is an automated notification. For support, please contact info@ihdat.com</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"ihdat" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: order.customer.email,
      subject: `Order #${order.id || order._id} Status Updated: ${order.status} - ihdat`,
      html,
    });
    console.log("Order status update email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Failed to send order status update email:", error);
  }
}

async function sendAdminOrderNotificationEmail(order) {
  try {
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; background-color: #ffffff; color: #333;">
        <h3 style="color: #c5a880; border-bottom: 2px solid #eee; padding-bottom: 8px;">New Order Alert!</h3>
        <p>A new order <strong>#${order.id || order._id}</strong> has been placed by <strong>${order.customer.name}</strong>.</p>
        <p><strong>Total Amount:</strong> Rs. ${order.totalAmount.toLocaleString()}</p>
        <p><strong>Customer Email:</strong> ${order.customer.email}</p>
        <p><strong>Customer Phone:</strong> ${order.customer.phone}</p>
        <p>Please login to the Admin Dashboard to process this order.</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"ihdat Admin Alert" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.ADMIN_NOTIFY_EMAIL || process.env.SMTP_USER,
      subject: `[ALERT] New Order #${order.id || order._id} Placed`,
      html,
    });
    console.log("Admin notification email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Failed to send admin order notification email:", error);
  }
}

async function sendContactUsEmail({ name, email, subject, message }) {
  try {
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; background-color: #ffffff; color: #333;">
        <h2 style="color: #c5a880; border-bottom: 2px solid #eee; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.1em;">New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || "Contact Form Submission"}</p>
        <p><strong>Message:</strong></p>
        <div style="padding: 15px; background-color: #f9f9f9; border-left: 4px solid #c5a880; white-space: pre-wrap; font-size: 13px; line-height: 1.6; color: #555;">${message}</div>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 10px; color: #999;">This email was sent from the contact form on ihdat website.</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"ihdat Contact Form" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.ADMIN_NOTIFY_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: `[Contact Inquiry] ${subject || "New Message from " + name}`,
      html,
    });
    console.log("Contact inquiry email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Failed to send contact inquiry email:", error);
    throw error;
  }
}

module.exports = {
  sendOrderConfirmationEmail,
  sendOrderStatusUpdateEmail,
  sendAdminOrderNotificationEmail,
  sendContactUsEmail,
};
