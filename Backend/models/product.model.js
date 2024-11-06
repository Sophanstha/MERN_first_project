import mongoose from "mongoose";

// Define the product schema
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,  // Changed to Number
        required: true
    },
    imgSrc: {
        type: String,
        required: true  
    },
    qty: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Export the model
// export const Product = mongoose.Model("Product", productSchema);
export const Product = mongoose.model("Product",productSchema)
