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

// MongoDB Connection
if (!process.env.MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in .env');
} else {
    // Monitor connection states
    mongoose.connection.on('connecting', () => console.log('Connecting to MongoDB...'));
    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to DB Cluster');
        console.log('Active Database:', mongoose.connection.name);
        console.log('Active Host:', mongoose.connection.host);
    });
    mongoose.connection.on('error', (err) => console.error('Mongoose connection error:', err));
    mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));

    mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    })
        .catch(err => {
            console.error('Initial MongoDB connection failed:', err.message);
            if (err.message.includes('IP not whitelisted')) {
                console.error('SECURITY TIP: Please check your MongoDB Atlas IP Whitelist.');
            }
        });
}

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/', (req, res) => {
    res.send('Gulim API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




