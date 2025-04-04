import mongoose, { Types } from "mongoose";

// Product schema
const productSchema = mongoose.Schema({
    category:{
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    old_price:{
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true 
    }
}, { timestamps: true });  // This adds createdAt and updatedAt fields

const Product = mongoose.model('Product', productSchema);

export default Product;
