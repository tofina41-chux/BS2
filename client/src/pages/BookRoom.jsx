import { useEffect, useState } from "react";
import api from "../api/axios";

export default function BookRoom() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    roomId: "",
    date: "",
    startTime: "",
    endTime: ""
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const res = await api.get("/rooms");
    setRooms(res.data);
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await api.post("/bookings", form);
      alert("Room booked!");
    } catch {
      alert("Booking failed");
    }
  };

  return (
    <div className="p-8 max-w-xl">
      <h2 className="text-2xl mb-4 font-bold">Book Room</h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        <select name="roomId" className="border p-2 w-full" onChange={handleChange}>
          <option>Select Room</option>
          {rooms.map(r => (
            <option key={r._id} value={r._id}>{r.name}</option>
          ))}
        </select>

        <input name="date" type="date" className="border p-2 w-full" onChange={handleChange}/>
        <input name="startTime" type="datetime-local" className="border p-2 w-full" onChange={handleChange}/>
        <input name="endTime" type="datetime-local" className="border p-2 w-full" onChange={handleChange}/>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Book
        </button>
      </form>
    </div>
  );
}
