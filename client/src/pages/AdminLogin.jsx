import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Lock } from "lucide-react";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", { email, password });
            if (res.data.user.role === "admin") {
                localStorage.setItem("adminUser", JSON.stringify(res.data.user));
                navigate("/bs2-dashboard");
            } else {
                alert("Access Denied: Not an admin account.");
            }
        } catch (err) {
            alert("Invalid credentials.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-96">
                <div className="text-center mb-6">
                    <Lock className="mx-auto text-indigo-600 mb-2" size={40} />
                    <h2 className="text-2xl font-bold">BS2 Admin Login</h2>
                </div>
                <input type="email" placeholder="Email" className="w-full p-3 border rounded mb-4" onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" className="w-full p-3 border rounded mb-6" onChange={e => setPassword(e.target.value)} required />
                <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold">Login</button>
            </form>
        </div>
    );
}