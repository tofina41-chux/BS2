const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userName: String, // Storing for quick display
  userEmail: String,
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  },
  adminMessage: { type: String, default: "" } // "Your booking has been approved!"
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);