const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
    subcategoryName: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
    }
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;