require("dotenv").config();
const { connectToDatabase } = require("./src/config/db");
const Product = require("./src/models/product.model");
const mongoose = require("mongoose");

const seedProducts = [
  {
    name: "Zaman Knit Polo",
    price: 4990,
    category: "Shirts",
    description: "Expertly crafted from premium double-knit combed cotton, offering unmatched breathability and a structured, timeless look.",
    stock: 45,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#1E1E24", "#FAF6F0", "#C5A880"],
    colorNames: ["Charcoal", "Cream", "Taupe"],
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600",
      "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?q=80&w=600",
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600"
    ],
    isFeatured: true
  },
  {
    name: "Classic Linen Kurta",
    price: 5990,
    category: "Linen",
    description: "Tailored from pure high-grade flax linen, this classic kurta represents elegant heritage design blended with modern comfort.",
    stock: 30,
    sizes: ["S", "M", "L"],
    colors: ["#FAF6F0", "#C5A880", "#2E3B4E"],
    colorNames: ["Off-white", "Khaki", "Slate Blue"],
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600"
    ],
    isFeatured: true
  },
  {
    name: "Cashmere Knit Cardigan",
    price: 12500,
    category: "Outerwear",
    description: "Woven from 100% fine Mongolian cashmere, featuring ribbed borders and custom tortoiseshell front buttons.",
    stock: 12,
    sizes: ["M", "L", "XL"],
    colors: ["#C5A880", "#1E1E24"],
    colorNames: ["Caramel", "Black"],
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600"
    ],
    isFeatured: true
  },
  {
    name: "Tailored Stretch Chinos",
    price: 4500,
    category: "Pants",
    description: "Premium cotton twill combined with subtle elastane for absolute ease of movement. Cut in a modern slim-tapered silhouette.",
    stock: 50,
    sizes: ["30", "32", "34", "36"],
    colors: ["#C5A880", "#2E3B4E", "#1E1E24"],
    colorNames: ["Stone", "Navy", "Jet Black"],
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600"
    ],
    isFeatured: false
  },
  {
    name: "Premium Embroidered Waistcoat",
    price: 8990,
    category: "Outerwear",
    description: "An classic structured waistcoat designed with delicate tonal embroidery, perfect for formal occasions and celebrations.",
    stock: 20,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#1E1E24", "#C5A880"],
    colorNames: ["Midnight Black", "Gold Dust"],
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=600",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600"
    ],
    isFeatured: true
  },
  {
    name: "Classic Over-Sized Hoodie",
    price: 5200,
    category: "Activewear",
    description: "Cut from ultra-soft heavy fleece with drop shoulders and a double-lined cozy hood, ideal for casual loungewear.",
    stock: 60,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#FAF6F0", "#1E1E24", "#7D1D2B"],
    colorNames: ["Heather Grey", "Noir", "Crimson"],
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600"
    ],
    isFeatured: false
  },
  {
    name: "Linen Drawstring Trousers",
    price: 3990,
    category: "Pants",
    description: "Woven in premium lightweight linen blend featuring a relaxed waist drawcord for casual elegance.",
    stock: 35,
    sizes: ["S", "M", "L"],
    colors: ["#FAF6F0", "#C5A880"],
    colorNames: ["Oatmeal", "Khaki"],
    images: [
      "https://images.unsplash.com/photo-1506629082925-63d6314a3389?q=80&w=600"
    ],
    isFeatured: false
  },
  {
    name: "Woolen Herringbone Scarf",
    price: 2500,
    category: "Accessories",
    description: "Woven in a luxury woolen blend, providing classic herringbone texture and warmth for winter layering.",
    stock: 100,
    sizes: ["One Size"],
    colors: ["#C5A880", "#1E1E24"],
    colorNames: ["Tweed Brown", "Charcoal Gray"],
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=600",
      "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?q=80&w=600"
    ],
    isFeatured: false
  },
  {
    name: "Urban Utility Overshirt",
    price: 4800,
    category: "Shirts",
    description: "Heavy canvas cotton overshirt featuring two large utility chest pockets and premium brass snap buttons.",
    stock: 25,
    sizes: ["M", "L", "XL"],
    colors: ["#2E3B4E", "#C5A880"],
    colorNames: ["Olive Green", "Dusty Tan"],
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600"
    ],
    isFeatured: false
  },
  {
    name: "Pashmina Jacquard Wrap",
    price: 9500,
    category: "Accessories",
    description: "Exquisite hand-finished wrap with details woven in traditional motifs. Extremely light yet beautifully warm.",
    stock: 15,
    sizes: ["One Size"],
    colors: ["#C5A880", "#7D1D2B"],
    colorNames: ["Antique Ivory", "Maroon"],
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=600"
    ],
    isFeatured: true
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
