import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="space-x-4">
        <Link to="/book" className="bg-blue-600 text-white px-4 py-2 rounded">
          Book Room
        </Link>

        <Link to="/admin" className="bg-gray-800 text-white px-4 py-2 rounded">
          Admin Panel
        </Link>
      </div>
    </div>
  );
}
