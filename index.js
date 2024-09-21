import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/product.model.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

let isConnected; // Track connection status

const connectToDatabase = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error; // Throw to let the error handler catch it
  }
};

app.use(async (req, res, next) => {
  await connectToDatabase();
  next();
});

// Define your routes...

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).send('Internal Server Error');
});

export default app;
