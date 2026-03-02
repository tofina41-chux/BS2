const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  space: { type: String, required: true }, 
  capacity: { type: Number, required: true },
  pricePerHour: { type: Number, required: true },
  amenities: [String], 
  image: { type: String, default: "" }, // 👈 Added for visual appeal
  isAvailable: { type: Boolean, default: true },
  availableFrom: { type: String, default: "Now" } 
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);
