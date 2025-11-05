const express = require("express");
const router = express.Router();
const Product = require("../models/Product"); // your Mongoose model

// Get all products
router.get("/orders", async (req, res) => {
  try {
    const products = await Product.find(); // laayega sari  items
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

module.exports = router;
