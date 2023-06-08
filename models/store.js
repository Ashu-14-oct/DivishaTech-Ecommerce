const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    gst: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    storeTimings: {
        type: String,
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        unique: true,
      }
});

const Store = mongoose.model('Store', storeSchema);
module.exports = Store;