import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";

export default function Header() {
    return (
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center sticky top-0 z-50">
            <div className="flex items-center space-x-2">
                <div className="bg-indigo-600 p-1.5 rounded-lg text-white font-bold">SP</div>
                <span className="font-bold text-gray-800 tracking-tight">SWAHILIPOT BOOKING</span>
            </div>

            <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
                <Link to="/dashboard" className="hover:text-indigo-600">Dashboard</Link>
                <Link to="/BookRoom" className="hover:text-indigo-600">Book Room</Link>
                <Link to="#" className="hover:text-indigo-600">Support</Link>
            </nav>

            <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-gray-700">
                    <UserCircle size={28} />
                </button>
            </div>
        </header>
    );
}