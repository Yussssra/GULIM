import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';

dotenv.config();

// Ensure JWT_SECRET exists
if (!process.env.JWT_SECRET) {
    process.env.JWT_SECRET = 'gulim_secret_key_123'; // Fallback for local dev
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Gulim API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




