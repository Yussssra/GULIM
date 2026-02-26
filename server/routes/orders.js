import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Create new order
router.post('/', async (req, res) => {
    try {
        const { user, items, totalAmount } = req.body;

        if (!user || !items || items.length === 0) {
            return res.status(400).json({ message: 'Invalid order data' });
        }

        const order = new Order({
            user,
            items,
            totalAmount
        });

        await order.save();
        res.status(201).json({ success: true, order });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get user orders
router.get('/user/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
