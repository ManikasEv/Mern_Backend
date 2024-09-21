import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/product.model.js'; // Adjust path as necessary
import cors from 'cors';

const app = express();

// CORS whitelist
const whitelist = [
  'https://testdeploymern.netlify.app', // Your front-end domain
  // Add other allowed domains as needed
];

app.use((req, res, next) => {
  const origin = req.get('origin'); // Get the request's origin
  const isWhitelisted = whitelist.includes(origin);
  
  if (isWhitelisted) {
    res.setHeader('Access-Control-Allow-Origin', origin); // Allow the origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
  }

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Respond successfully to preflight
  }
  
  next(); // Pass control to the next middleware
});

app.use(express.json());

// Your existing routes
app.get('/', (req, res) => {
  res.send('Hello from Node API');
});

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new product
app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product); // Use 201 for created
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a product
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to DB");
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => {
    console.error("Error connecting to DB:", error);
  });

// Export the app for Vercel serverless functions
export default app;
