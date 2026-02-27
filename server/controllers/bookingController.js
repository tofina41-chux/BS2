const Booking = require("../models/Booking");
const sendEmail = require("../utils/sendEmail");

// 1. Logic for requesting a booking
exports.requestBooking = async (req, res) => {
  try {
    const { roomId, userId, userName, userEmail, date, startTime, endTime } = req.body;
    
    // Safety log to ensure email is arriving from the frontend
    console.log("New Booking Request Email:", userEmail);

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

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status, adminMessage },
      { returnDocument: 'after' } 
    ).populate("room");

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // --- DEBUGGING LOGS ---
    console.log("Attempting to email user...");
    console.log("Recipient Name:", updatedBooking.userName);
    console.log("Recipient Email:", updatedBooking.userEmail);
    // ----------------------

    if (updatedBooking.userEmail) {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: ${status === 'Approved' ? '#16a34a' : '#dc2626'}; text-align: center;">
            Booking ${status}
          </h2>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <p>Hi <strong>${updatedBooking.userName}</strong>,</p>
          <p>Your reservation request for <strong>${updatedBooking.room?.name || 'the requested space'}</strong> has been ${status.toLowerCase()}.</p>
          
          <div style="background: #f9f9f9; padding: 10px; border-radius: 5px;">
             <p><strong>Date:</strong> ${updatedBooking.date}</p>
             <p><strong>Time:</strong> ${updatedBooking.startTime} - ${updatedBooking.endTime}</p>
          </div>

          <p><strong>Admin Message:</strong> ${adminMessage}</p>
          <br />
          <p style="font-size: 12px; color: #777;">Thank you for using BS2 Booking System.</p>
        </div>
      `;

      // Call the email utility
      sendEmail(updatedBooking.userEmail, `BS2 Booking Update: ${status}`, emailHtml);
    } else {
      console.log("⚠️ Email not sent: The 'userEmail' field is empty in the database for this booking.");
    }

    res.json({ message: `Booking ${status}`, booking: updatedBooking });
  } catch (error) {
    console.error("Update Error:", error);
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