const User = require("../models/User");
const jwt = require("jsonwebtoken");

// --- REGISTER NEW USER ---
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 2. Create new user (Storing plain text password for now as per your test setup)
        const newUser = new User({
            name,
            email,
            password,
            role: "user" // Default role
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// --- LOGIN EXISTING USER ---
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find user
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // 2. Check password (plain text for testing)
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 3. Create Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};