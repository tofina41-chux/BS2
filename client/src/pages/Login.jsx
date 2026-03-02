import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail, ArrowRight } from "lucide-react";

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
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      const userData = {
        id: res.data.user.id,
        name: res.data.user.name,
        email: res.data.user.email,
        role: res.data.user.role,
        loggedIn: true,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      if (setUser) setUser(userData);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || "Invalid credentials"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side: Branding & Image */}
      <div className="hidden lg:flex w-1/2 bg-indigo-900 relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
          alt="Swahilipot Hub" 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 flex flex-col justify-center px-20 text-white">
          <div className="bg-blue-500 w-16 h-1 mb-6"></div>
          <h1 className="text-6xl font-black mb-4 uppercase tracking-tighter">
            Swahilipot <br /> <span className="text-blue-400">Booking</span>
          </h1>
          <p className="text-xl text-indigo-100 max-w-md leading-relaxed">
            Secure your spot in the most vibrant tech and cultural hub on the coast.
          </p>
        </div>
      </div>

      {/* Right Side: The Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-black text-slate-900 mb-3">Welcome Back</h2>
            <p className="text-slate-500 font-medium text-lg">Enter your details to access your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  name="email" 
                  type="email" 
                  required
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-indigo-600 focus:bg-white transition-all outline-none text-slate-700" 
                  placeholder="e.g. jdoe@swahilipot.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  name="password" 
                  type="password" 
                  required
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-indigo-600 focus:bg-white transition-all outline-none text-slate-700" 
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black shadow-xl shadow-indigo-100 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
            >
              {loading ? "Verifying..." : "Sign In"}
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-500">
              New here?{" "}
              <Link to="/Register" className="text-indigo-600 font-bold hover:underline underline-offset-4">
                Create a free account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}