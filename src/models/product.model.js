const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  sizes: [{ type: String }],
  colors: [{ type: String }],
  colorNames: [{ type: String }],
  images: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
  video: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

// Map _id to id when toJSON is called to maintain compatibility with the frontend code.
ProductSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model("Product", ProductSchema);
