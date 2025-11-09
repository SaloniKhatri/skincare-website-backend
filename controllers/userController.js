const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

// Register new user
const registerUser = async (req, res) => {
  try {
    console.log("📩 Register request body:", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      console.log("⚠️ Missing fields:", { name, email, password });
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    console.log("🧱 Creating user now...");
    const user = await User.create({ name, email, password });
    console.log("✅ User created successfully:", user);

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      console.log("❌ Invalid user data");
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("❌ Register Error (catch):", error);
    if (error.name === "ValidationError") {
      console.error("🧩 Validation Error Details:", error.errors);
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerUser, loginUser };
