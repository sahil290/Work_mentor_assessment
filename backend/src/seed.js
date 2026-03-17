require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  { name: 'Apple iPhone 15 Pro', category: 'Electronics', price: 134900, quantity: 25, description: '6.1-inch Super Retina XDR display, A17 Pro chip, 48MP camera system.' },
  { name: 'Samsung Galaxy S24 Ultra', category: 'Electronics', price: 129999, quantity: 18, description: '6.8-inch QHD+ Dynamic AMOLED, 200MP camera, built-in S Pen.' },
  { name: 'Sony WH-1000XM5 Headphones', category: 'Electronics', price: 24990, quantity: 42, description: 'Industry-leading noise cancellation, 30-hour battery life, multipoint connection.' },
  { name: 'MacBook Air M2', category: 'Computers', price: 114900, quantity: 12, description: '13.6-inch Liquid Retina display, Apple M2 chip, 18-hour battery life.' },
  { name: 'Dell XPS 15 Laptop', category: 'Computers', price: 159990, quantity: 8, description: 'Intel Core i7, 16GB RAM, 512GB SSD, OLED touch display.' },
  { name: 'Logitech MX Master 3S', category: 'Computers', price: 9995, quantity: 55, description: 'Ergonomic wireless mouse, 8K DPI sensor, USB-C fast charging.' },
  { name: 'Nike Air Max 270', category: 'Footwear', price: 10795, quantity: 34, description: 'Lightweight mesh upper, Max Air heel unit, foam midsole for all-day comfort.' },
  { name: 'Adidas Ultraboost 23', category: 'Footwear', price: 16999, quantity: 27, description: 'Continental rubber outsole, Primeknit+ upper, Linear Energy Push system.' },
  { name: 'Puma RS-X Sneakers', category: 'Footwear', price: 7999, quantity: 0, description: 'Retro running style with RS cushioning technology.' },
  { name: 'Levi\'s 511 Slim Jeans', category: 'Apparel', price: 3499, quantity: 60, description: 'Sits below the waist, slim through thigh and leg. Classic 5-pocket styling.' },
  { name: 'Allen Solly Formal Shirt', category: 'Apparel', price: 1799, quantity: 45, description: 'Regular fit cotton blend formal shirt, wrinkle-resistant finish.' },
  { name: 'Zara Bomber Jacket', category: 'Apparel', price: 5990, quantity: 7, description: 'Relaxed fit bomber jacket with ribbed collar, cuffs and hem.' },
  { name: 'Instant Pot Duo 7-in-1', category: 'Kitchen', price: 8999, quantity: 22, description: 'Pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker, warmer.' },
  { name: 'Philips Air Fryer HD9200', category: 'Kitchen', price: 6995, quantity: 31, description: 'Rapid Air technology, 4.1L capacity, up to 90% less fat.' },
  { name: 'Prestige Induction Cooktop', category: 'Kitchen', price: 2499, quantity: 19, description: '1600W induction cooktop with 8 preset menus and touch controls.' },
  { name: 'Yoga Mat Premium 6mm', category: 'Sports', price: 1299, quantity: 88, description: 'Non-slip TPE material, eco-friendly, includes carrying strap.' },
  { name: 'Decathlon Dumbbells 10kg Pair', category: 'Sports', price: 2499, quantity: 5, description: 'Cast iron dumbbell pair with knurled grip handle, anti-roll design.' },
  { name: 'Skullcandy Crusher Evo', category: 'Electronics', price: 14999, quantity: 15, description: 'Adjustable sensory bass, 40-hour battery, personal sound profile.' },
  { name: 'Wooden Study Desk', category: 'Furniture', price: 12500, quantity: 9, description: 'Solid sheesham wood desk with 2 drawers and cable management.' },
  { name: 'ErgoChair Pro', category: 'Furniture', price: 32999, quantity: 6, description: 'Fully adjustable ergonomic chair with lumbar support and breathable mesh back.' },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const existing = await Product.countDocuments();
    if (existing > 0) {
      console.log(`Database already has ${existing} products. Skipping seed.`);
      console.log('To reseed, run: node src/seed.js --force');
      if (!process.argv.includes('--force')) {
        process.exit(0);
      }
      await Product.deleteMany({});
      console.log('Cleared existing products');
    }

    await Product.insertMany(products);
    console.log(`✓ Seeded ${products.length} products successfully`);
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
}

seed();