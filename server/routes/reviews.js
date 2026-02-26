import express from 'express';
import Review from '../models/Review.js';

const router = express.Router();

// Get reviews for a product
router.get('/:productId', async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId }).sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Post a review
router.post('/', async (req, res) => {
    try {
        const { product, user, rating, comment } = req.body;
        console.log('Review attempt for product:', product, 'from user:', user);

        if (!product || !user || !rating || !comment) {
            console.log('Missing fields in review submission');
            return res.status(400).json({ message: 'All fields are required' });
        }

        const review = new Review({
            product,
            user,
            rating,
            comment
        });

        await review.save();
        console.log('Review saved successfully to MongoDB');
        res.status(201).json(review);
    } catch (err) {
        console.error('Review submission error:', err);
        res.status(500).json({ message: err.message });
    }
});

export default router;
