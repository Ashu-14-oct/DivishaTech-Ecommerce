const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  sp: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  imageUrls: {
    type: String,
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
  }
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;