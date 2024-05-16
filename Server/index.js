// index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
dotenv.config();

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));