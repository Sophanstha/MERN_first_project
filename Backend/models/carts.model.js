import mongoose from "mongoose";
const cartItemSchema = new mongoose.Schema({
    productid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required : true
    },
    title: {
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

})

const CartSchema = new mongoose.Schema({
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    items : [cartItemSchema]
})
export const Cart = mongoose.model("Cart",CartSchema)