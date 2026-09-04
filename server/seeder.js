import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './src/models/userModel.js';
import Product from './src/models/productModel.js';
import Order from './src/models/orderModel.js';
import connectDB from './src/config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: await bcrypt.hash('123456', 10),
        isAdmin: true,
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: await bcrypt.hash('123456', 10),
      },
    ]);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = [
      {
        name: 'AirPods Wireless Bluetooth Headphones',
        slug: 'airpods-wireless-bluetooth-headphones',
        image: '/images/airpods.jpg',
        description:
          'Bluetooth technology lets you connect it with compatible devices wirelessly. High-quality AAC audio offers immersive listening experience.',
        brand: 'Apple',
        category: 'Electronics',
        price: 129.99,
        countInStock: 10,
        rating: 4.5,
        numReviews: 12,
        user: adminUser,
        isFeatured: true,
      },
      {
        name: 'iPhone 13 Pro 256GB Memory',
        slug: 'iphone-13-pro-256gb-memory',
        image: '/images/phone.jpg',
        description:
          'Introducing the iPhone 13 Pro. A transformative triple-camera system that adds tons of capability without complexity.',
        brand: 'Apple',
        category: 'Electronics',
        price: 999.99,
        countInStock: 7,
        rating: 4.0,
        numReviews: 8,
        user: adminUser,
        isTrending: true,
      },
      {
        name: 'Cannon EOS 80D DSLR Camera',
        slug: 'cannon-eos-80d-dslr-camera',
        image: '/images/camera.jpg',
        description:
          'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems.',
        brand: 'Cannon',
        category: 'Electronics',
        price: 929.99,
        countInStock: 5,
        rating: 3,
        numReviews: 12,
        user: adminUser,
      },
      {
        name: 'Sony Playstation 5',
        slug: 'sony-playstation-5',
        image: '/images/playstation.jpg',
        description:
          'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
        brand: 'Sony',
        category: 'Electronics',
        price: 499.99,
        countInStock: 11,
        rating: 5,
        numReviews: 12,
        user: adminUser,
        isFeatured: true,
      },
      {
        name: 'Logitech G-Series Gaming Mouse',
        slug: 'logitech-g-series-gaming-mouse',
        image: '/images/mouse.jpg',
        description:
          'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization.',
        brand: 'Logitech',
        category: 'Electronics',
        price: 49.99,
        countInStock: 7,
        rating: 3.5,
        numReviews: 10,
        user: adminUser,
      },
      {
        name: 'Amazon Echo Dot 3rd Generation',
        slug: 'amazon-echo-dot-3rd-generation',
        image: '/images/alexa.jpg',
        description:
          'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space.',
        brand: 'Amazon',
        category: 'Electronics',
        price: 29.99,
        countInStock: 0,
        rating: 4,
        numReviews: 12,
        user: adminUser,
        isTrending: true,
      },
    ];

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
