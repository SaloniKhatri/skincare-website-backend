const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: String,
    address: String,
    contact: Number,
    items: Array,
    createdAt: {
        type: Date,
        default: Date.now,
    },
})
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;