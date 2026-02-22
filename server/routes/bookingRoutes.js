const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// 1. User: Submit a request
router.post("/request", bookingController.requestBooking);

// 2. Admin: Update status (Approve/Reject) - Added :id parameter
router.patch("/status/:id", bookingController.updateBookingStatus);

// 3. Admin: View all requests
router.get("/all", bookingController.getAllBookings);

// 4. User: View my own history
router.get("/user/:userId", bookingController.getUserBookings);

module.exports = router;