import express from 'express';
import Order from '../models/Order.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Create new order
router.post('/', async (req, res) => {
    try {
        const { user, items, totalAmount, shippingAddress, paymentMethod, upiTransactionId } = req.body;

        if (!user || !items || items.length === 0) {
            return res.status(400).json({ message: 'Invalid order data' });
        }

        const order = new Order({
            user,
            items,
            totalAmount,
            shippingAddress,
            paymentMethod,
            upiTransactionId
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

// Admin area: Get ALL orders
router.get('/all', protect, admin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name email').sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin area: Update order status
router.put('/:id/status', protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.status = req.body.status || order.status;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
