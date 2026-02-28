import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import orderRoutes from './routes/orders.js';
import reviewRoutes from './routes/reviews.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Ensure JWT_SECRET exists
if (!process.env.JWT_SECRET) {
    process.env.JWT_SECRET = 'gulim_secret_key_123';
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection Variables
let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb;
    }

    if (!process.env.MONGODB_URI) {
        console.error('Error: MONGODB_URI is not defined in environment variables');
        throw new Error('MONGODB_URI missing');
    }

    console.log('Connecting to MongoDB...');
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            bufferCommands: false,
        });
        cachedDb = db;
        console.log('Mongoose connected to DB Cluster');
        return db;
    } catch (err) {
        console.error('Initial MongoDB connection failed:', err.message);
        if (err.message.includes('IP not whitelisted')) {
            console.error('SECURITY TIP: Please check your MongoDB Atlas IP Whitelist.');
        }
        throw err;
    }
}

// Global Middleware to ensure DB is connected before handling any API request
app.use(async (req, res, next) => {
    try {
        await connectToDatabase();
        next();
    } catch (err) {
        res.status(500).json({ error: 'Database connection failed', details: err.message });
    }
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/', (req, res) => {
    res.send('Gulim API is running...');
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running locally on port ${PORT}`);
    });
}

// Export the app for Vercel
export default app;




