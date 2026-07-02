require("dotenv").config();
const { connectToDatabase } = require("./src/config/db");
const Product = require("./src/models/product.model");
const mongoose = require("mongoose");

const seedProducts = [
  {
    name: "Zari Embroidered Velvet Koti",
    price: 6990,
    category: "Women's Kotis",
    description: "Handcrafted velvet short koti adorned with intricate gold Zari threadwork and floral motifs. Tailored to layer gracefully over plain or festive silk suits & kurtas.",
    stock: 25,
    sizes: ["S", "M", "L", "XL", "Custom"],
    colors: ["#0B3C49", "#1E1E24", "#581825"],
    colorNames: ["Peacock Teal", "Midnight Black", "Royal Maroon"],
    images: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600",
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=600"
    ],
    isFeatured: true,
    video: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-gold-dress-41126-large.mp4"
  },
  {
    name: "Brocade Silk Crop Waistcoat",
    price: 5490,
    category: "Women's Kotis",
    description: "A modern cropped waist-length koti crafted in woven Banarsi brocade with subtle metallic golden thread detailing and dori tassel tie closure.",
    stock: 18,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#D4AF37", "#FAF6F0", "#8A2B06"],
    colorNames: ["Emerald Gold", "Antique Ivory", "Rust Red"],
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600",
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=600"
    ],
    isFeatured: true,
    video: "https://assets.mixkit.co/videos/preview/mixkit-woman-modeling-a-black-dress-41125-large.mp4"
  },
  {
    name: "Junior Silk Jacquard Koti",
    price: 3990,
    category: "Kids' Waistcoats",
    description: "Charming handcrafted silk jacquard waistcoat designed for young girls & children wearing kurtas. Lightweight breathable lining with delicate gold tilla borders.",
    stock: 30,
    sizes: ["2-4Y", "4-6Y", "6-8Y", "8-10Y", "10-12Y"],
    colors: ["#E8B4B8", "#679436", "#FAF6F0"],
    colorNames: ["Blush Pink", "Olive Mint", "Ivory Gold"],
    images: [
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=600",
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=600"
    ],
    isFeatured: true,
    video: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-gold-dress-41126-large.mp4"
  },
  {
    name: "Mirror-Work Festive Koti",
    price: 7990,
    category: "Women's Kotis",
    description: "Exquisite handmade mirror-work embroidered short jacket koti. Adds an instant festive statement over eastern dresses, kurtis, and unstitched suits.",
    stock: 15,
    sizes: ["S", "M", "L", "XL", "Custom"],
    colors: ["#1D3557", "#D4AF37", "#7D1D2B"],
    colorNames: ["Royal Indigo", "Mustard Gold", "Crimson Maroon"],
    images: [
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=600",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600"
    ],
    isFeatured: true,
    video: "https://assets.mixkit.co/videos/preview/mixkit-woman-modeling-a-black-dress-41125-large.mp4"
  },
  {
    name: "Kids Royal Velvet Waistcoat",
    price: 4490,
    category: "Kids' Waistcoats",
    description: "Plush velvet short jacket trimmed with antique golden gota work and silk tie strings, crafted for kids' festive celebrations.",
    stock: 22,
    sizes: ["2-4Y", "4-6Y", "6-8Y", "8-10Y"],
    colors: ["#1B263B", "#7D1D2B", "#2D6A4F"],
    colorNames: ["Royal Navy", "Deep Wine", "Forest Green"],
    images: [
      "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?q=80&w=600",
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600"
    ],
    isFeatured: false,
    video: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-gold-dress-41126-large.mp4"
  },
  {
    name: "Bespoke Hand-Embroidered Cape",
    price: 9990,
    category: "Custom Jackets",
    description: "Custom-made tailored ethnic cape jacket featuring hand-stitched sequins, dabka, and tilla embroidery. Crafted to custom measurements for weddings and special events.",
    stock: 10,
    sizes: ["Custom Fit", "S", "M", "L", "XL"],
    colors: ["#1E1E24", "#D4AF37"],
    colorNames: ["Noir Gold", "Champagne Gold"],
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600"
    ],
    isFeatured: true,
    video: "https://assets.mixkit.co/videos/preview/mixkit-woman-modeling-a-black-dress-41125-large.mp4"
  },
  {
    name: "Raw Silk Pearl Waistcoat",
    price: 6490,
    category: "Women's Kotis",
    description: "Pure raw silk waistcoat highlighted with delicate hand-attached pearls and a graceful front dori latkan. Perfect overlay for formal kurtis.",
    stock: 20,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#FAF6F0", "#D4AF37", "#A3C1AD"],
    colorNames: ["Ivory White", "Sand Gold", "Sage Mint"],
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600",
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=600"
    ],
    isFeatured: false,
    video: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-gold-dress-41126-large.mp4"
  },
  {
    name: "Bespoke Silk Pret Suit & Koti Set",
    price: 12990,
    category: "Apparel & Suits",
    description: "Extensible Pret collection preview — A 2-piece raw silk suit bundled with a matching hand-embroidered velvet koti. Tailored for special occasions.",
    stock: 8,
    sizes: ["S", "M", "L", "Custom"],
    colors: ["#1E1E24", "#7D1D2B"],
    colorNames: ["Classic Jet", "Maroon Velvet"],
    images: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600"
    ],
    isFeatured: true,
    video: "https://assets.mixkit.co/videos/preview/mixkit-woman-modeling-a-black-dress-41125-large.mp4"
  }
];

async function runSeeder() {
  try {
    await connectToDatabase();
    
    // Clear existing products
    console.log("Clearing database products...");
    await Product.deleteMany({});
    
    // Insert new seed list
    console.log("Seeding products...");
    const products = await Product.insertMany(seedProducts);
    console.log(`Successfully seeded ${products.length} products!`);
    
    mongoose.connection.close();
    console.log("Database connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("Seeder execution failed:", error);
    process.exit(1);
  }
}

runSeeder();
