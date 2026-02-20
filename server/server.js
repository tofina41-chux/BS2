require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const roomRoutes = require("./routes/roomRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: "http://localhost:3002", // Explicitly allow your frontend port
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));
app.use(express.json());

// Health Check Route (Use this to test if server is alive in browser)
app.get("/", (req, res) => {
    res.send("Swahilipot API is running...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/rooms", roomRoutes);

// Global Error Handler (Prevents server from crashing on minor errors)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🔗 Accepting requests from http://localhost:3002`);
});