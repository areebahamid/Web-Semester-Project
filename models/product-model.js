const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    image: String,
    name: String,
    price: String,
    discount: {
        type: Number,
        default: 0
    },
    bgcolor: String,
    planecolor: String,
    textcolor: String
});

module.exports = mongoose.model("product",productSchema);