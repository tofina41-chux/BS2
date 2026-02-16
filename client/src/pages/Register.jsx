import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await api.post("/auth/register", form);
      navigate("/");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white p-8 shadow rounded w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6">Register</h2>

        <input name="name" placeholder="Name" className="w-full border p-2 mb-3" onChange={handleChange}/>
        <input name="email" placeholder="Email" className="w-full border p-2 mb-3" onChange={handleChange}/>
        <input name="password" type="password" placeholder="Password" className="w-full border p-2 mb-3" onChange={handleChange}/>

        <button className="bg-green-600 text-white w-full py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
