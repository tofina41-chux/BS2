const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  try {
    const { roomId, startTime, endTime, date } = req.body;

    const bookingDate = new Date(date);
    const now = new Date();

    // ❌ Past date
    if (bookingDate < now.setHours(0,0,0,0)) {
      return res.status(400).json({ message: "Cannot book past dates" });
    }

    // ❌ Working hours (8AM - 6PM example)
    const startHour = new Date(startTime).getHours();
    if (startHour < 8 || startHour > 18) {
      return res.status(400).json({ message: "Outside working hours" });
    }

    // ❌ Double booking check
    const existingBooking = await Booking.findOne({
      roomId,
      date,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
      ]
    });

    if (existingBooking) {
      return res.status(400).json({ message: "Room already booked" });
    }

    const booking = await Booking.create(req.body);
    res.json(booking);

  } catch (error) {
    res.status(500).json(error);
  }
};
