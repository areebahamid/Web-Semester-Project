const mongoose = require('mongoose');

const onwerSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    orders:{
        type: Array,
        default: []
    },
    contact: Number,
    picture: String
});

module.exports = mongoose.model("owner", onwerSchema);