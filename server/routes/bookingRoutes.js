const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// This matches the "app.use('/api/bookings', ...)" in your server.js
router.post("/", bookingController.createBooking);

module.exports = router;