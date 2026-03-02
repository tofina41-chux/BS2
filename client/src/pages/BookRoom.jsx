import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, Info, CheckCircle2 } from "lucide-react";

export default function BookRoom() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingData, setBookingData] = useState({
    date: "",
    startTime: "",
    endTime: ""
  });

  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!storedUser) {
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
    if (!storedUser?.email) return alert("Session missing email. Please re-login.");

    try {
      const payload = {
        roomId: selectedRoom._id,
        userId: storedUser.id || storedUser._id,
        userName: storedUser.name,
        userEmail: storedUser.email,
        date: bookingData.date,
        startTime: bookingData.startTime,
        endTime: bookingData.endTime
      };

      await api.post("/bookings/request", payload);
      alert("Success! Your booking request is now pending approval.");
      navigate("/dashboard");
    } catch (err) {
      alert("Booking failed: " + (err.response?.data?.message || "Server error"));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 py-12 px-8 mb-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">
            Reserve Your Creative Space
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Choose from our specialized rooms at Swahilipot Hub. Whether it's a 
            podcast session or a board meeting, we have the space for you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Step 1: Select Room (Left Side - 8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                Available Spaces
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rooms.map((room) => (
                <div
                  key={room._id}
                  onClick={() => setSelectedRoom(room)}
                  className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                    selectedRoom?._id === room._id
                      ? "border-indigo-600 ring-4 ring-indigo-50 bg-white"
                      : "border-transparent bg-white shadow-sm hover:shadow-xl hover:-translate-y-1"
                  }`}
                >
                  {/* Room Image */}
                  <div className="h-44 w-full relative overflow-hidden">
                    <img 
                      src={room.image || "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80"} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      alt={room.name}
                    />
                    {selectedRoom?._id === room._id && (
                      <div className="absolute inset-0 bg-indigo-600/20 flex items-center justify-center">
                        <CheckCircle2 className="text-white drop-shadow-lg" size={48} />
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-xl text-slate-800">{room.name}</h3>
                      <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {room.capacity} seats
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm mb-4 line-clamp-1">{room.space}</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-slate-400">
                        <MapPin size={16} />
                        <span className="text-xs font-semibold uppercase tracking-wide">Main Hub</span>
                      </div>
                      <span className="text-lg font-black text-indigo-600">
                        Ksh {room.pricePerHour}<small className="text-xs text-slate-400 ml-1">/hr</small>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Booking Details (Right Side - 4 Cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white rounded-3xl shadow-2xl shadow-indigo-100 p-8 border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                  <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                  Booking Details
                </h2>

                <form onSubmit={handleBooking} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="date"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-600 transition-all outline-none text-slate-700"
                        onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 text-center block">Start</label>
                      <input
                        type="time"
                        className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-600 transition-all outline-none text-slate-700 text-center"
                        onChange={(e) => setBookingData({ ...bookingData, startTime: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 text-center block">End</label>
                      <input
                        type="time"
                        className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-600 transition-all outline-none text-slate-700 text-center"
                        onChange={(e) => setBookingData({ ...bookingData, endTime: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Selected Space</span>
                        <span className="font-extrabold text-slate-800">{selectedRoom ? selectedRoom.name : "None selected"}</span>
                      </div>
                      {selectedRoom && <Info className="text-slate-300" size={20} />}
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-200 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 uppercase tracking-wider text-sm"
                    >
                      Confirm Booking Request
                    </button>
                  </div>
                </form>
              </div>

              {/* Tips Card */}
              <div className="bg-indigo-900 rounded-3xl p-6 text-white overflow-hidden relative">
                <div className="relative z-10">
                  <h4 className="font-bold mb-2 flex items-center gap-2 italic">Quick Tip</h4>
                  <p className="text-indigo-200 text-sm leading-relaxed">
                    Booking requests are usually reviewed within 1 hour. You will receive an email confirmation once approved.
                  </p>
                </div>
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-indigo-500 rounded-full blur-2xl opacity-40"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
