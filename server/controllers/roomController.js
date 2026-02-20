const Room = require("../models/Room");
const Booking = require("../models/Booking");

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

// User/Admin: Get all rooms with Real-Time Availability Logic
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();

    // Get current time and date in the same format stored in DB
    const now = new Date();
    const currentTime = now.getHours().toString().padStart(2, '0') + ":" +
      now.getMinutes().toString().padStart(2, '0');
    const currentDate = now.toISOString().split('T')[0]; // YYYY-MM-DD

    // Map through rooms and check for overlapping approved bookings
    const updatedRooms = await Promise.all(rooms.map(async (room) => {

      // Look for an APPROVED booking for THIS room happening RIGHT NOW
      const activeBooking = await Booking.findOne({
        room: room._id,
        status: "Approved",
        date: currentDate,
        startTime: { $lte: currentTime }, // Started before or at current time
        endTime: { $gte: currentTime }    // Ends after or at current time
      });

      // Convert Mongoose object to regular JS object to add temporary fields
      const roomObj = room.toObject();

      // If an active booking exists, mark as occupied
      roomObj.isAvailable = !activeBooking;
      roomObj.availableFrom = activeBooking ? activeBooking.endTime : "Now";

      return roomObj;
    }));

    res.json(updatedRooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
