const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName:{
        type: String,
        required: true,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
      }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;