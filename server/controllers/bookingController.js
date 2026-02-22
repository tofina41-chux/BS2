const Booking = require("../models/Booking");

// 1. Logic for requesting a booking
exports.requestBooking = async (req, res) => {
  try {
    const { roomId, userId, userName, userEmail, date, startTime, endTime } = req.body;
    const newBooking = new Booking({
      room: roomId,
      user: userId,
      userName,
      userEmail,
      date,
      startTime,
      endTime
    });
    await newBooking.save();
    res.status(201).json({ message: "Booking request sent!", booking: newBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Logic for Admin to Approve/Reject
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status, adminMessage } = req.body;
    // We get the ID from req.params.id because the route is /status/:id
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status, adminMessage },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: `Booking ${status}`, booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Logic to get ALL bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("room").sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Logic to get specific User bookings
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId }).populate("room");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
