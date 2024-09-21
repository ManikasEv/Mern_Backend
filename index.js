import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './api/products.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', productRoutes);

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