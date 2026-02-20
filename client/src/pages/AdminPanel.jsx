import { useState, useEffect } from "react";
import api from "../api/axios";
import {
  PlusCircle,
  CheckCircle,
  XCircle,
  History,
  Users,
  Trash2,
  DoorOpen
} from "lucide-react";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("rooms"); // rooms, bookings, users
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({ name: "", space: "", capacity: "", price: "", amenities: "" });

  // Fetch all data on load
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const roomRes = await api.get("/rooms/all");
      const bookingRes = await api.get("/bookings/all");
      setRooms(roomRes.data);
      setBookings(bookingRes.data);
    } catch (err) {
      console.error("Error fetching admin data");
    }
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      await api.post("/rooms/add", form);
      alert("Room added successfully!");
      setForm({ name: "", space: "", capacity: "", price: "", amenities: "" });
      fetchData();
    } catch (err) { alert("Failed to add room"); }
  };

  const handleStatusUpdate = async (id, status) => {
    const msg = status === "Approved" ? "Confirmed! See you then." : "Rejected. Time slot unavailable.";
    try {
      await api.patch("/bookings/status", { bookingId: id, status, adminMessage: msg });
      fetchData();
    } catch (err) { alert("Status update failed"); }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Admin Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 space-y-8">
        <h1 className="text-xl font-black text-indigo-400">ADMIN CONSOLE</h1>
        <nav className="space-y-4">
          <button onClick={() => setActiveTab("rooms")} className={`flex items-center space-x-3 w-full p-2 rounded ${activeTab === "rooms" ? "bg-indigo-600" : "hover:bg-gray-800"}`}>
            <DoorOpen size={20} /> <span>Manage Rooms</span>
          </button>
          <button onClick={() => setActiveTab("bookings")} className={`flex items-center space-x-3 w-full p-2 rounded ${activeTab === "bookings" ? "bg-indigo-600" : "hover:bg-gray-800"}`}>
            <CheckCircle size={20} /> <span>Approvals</span>
          </button>
          <button onClick={() => setActiveTab("history")} className={`flex items-center space-x-3 w-full p-2 rounded ${activeTab === "history" ? "bg-indigo-600" : "hover:bg-gray-800"}`}>
            <History size={20} /> <span>History</span>
          </button>
        </nav>
      </div>

      {/* Main Panel Area */}
      <div className="flex-1 p-10 overflow-y-auto">

        {/* TAB: MANAGE ROOMS */}
        {activeTab === "rooms" && (
          <div className="space-y-10">
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <PlusCircle className="text-indigo-600" /> Add New Room
              </h2>
              <form onSubmit={handleAddRoom} className="grid grid-cols-2 gap-4">
                <input name="name" placeholder="Room Name" className="p-3 border rounded-lg" onChange={handleChange} value={form.name} required />
                <input name="space" placeholder="Space (e.g. Ground Floor)" className="p-3 border rounded-lg" onChange={handleChange} value={form.space} required />
                <input name="capacity" type="number" placeholder="Capacity" className="p-3 border rounded-lg" onChange={handleChange} value={form.capacity} required />
                <input name="price" type="number" placeholder="Price (Ksh/hr)" className="p-3 border rounded-lg" onChange={handleChange} value={form.price} required />
                <textarea name="amenities" placeholder="Amenities (Comma separated: Wifi, AC, Projector)" className="col-span-2 p-3 border rounded-lg" onChange={handleChange} value={form.amenities}></textarea>
                <button className="col-span-2 bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition shadow-lg">Create Room</button>
              </form>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4">Current Rooms</h3>
              <div className="grid grid-cols-3 gap-4">
                {rooms.map(room => (
                  <div key={room._id} className="bg-white p-4 rounded-xl shadow-sm border flex justify-between items-center">
                    <div>
                      <p className="font-bold">{room.name}</p>
                      <p className="text-xs text-gray-500">{room.space}</p>
                    </div>
                    <button className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={18} /></button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* TAB: PENDING APPROVALS */}
        {activeTab === "bookings" && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b bg-yellow-50">
              <h2 className="text-xl font-bold text-yellow-800">Pending Approvals</h2>
            </div>
            <div className="p-6 space-y-4">
              {bookings.filter(b => b.status === "Pending").map(booking => (
                <div key={booking._id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition">
                  <div>
                    <h4 className="font-bold text-gray-800">{booking.userName}</h4>
                    <p className="text-sm text-gray-500">{booking.room?.name} • {booking.date} • {booking.startTime} - {booking.endTime}</p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => handleStatusUpdate(booking._id, "Approved")} className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-green-700">
                      <CheckCircle size={16} /> Approve
                    </button>
                    <button onClick={() => handleStatusUpdate(booking._id, "Rejected")} className="flex items-center gap-1 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-red-700">
                      <XCircle size={16} /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: HISTORY */}
        {activeTab === "history" && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 font-bold text-gray-600 text-sm uppercase">User</th>
                  <th className="p-4 font-bold text-gray-600 text-sm uppercase">Room</th>
                  <th className="p-4 font-bold text-gray-600 text-sm uppercase">Date</th>
                  <th className="p-4 font-bold text-gray-600 text-sm uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b._id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-bold">{b.userName}</div>
                      <div className="text-xs text-gray-400">{b.userEmail}</div>
                    </td>
                    <td className="p-4 font-medium">{b.room?.name || "Deleted Room"}</td>
                    <td className="p-4 text-sm text-gray-600">{b.date}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${b.status === "Approved" ? "bg-green-100 text-green-700" :
                          b.status === "Rejected" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                        }`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}