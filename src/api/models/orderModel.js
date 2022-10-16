const mongoose = require('mongoose');

const orderScheme = mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }]
})

module.exports = mongoose.model("Order", orderScheme);