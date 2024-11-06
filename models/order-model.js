const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderName:{
        type:String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    userName: String,
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: false,
            },
            name: String,
            price: String,
            quantity: {
                type: Number,
                default: 1,
            },
            discount: {
                type: Number,
                default: 0,
            },
            image: Buffer,
            bgcolor: String,
            panelcolor: String,
            textcolor: String,
        }
    ],
    orderDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed", "shipped", "delivered"],
        default: "pending",
    }

});

module.exports = mongoose.model("order",orderSchema);