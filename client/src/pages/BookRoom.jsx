import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

export default function BookRoom() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingData, setBookingData] = useState({
    date: "",
    startTime: "",
    endTime: ""
  });

  // ✅ ADDED: Define storedUser here so the component can use it
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // 1. Fetch available rooms from the database
  useEffect(() => {
    // ✅ ADDED: Redirect if not logged in
    if (!storedUser) {
      alert("Please login to book a room");
      navigate("/login");
      return;
    }

    const fetchRooms = async () => {
      try {
        const res = await api.get("/rooms/all");
        setRooms(res.data);
      } catch (err) {
        console.error("Error fetching rooms:", err);
      }
    };
    fetchRooms();
  }, [navigate]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!selectedRoom) return alert("Please select a room first!");

    try {
      const payload = {
        roomId: selectedRoom._id,
        // ✅ Now storedUser is defined, so this won't crash
        userId: storedUser.id || storedUser._id,
        userName: storedUser.name,
        userEmail: storedUser.email,
        date: bookingData.date,
        startTime: bookingData.startTime,
        endTime: bookingData.endTime
      };

      console.log("Sending Payload:", payload);

      const res = await api.post("/bookings/request", payload);
      alert("Success: " + res.data.message);
      navigate("/dashboard");
    } catch (err) {
      console.error("Full Error Object:", err);
      // ✅ Improved error message logic
      const errMsg = err.response?.data?.error || err.response?.data?.message || "Server Unreachable";
      alert("Booking failed: " + errMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Reserve a Space</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Step 1: Select Room */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
              <MapPin className="text-indigo-600" /> 1. Select a Room
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rooms.length === 0 ? (
                <p className="text-gray-500 italic">No rooms available or loading...</p>
              ) : (
                rooms.map((room) => (
                  <div
                    key={room._id}
                    onClick={() => setSelectedRoom(room)}
                    className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${selectedRoom?._id === room._id
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-white bg-white hover:border-gray-200"
                      }`}
                  >
                    <h3 className="font-bold text-lg">{room.name}</h3>
                    <p className="text-gray-500 text-sm mb-3">{room.space}</p>
                    <div className="flex justify-between text-sm font-medium">
                      <span className="flex items-center gap-1"><Users size={16} /> {room.capacity}</span>
                      <span className="text-indigo-600">Ksh {room.pricePerHour}/hr</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Step 2: Booking Details */}
          <div className="bg-white p-6 rounded-2xl shadow-xl h-fit border border-gray-100">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-800">
              <Calendar className="text-indigo-600" /> 2. Booking Info
            </h2>
            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  required
                />
              </div>
              <div className="flex gap-2">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                  <input
                    type="time"
                    className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) => setBookingData({ ...bookingData, startTime: e.target.value })}
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                  <input
                    type="time"
                    className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) => setBookingData({ ...bookingData, endTime: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 mt-6">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-500 font-medium">Room:</span>
                  <span className="font-bold text-gray-800">{selectedRoom ? selectedRoom.name : "None selected"}</span>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95"
                >
                  Request Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
