const Booking = require("../models/Booking");
const Room = require("../models/Room");

// USER: Create a new booking request
exports.createBooking = async (req, res) => {
  try {
    const { roomId, userId, userName, userEmail, date, startTime, endTime } = req.body;

    const newBooking = new Booking({
      room: roomId,
      user: userId,
      userName,
      userEmail,
      date,
      startTime,
      endTime,
      status: "Pending"
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking request sent!", booking: newBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ADMIN: Approve or Reject a booking
exports.updateBookingStatus = async (req, res) => {
  try {
    const { bookingId, status, adminMessage } = req.body; // status will be 'Approved' or 'Rejected'

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status, adminMessage },
      { new: true }
    );

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.json({ message: `Booking ${status.toLowerCase()} successfully!`, booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ADMIN: Get all bookings (for history and management)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("room").sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// USER: Get my own bookings
exports.getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ user: userId }).populate("room");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
