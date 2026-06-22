const { sendContactUsEmail } = require("../services/mail.service");

async function handleContactForm(req, res) {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "Full name, email, and message are required fields."
      });
    }

    // Send the contact email
    await sendContactUsEmail({ name, email, subject, message });

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Contact message sent successfully. Admin has been notified.",
      data: { name, email, subject }
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Failed to send contact message. Please try again later.",
      error: error.message
    });
  }
}

module.exports = {
  handleContactForm
};
