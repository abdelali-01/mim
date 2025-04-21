import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required.'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Product description is required.'],
    },
    price: {
        type: Number,
        required: [true, 'Product price is required.'],
        min: [0, 'Product price must be a positive number.'],
    },
    category: {
        type: String,
        required: [true, 'Product category is required.'],
    },
    stock: {
        type: Number,
        required: [true, 'Product stock is required.'],
        min: [0, 'Product stock must be a positive number.'],
    },
    images: {
        type: [String], // Array of image URLs
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Product = mongoose.model('Product', productSchema);
export default Product;