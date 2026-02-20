const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.post("/request", bookingController.createBooking);
router.patch("/status", bookingController.updateBookingStatus); // Use PATCH for updates
router.get("/all", bookingController.getAllBookings);
router.get("/user/:userId", bookingController.getUserBookings);

module.exports = router;