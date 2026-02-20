const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  space: { type: String, required: true }, // e.g., Ground Floor, 2nd Floor
  capacity: { type: Number, required: true },
  pricePerHour: { type: Number, required: true },
  amenities: [String], // Array of strings (projector, wifi, etc.)
  isAvailable: { type: Boolean, default: true },
  availableFrom: { type: String, default: "Now" } // Can be a time or date
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);
