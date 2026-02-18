const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find user
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // 2. Check password (we will add hashing later, for now plain text to test)
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