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

            // Critical Check: Only let them in if they are an admin
            if (res.data.user.role === "admin") {
                localStorage.setItem("adminToken", res.data.token);
                localStorage.setItem("adminUser", JSON.stringify(res.data.user));
                navigate("/bs2-dashboard");
            } else {
                alert("Access Denied: You do not have Administrative privileges.");
            }
        } catch (err) {
            alert("Invalid Admin Credentials");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-2xl w-96 space-y-6">
                <div className="text-center">
                    <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="text-indigo-600" size={30} />
                    </div>
                    <h1 className="text-2xl font-black text-gray-800">BS2 ADMIN</h1>
                    <p className="text-gray-500 text-sm">Authorized Personnel Only</p>
                </div>

                <input
                    type="email" placeholder="Admin Email"
                    className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) => setEmail(e.target.value)} required
                />
                <input
                    type="password" placeholder="Password"
                    className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) => setPassword(e.target.value)} required
                />

                <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-black transition">
                    Enter Console
                </button>
            </form>
        </div>
    );
}