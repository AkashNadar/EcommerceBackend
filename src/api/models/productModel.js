const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    ProductName: {
        type: String,
        required: true,
    },

    ProductCategory: {
        type: String, 
        required: true,
    },

    ProductDesc: {
        type: String
    },

    ProductImg: [mongoose.Schema.Types.Mixed],

    addedOn: {
        type: Number,
        required: true,
        default: new Date().getTime()
    },

    ProductPrice: {
        type: Number,
        required: true
    },

    Availability: {
        type: Boolean,
    }

})

module.exports = mongoose.model('Product', productSchema);