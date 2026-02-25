import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Get products with pagination and filtering
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;
        const skip = (page - 1) * limit;
        const category = req.query.category;

        let query = {};
        if (category && category !== 'ALL') {
            query.category = new RegExp(`^${category}$`, 'i');
        }

        const totalProducts = await Product.countDocuments(query);
        const products = await Product.find(query)
            .skip(skip)
            .limit(limit)
            .sort({ id: 1 });

        res.json({
            products,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ id: parseInt(req.params.id) });
        if (!product) return res.status(404).send('Product not found');
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
