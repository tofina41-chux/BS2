import { useState, useEffect } from "react";
import api from "../api/axios";
import {
  PlusCircle,
  CheckCircle,
  XCircle,
  History,
  Trash2,
  DoorOpen,
  Image as ImageIcon,
  LayoutDashboard
} from "lucide-react";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("rooms");
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  // ✅ UPDATED: Added 'image' to the form state
  const [form, setForm] = useState({ 
    name: "", 
    space: "", 
    capacity: "", 
    pricePerHour: "", 
    amenities: "",
    image: "" 
  });

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
  
  // Format the data properly before sending to backend
  const formattedData = {
    ...form,
    capacity: Number(form.capacity),
    pricePerHour: Number(form.pricePerHour),
    // Convert comma-separated string to an actual Array
    amenities: typeof form.amenities === 'string' 
      ? form.amenities.split(",").map(item => item.trim()) 
      : form.amenities
  };

  try {
    await api.post("/rooms/add", formattedData);
    alert("Room added successfully!");
    setForm({ name: "", space: "", capacity: "", pricePerHour: "", amenities: "", image: "" });
    fetchData();
  } catch (err) { 
    console.error(err.response?.data);
    alert("Failed to add room: " + (err.response?.data?.error || "Check console")); 
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
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="w-72 bg-slate-900 text-white p-8 flex flex-col shadow-2xl">
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-black text-white tracking-tighter italic">SWAHILIPOT</h1>
          <span className="text-indigo-400 text-xs font-bold tracking-[0.3em] uppercase">Admin Console</span>
        </div>
        
        <nav className="space-y-3 flex-1">
          <button onClick={() => setActiveTab("rooms")} className={`flex items-center gap-3 w-full p-4 rounded-2xl transition-all duration-300 ${activeTab === "rooms" ? "bg-indigo-600 shadow-xl shadow-indigo-900/50" : "hover:bg-slate-800 text-slate-400"}`}>
            <LayoutDashboard size={20} /> <span className="font-bold">Inventory</span>
          </button>
          <button onClick={() => setActiveTab("bookings")} className={`flex items-center gap-3 w-full p-4 rounded-2xl transition-all duration-300 ${activeTab === "bookings" ? "bg-indigo-600 shadow-xl shadow-indigo-900/50" : "hover:bg-slate-800 text-slate-400"}`}>
            <CheckCircle size={20} /> <span className="font-bold">Approvals</span>
          </button>
          <button onClick={() => setActiveTab("history")} className={`flex items-center gap-3 w-full p-4 rounded-2xl transition-all duration-300 ${activeTab === "history" ? "bg-indigo-600 shadow-xl shadow-indigo-900/50" : "hover:bg-slate-800 text-slate-400"}`}>
            <History size={20} /> <span className="font-bold">Full History</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-12 overflow-y-auto">
        
        {/* Analytics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Total Rooms</p>
                <h4 className="text-3xl font-black text-slate-800">{rooms.length}</h4>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm border-l-4 border-l-amber-400">
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Pending Approvals</p>
                <h4 className="text-3xl font-black text-slate-800">{bookings.filter(b => b.status === "Pending").length}</h4>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm border-l-4 border-l-green-400">
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Confirmed Today</p>
                <h4 className="text-3xl font-black text-slate-800">{bookings.filter(b => b.status === "Approved").length}</h4>
            </div>
        </div>

        {activeTab === "rooms" && (
          <div className="space-y-10">
            {/* Add Room Section */}
            <section className="bg-white p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white">
              <h2 className="text-2xl font-black mb-8 flex items-center gap-3 text-slate-800 uppercase tracking-tight">
                <PlusCircle className="text-indigo-600" size={28} /> Add New Asset
              </h2>
              <form onSubmit={handleAddRoom} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <input name="name" placeholder="Room Name" className="p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" onChange={handleChange} value={form.name} required />
                <input name="space" placeholder="Location (e.g. Wing A)" className="p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" onChange={handleChange} value={form.space} required />
                <input name="capacity" type="number" placeholder="Capacity" className="p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" onChange={handleChange} value={form.capacity} required />
                <input name="pricePerHour" type="number" placeholder="Ksh / Hour" className="p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" onChange={handleChange} value={form.pricePerHour} required />
                
                {/* ✅ UPDATED: Image URL input */}
                <div className="lg:col-span-2 relative">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input name="image" placeholder="Image URL (Unsplash or Imgur link)" className="w-full pl-12 p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" onChange={handleChange} value={form.image} />
                </div>

                <textarea name="amenities" placeholder="Amenities (Wifi, AC, etc.)" className="md:col-span-2 lg:col-span-3 p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" onChange={handleChange} value={form.amenities}></textarea>
                <button className="lg:col-span-3 bg-indigo-600 text-white font-black py-5 rounded-2xl hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 uppercase tracking-widest text-sm active:scale-95">Publish Room</button>
              </form>
            </section>

            {/* Room List Section */}
            <section>
              <h3 className="text-xl font-black mb-6 text-slate-800 uppercase tracking-wider">Current Inventory</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {rooms.map(room => (
                  <div key={room._id} className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition group">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0">
                      <img src={room.image || "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=100"} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-800 leading-tight">{room.name}</p>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{room.space}</p>
                    </div>
                    <button onClick={() => handleDeleteRoom(room._id)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 hover:bg-red-50 p-3 rounded-xl transition">
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ... (Approvals and History tabs stay the same but will automatically use the new styling) ... */}
        {activeTab === "bookings" && (
           <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100 animate-in slide-in-from-bottom-4 duration-500">
             <div className="p-8 border-b bg-amber-50/50 flex justify-between items-center">
               <div>
                 <h2 className="text-2xl font-black text-amber-900">Pending Approvals</h2>
                 <p className="text-amber-600/70 font-medium">Verify guest requests before they are confirmed</p>
               </div>
               <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-black text-sm">
                 {bookings.filter(b => b.status === "Pending").length} WAITING
               </div>
             </div>
             <div className="p-8 space-y-4">
               {bookings.filter(b => b.status === "Pending").map(booking => (
                 <div key={booking._id} className="flex flex-col md:flex-row md:items-center justify-between p-6 border-2 border-slate-50 rounded-[1.5rem] hover:border-indigo-100 transition">
                    {/* ... (Booking info same as before) ... */}
                    <div className="mb-4 md:mb-0">
                      <h4 className="font-black text-slate-900 text-xl">{booking.userName}</h4>
                      <div className="flex flex-wrap gap-x-6 gap-y-1 mt-1 text-sm text-slate-500 font-medium">
                        <span className="flex items-center gap-1 text-indigo-600 font-bold underline underline-offset-4 decoration-2">{booking.room?.name}</span>
                        <span>{booking.date}</span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded-lg">{booking.startTime} - {booking.endTime}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => handleStatusUpdate(booking._id, "Approved")} className="bg-green-600 text-white px-8 py-3 rounded-2xl text-sm font-black shadow-lg shadow-green-100 hover:bg-green-700 transition active:scale-95">Approve</button>
                      <button onClick={() => handleStatusUpdate(booking._id, "Rejected")} className="bg-slate-100 text-slate-500 px-8 py-3 rounded-2xl text-sm font-black hover:bg-red-50 hover:text-red-600 transition active:scale-95">Reject</button>
                    </div>
                 </div>
               ))}
             </div>
           </div>
        )}

        {/* (History Tab stays functional as you had it) */}
        {activeTab === "history" && (
            <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Client</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Resource</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(b => (
                            <tr key={b._id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition">
                                <td className="p-6">
                                    <p className="font-black text-slate-800">{b.userName}</p>
                                    <p className="text-xs text-slate-400 font-medium">{b.userEmail}</p>
                                </td>
                                <td className="p-6">
                                    <p className="font-bold text-slate-700">{b.room?.name || "Deleted Room"}</p>
                                    <p className="text-xs text-slate-400">{b.date}</p>
                                </td>
                                <td className="p-6">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                        b.status === "Approved" ? "bg-green-100 text-green-700" :
                                        b.status === "Rejected" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
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