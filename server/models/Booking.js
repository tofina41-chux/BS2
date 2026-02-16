const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  startTime: Date,
  endTime: Date,
  date: Date
});

module.exports = mongoose.model("Booking", bookingSchema);
