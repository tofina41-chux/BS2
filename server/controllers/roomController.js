const Room = require("../models/Room");

// Create Room (Admin Only Later)
exports.createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get All Rooms
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isActive: true });
    res.json(rooms);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Single Room
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.json(room);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update Room
exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(room);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Soft Delete Room
exports.deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndUpdate(req.params.id, {
      isActive: false
    });
    res.json({ message: "Room disabled" });
  } catch (error) {
    res.status(500).json(error);
  }
};
