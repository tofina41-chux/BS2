import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // --- TOGGLE THIS TO SWITCH BETWEEN REAL LOGIN AND TEST BYPASS ---
    const useRealLogin = true;

    if (useRealLogin) {
      try {
        const res = await api.post("/auth/login", form);
        const userData = {
          id: res.data.user.id,
          name: res.data.user.name,
          email: res.data.user.email,
          role: res.data.user.role,
          loggedIn: true,
        };

        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        navigate("/dashboard");
      } catch (err) {
        alert("Login failed: " + (err.response?.data?.message || "Server Error"));
      } finally {
        setLoading(false);
      }
    } else {
      // --- TEST BYPASS MODE ---
      const fakeUser = {
        id: "mock_id_123",
        name: "Test Admin",
        email: "admin@test.com",
        role: "admin",
        loggedIn: true,
      };
      localStorage.setItem("user", JSON.stringify(fakeUser));
      setUser(fakeUser);
      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard");
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
        {/* Branding Header */}
        <div className="text-center mb-8">
          <h1 className="text-blue-600 text-sm font-black tracking-widest uppercase mb-2">
            Swahilipot Booking System
          </h1>
          <h2 className="text-3xl font-extrabold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 mt-2 text-sm">Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              name="email"
              type="email"
              required
              placeholder="name@company.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-600 cursor-pointer">
              <input type="checkbox" className="mr-2 rounded" /> Remember me
            </label>
            <a href="#" className="text-blue-600 hover:underline font-semibold">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/Register" className="text-blue-600 font-bold hover:underline">
            Register for free
          </Link>
        </div>
      </div>
    </div>
  );
}