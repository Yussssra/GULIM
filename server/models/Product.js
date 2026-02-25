import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    id: { type: Number, unique: true } // Keeping original ID for compatibility
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
