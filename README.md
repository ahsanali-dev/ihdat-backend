# ihdat E-Commerce Portal - REST API Backend

This is the database-backed server API for the **ihdat** e-commerce application, built using **Node.js**, **Express**, **MongoDB (Mongoose)**, **Nodemailer**, and **ImageKit**.

---

## 🚀 Key Features

* **Database Persistence**: Mongoose schemas and models for `Product` and `Order` collections.
* **Secured Admin CRUD**: Product addition, editing, deletion, and order status updates are restricted to administrators using custom JWT verification middleware.
* **Public Contact API**: Recieves contact forms (`POST /api/contact`) and triggers a styled Nodemailer alert to the admin's inbox.
* **Public Order Tracking**: Resolves specific order status, item logs, and delivery details by order ObjectId (`GET /api/orders/track/:id`).
* **Image Optimization Proxy**: Secure upload API (`POST /api/upload`) utilizing the ImageKit SDK to compress base64 images into optimized WebP formats.
* **SMTP Email Notifications**: Automated emails triggered via Nodemailer:
  * Customer Order Confirmation on placement.
  * Customer Order Status updates on changes.
  * Admin Alerts for new purchases.

---

## 🛠️ Tech Stack

* **Server Runtime**: Node.js & Express
* **Database ODB**: MongoDB & Mongoose
* **Authorization**: JWT (jsonwebtoken)
* **Media Optimization**: ImageKit Node SDK
* **Mail Delivery**: Nodemailer (SMTP)

---

## ⚙️ Environment Configuration

Create a `.env` file in the root of the `backend/` directory:

```env
PORT=5000
DATABASE_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/ihdat
CORS_ORIGIN=http://localhost:3000

# ImageKit Configurations
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

# SMTP/Nodemailer Configurations
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_SECURE=false # true for port 465, false otherwise
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SMTP_FROM="ihdat" <info@ihdat.com>
ADMIN_NOTIFY_EMAIL=admin@ihdat.com

# Admin Dashboard Credentials
ADMIN_EMAIL=admin@ihdat.com
ADMIN_PASSWORD=admin
JWT_SECRET=your_jwt_secret_token
```

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Seed Database
Seeding populates the database with 10 high-quality clothing products using premium photography from Unsplash. Run:
```bash
node seed.js
```

### 3. Launch API Server
```bash
# Starts the server in development mode with nodemon auto-reloads
npm run dev
```
The server will start running on [http://localhost:5000](http://localhost:5000).

---

## 📁 Key File Structure

* `server.js` - Server entry point.
* `/src/app.js` - Express configuration (middleware setup and routes mounting).
* `/src/config/db.js` - MongoDB Mongoose connection handler.
* `/src/models/` - Schema structures (`product.model.js`, `order.model.js`).
* `/src/routes/` - API router paths (`auth`, `product`, `order`, `upload`, `contact`).
* `/src/controllers/` - Express request handlers.
* `/src/middlewares/auth.middleware.js` - Admin token gatekeeper.
* `/src/services/` - Integration wrappers (`imagekit.service.js`, `mail.service.js`).
