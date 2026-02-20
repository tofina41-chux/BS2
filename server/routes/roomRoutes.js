const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");

router.post("/add", roomController.addRoom);
router.get("/all", roomController.getAllRooms);

module.exports = router;
