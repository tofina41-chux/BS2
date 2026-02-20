import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { LayoutDashboard, CalendarPlus, ShieldCheck, LogOut, User, MapPin, Users } from "lucide-react";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [rooms, setRooms] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [user, setUser] = useState({ name: "User" });

  // Fetch all data when page loads
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          setUser(storedUser);

          // 1. Fetch All Rooms
          const roomsRes = await api.get("/rooms/all");
          setRooms(roomsRes.data);

          // 2. Fetch Personal Bookings for this specific user
          const bookingsRes = await api.get(`/bookings/user/${storedUser.id}`);
          setMyBookings(bookingsRes.data);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-indigo-900 text-white flex flex-col sticky top-0 h-screen">
          <div className="p-6">
            <h1 className="text-xl font-bold tracking-tight text-white">SWAHILIPOT</h1>
            <p className="text-indigo-300 text-xs uppercase tracking-widest">Booking System</p>
          </div>

          <nav className="flex-1 px-4 space-y-2 mt-4">
            <Link to="/dashboard" className="flex items-center space-x-3 bg-indigo-800 p-3 rounded-lg">
              <LayoutDashboard size={20} />
              <span>Overview</span>
            </Link>
            <Link to="/BookRoom" className="flex items-center space-x-3 hover:bg-indigo-800 p-3 rounded-lg transition">
              <CalendarPlus size={20} />
              <span>Book a Room</span>
            </Link>
            <Link to="/admin/dashboard" className="flex items-center space-x-3 hover:bg-indigo-800 p-3 rounded-lg transition">
              <ShieldCheck size={20} />
              <span>Admin Panel</span>
            </Link>
          </nav>

          <div className="p-4 border-t border-indigo-800">
            <Link to="/login" className="flex items-center space-x-3 text-indigo-300 hover:text-white transition p-2">
              <LogOut size={20} />
              <span>Logout</span>
            </Link>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="bg-white shadow-sm p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">User Dashboard</h2>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 font-medium">Welcome back, {user.name}!</span>
              <div className="h-10 w-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">
                {user.name.charAt(0)}
              </div>
            </div>
          </header>

          <main className="p-8">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 uppercase font-bold">My Bookings</p>
                <h3 className="text-3xl font-bold text-gray-800">{myBookings.length}</h3>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 uppercase font-bold">Available Rooms</p>
                <h3 className="text-3xl font-bold text-indigo-600">{rooms.filter(r => r.isAvailable).length}</h3>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 uppercase font-bold">Status</p>
                <h3 className="text-3xl font-bold text-green-500">Active</h3>
              </div>
            </div>

            {/* MY BOOKINGS STATUS SECTION */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">My Recent Requests</h2>
              <div className="grid grid-cols-1 gap-4">
                {myBookings.length === 0 ? (
                  <div className="bg-gray-100 p-6 rounded-xl text-center text-gray-500 border-2 border-dashed">
                    You haven't made any booking requests yet.
                  </div>
                ) : (
                  myBookings.map((b) => (
                    <div key={b._id} className={`p-5 rounded-xl border-l-8 bg-white shadow-sm flex justify-between items-center ${b.status === "Approved" ? "border-green-500" :
                      b.status === "Rejected" ? "border-red-500" : "border-yellow-500"
                      }`}>
                      <div>
                        <h4 className="font-bold text-gray-800">{b.room?.name || "Room details unavailable"}</h4>
                        <p className="text-sm text-gray-500">{b.date} | {b.startTime} - {b.endTime}</p>
                        {b.adminMessage && (
                          <p className={`mt-2 text-sm italic ${b.status === "Approved" ? "text-green-600" : "text-red-600"}`}>
                            Admin: "{b.adminMessage}"
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className={`px-4 py-1 rounded-full text-xs font-black uppercase ${b.status === "Approved" ? "bg-green-100 text-green-700" :
                          b.status === "Rejected" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                          }`}>
                          {b.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* ROOMS LIST SECTION */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore Available Spaces</h2>
              {rooms.length === 0 ? (
                <div className="bg-white rounded-xl p-10 text-center border border-dashed border-gray-300">
                  <p className="text-gray-500 italic">No rooms found. Contact Admin to add rooms.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rooms.map((room) => (
                    <div key={room._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition-all flex flex-col">
                      <div className="h-32 bg-indigo-100 flex items-center justify-center">
                        <MapPin size={40} className="text-indigo-400" />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-gray-800">{room.name}</h3>
                          <span className={`px-2 py-1 rounded text-[10px] font-black ${room.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {room.isAvailable ? "AVAILABLE" : "OCCUPIED"}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm mb-4">{room.space}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {room.amenities?.map((item, index) => (
                            <span key={index} className="bg-gray-100 text-gray-600 text-[10px] px-2 py-1 rounded-full uppercase font-bold">
                              {item}
                            </span>
                          ))}
                        </div>
                        <div className="mt-auto border-t border-gray-50 pt-4 flex justify-between items-center">
                          <div className="flex items-center gap-1 text-gray-700 font-bold">
                            <span className="text-indigo-600">Ksh {room.pricePerHour}</span>
                            <span className="text-xs text-gray-400 font-normal">/hr</span>
                          </div>
                          <Link to="/BookRoom" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 underline">
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}
