const Room = require("../models/Room");

// Admin: Add a new room
exports.addRoom = async (req, res) => {
  try {
    const { name, space, capacity, price, amenities } = req.body;
    // Split amenities by comma and trim whitespace
    const amenitiesArray = amenities.split(",").map(item => item.trim());

    const newRoom = new Room({
      name,
      space,
      capacity,
      pricePerHour: price,
      amenities: amenitiesArray
    });

    await newRoom.save();
    res.status(201).json({ message: "Room added successfully!", room: newRoom });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User/Admin: Get all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
