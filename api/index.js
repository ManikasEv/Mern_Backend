import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/product.model.js';  // Assuming your Product model is in this path
import cors from 'cors'; // Import CORS

const app = express();

app.use(cors()); // Enable CORS for all routes
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
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new product
app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
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


// Enable Mongoose debugging
mongoose.set('debug', true);

// Connect to MongoDB
mongoose.connect("mongodb+srv://6nSAv3DNQi7hQn6K:6nSAv3DNQi7hQn6K@cluster0.iwchv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to DB");
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => {
    console.error("Error connecting to DB:", error);
  });
