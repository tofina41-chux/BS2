const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  avEquipment: [String], // e.g., ["Projector", "Whiteboard"]
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Room', roomSchema);