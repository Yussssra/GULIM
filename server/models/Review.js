import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    product: {
        type: String, // Storing product ID from products.js
        required: true
    },
    user: {
        type: String, // String for simplicity or reference to User
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
export default Review;
