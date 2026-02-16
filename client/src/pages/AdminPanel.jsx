import { useState } from "react";
import api from "../api/axios";

export default function AdminPanel() {
  const [room, setRoom] = useState({
    name: "",
    capacity: "",
    location: ""
  });

  const handleChange = e => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const createRoom = async e => {
    e.preventDefault();

    try {
      await api.post("/rooms", room);
      alert("Room created!");
    } catch {
      alert("Failed");
    }
  };

  return (
    <div className="p-8 max-w-xl">
      <h2 className="text-2xl font-bold mb-4">Admin Panel - Create Room</h2>

      <form onSubmit={createRoom} className="space-y-3">
        <input name="name" placeholder="Room Name" className="border p-2 w-full" onChange={handleChange}/>
        <input name="capacity" placeholder="Capacity" className="border p-2 w-full" onChange={handleChange}/>
        <input name="location" placeholder="Location" className="border p-2 w-full" onChange={handleChange}/>

        <button className="bg-black text-white px-4 py-2 rounded">
          Create Room
        </button>
      </form>
    </div>
  );
}
