const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    console.log("Request Body:", req.body);
    console.log("Order items received:", req.body.items);

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Order failed", error });
  }
};

module.exports = { createOrder };
