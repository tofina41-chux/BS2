import { Link } from "react-router-dom";
import { LayoutDashboard, CalendarPlus, ShieldCheck, LogOut, User } from "lucide-react"; // Optional: npm install lucide-react

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-900 text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold tracking-tight">SWAHILIPOT</h1>
          <p className="text-indigo-300 text-xs uppercase tracking-widest">Booking System</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link to="/dashboard" className="flex items-center space-x-3 bg-indigo-800 p-3 rounded-lg">
            <LayoutDashboard size={20} />
            <span>Overview</span>
          </Link>
          <Link to="/BookRoom" className="flex items-center space-x-3 hover:bg-indigo-800 p-3 rounded-lg transition">
            <CalendarPlus size={20} />
            <span>Book a Room</span>
          </Link>
          <Link to="/admin/dashboard" className="flex items-center space-x-3 hover:bg-indigo-800 p-3 rounded-lg transition">
            <ShieldCheck size={20} />
            <span>Admin Panel</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-indigo-800">
          <Link to="/login" className="flex items-center space-x-3 text-indigo-300 hover:text-white transition p-2">
            <LogOut size={20} />
            <span>Logout</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">User Dashboard</h2>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600 font-medium">Welcome back, User!</span>
            <div className="h-10 w-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center">
              <User size={24} />
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 uppercase font-bold">Total Bookings</p>
              <h3 className="text-3xl font-bold text-gray-800">0</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 uppercase font-bold">Active Requests</p>
              <h3 className="text-3xl font-bold text-indigo-600">None</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 uppercase font-bold">System Status</p>
              <h3 className="text-3xl font-bold text-green-500">Online</h3>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Ready to book a space?</h3>
            <p className="text-gray-500 mb-6">Choose from our available training rooms and event spaces.</p>
            <Link to="/BookRoom" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-bold transition shadow-lg inline-block">
              + Start New Booking
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
