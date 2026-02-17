import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 /* const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");

    } catch (err) {
      alert("Login failed");
    }
  };
*/

//THIS PART IS JUST TO TEST AND SEE YOUR DASHBOARD TEMPORARILY BYPASS LOGIN
const handleSubmit = (e) => {
  e.preventDefault();
  // Bypass the backend for now
  localStorage.setItem("token", "fake-test-token");
  navigate("/dashboard");
};
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow rounded w-96"
      >
        <h2 className="text-2xl font-bold mb-6">Login</h2>

        <input
          name="email"
          placeholder="Email"
          className="w-full border p-2 mb-4"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4"
          onChange={handleChange}
        />

        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
