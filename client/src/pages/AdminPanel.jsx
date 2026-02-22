import { useState, useEffect } from "react";
import api from "../api/axios";
import {
  PlusCircle,
  CheckCircle,
  XCircle,
  History,
  Trash2,
  DoorOpen
} from "lucide-react";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("rooms");
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({ name: "", space: "", capacity: "", pricePerHour: "", amenities: "" });

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
      setForm({ name: "", space: "", capacity: "", pricePerHour: "", amenities: "" });
      fetchData();
    } catch (err) { alert("Failed to add room"); }
  };

  // ✅ FIXED: Now correctly passes ID in the URL path
  const handleStatusUpdate = async (id, status) => {
    const msg = status === "Approved" ? "Confirmed! See you then." : "Rejected. Time slot unavailable.";
    try {
      await api.patch(`/bookings/status/${id}`, { status, adminMessage: msg });
      alert(`Booking ${status}`);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Status update failed");
    }
  };

  const handleDeleteRoom = async (id) => {
    if (!window.confirm("Delete this room?")) return;
    try {
      await api.delete(`/rooms/${id}`);
      fetchData();
    } catch (err) { alert("Delete failed"); }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-64 bg-gray-900 text-white p-6 space-y-8">
        <h1 className="text-xl font-black text-indigo-400 text-center tracking-tighter">ADMIN CONSOLE</h1>
        <nav className="space-y-4">
          <button onClick={() => setActiveTab("rooms")} className={`flex items-center space-x-3 w-full p-2 rounded transition ${activeTab === "rooms" ? "bg-indigo-600 shadow-lg" : "hover:bg-gray-800"}`}>
            <DoorOpen size={20} /> <span>Manage Rooms</span>
          </button>
          <button onClick={() => setActiveTab("bookings")} className={`flex items-center space-x-3 w-full p-2 rounded transition ${activeTab === "bookings" ? "bg-indigo-600 shadow-lg" : "hover:bg-gray-800"}`}>
            <CheckCircle size={20} /> <span>Approvals</span>
          </button>
          <button onClick={() => setActiveTab("history")} className={`flex items-center space-x-3 w-full p-2 rounded transition ${activeTab === "history" ? "bg-indigo-600 shadow-lg" : "hover:bg-gray-800"}`}>
            <History size={20} /> <span>History</span>
          </button>
        </nav>
      </div>

      <div className="flex-1 p-10 overflow-y-auto">
        {activeTab === "rooms" && (
          <div className="space-y-10 animate-in fade-in duration-500">
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                <PlusCircle className="text-indigo-600" /> Add New Room
              </h2>
              <form onSubmit={handleAddRoom} className="grid grid-cols-2 gap-4">
                <input name="name" placeholder="Room Name" className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" onChange={handleChange} value={form.name} required />
                <input name="space" placeholder="Location (e.g. 1st Floor)" className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" onChange={handleChange} value={form.space} required />
                <input name="capacity" type="number" placeholder="Capacity" className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" onChange={handleChange} value={form.capacity} required />
                <input name="pricePerHour" type="number" placeholder="Ksh per Hour" className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" onChange={handleChange} value={form.pricePerHour} required />
                <textarea name="amenities" placeholder="Amenities (Wifi, Projector, AC...)" className="col-span-2 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" onChange={handleChange} value={form.amenities}></textarea>
                <button className="col-span-2 bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition shadow-lg active:scale-95">Create Room</button>
              </form>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4 text-gray-700">Existing Inventory</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rooms.map(room => (
                  <div key={room._id} className="bg-white p-4 rounded-xl shadow-sm border flex justify-between items-center hover:border-indigo-200 transition">
                    <div>
                      <p className="font-bold text-gray-800">{room.name}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-widest">{room.space}</p>
                    </div>
                    <button onClick={() => handleDeleteRoom(room._id)} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition"><Trash2 size={18} /></button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
            <div className="p-6 border-b bg-amber-50">
              <h2 className="text-xl font-bold text-amber-800">Pending Approvals</h2>
              <p className="text-sm text-amber-600">Requests requiring your attention</p>
            </div>
            <div className="p-6 space-y-4">
              {bookings.filter(b => b.status === "Pending").length === 0 ? (
                <p className="text-center text-gray-400 py-10">No pending requests at the moment.</p>
              ) : (
                bookings.filter(b => b.status === "Pending").map(booking => (
                  <div key={booking._id} className="flex flex-col md:flex-row md:items-center justify-between p-5 border rounded-2xl hover:bg-gray-50 transition border-gray-100">
                    <div className="mb-4 md:mb-0">
                      <h4 className="font-black text-gray-800 text-lg">{booking.userName}</h4>
                      <div className="flex flex-wrap gap-x-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1 font-medium text-indigo-600">{booking.room?.name}</span>
                        <span>{booking.date}</span>
                        <span className="font-mono bg-gray-100 px-1 rounded">{booking.startTime} - {booking.endTime}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => handleStatusUpdate(booking._id, "Approved")} className="flex-1 md:flex-none flex items-center justify-center gap-1 bg-green-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-green-700 transition active:scale-95">
                        <CheckCircle size={16} /> Approve
                      </button>
                      <button onClick={() => handleStatusUpdate(booking._id, "Rejected")} className="flex-1 md:flex-none flex items-center justify-center gap-1 bg-red-50 text-red-600 px-6 py-2 rounded-xl text-sm font-bold border border-red-100 hover:bg-red-100 transition active:scale-95">
                        <XCircle size={16} /> Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 animate-in fade-in duration-700">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 font-bold text-gray-400 text-xs uppercase tracking-widest">Client</th>
                  <th className="p-4 font-bold text-gray-400 text-xs uppercase tracking-widest">Resource</th>
                  <th className="p-4 font-bold text-gray-400 text-xs uppercase tracking-widest">Schedule</th>
                  <th className="p-4 font-bold text-gray-400 text-xs uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b._id} className="border-b last:border-0 hover:bg-gray-50 transition">
                    <td className="p-4">
                      <div className="font-bold text-gray-800">{b.userName}</div>
                      <div className="text-xs text-gray-400">{b.userEmail}</div>
                    </td>
                    <td className="p-4 font-medium text-gray-700">{b.room?.name || "N/A"}</td>
                    <td className="p-4">
                      <div className="text-sm font-semibold">{b.date}</div>
                      <div className="text-xs text-gray-400">{b.startTime} - {b.endTime}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${b.status === "Approved" ? "bg-green-100 text-green-700" :
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