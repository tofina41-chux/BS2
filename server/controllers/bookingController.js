const Booking = require("../models/Booking");
const sendEmail = require("../utils/sendEmail");

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

// 2. Logic for Admin to Approve/Reject + Email Notification
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status, adminMessage } = req.body;

    // Update the booking and populate room info so we can use the room name in the email
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status, adminMessage },
      { new: true }
    ).populate("room");

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // --- NODEMAILER LOGIC ---
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
        <div style="background-color: ${status === 'Approved' ? '#16a34a' : '#dc2626'}; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Booking ${status}</h1>
        </div>
        <div style="padding: 20px; color: #333;">
          <p>Hi <strong>${updatedBooking.userName}</strong>,</p>
          <p>Your reservation request for <strong>${updatedBooking.room?.name || 'the requested room'}</strong> has been <strong>${status.toLowerCase()}</strong>.</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Date:</strong> ${updatedBooking.date}</p>
            <p style="margin: 5px 0;"><strong>Time:</strong> ${updatedBooking.startTime} - ${updatedBooking.endTime}</p>
          </div>

          <p><strong>Admin Message:</strong> ${adminMessage}</p>
          
          <p style="margin-top: 30px;">Thank you for using Swahilipot Hub Spaces.</p>
        </div>
        <div style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #888;">
          © 2026 Swahilipot Hub. All rights reserved.
        </div>
      </div>
    `;

    // Trigger the email sending (we don't 'await' this so the API responds instantly)
    sendEmail(
      updatedBooking.userEmail,
      `Booking Status Update: ${status}`,
      emailHtml
    );
    // ------------------------

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