import React from 'react';

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Available Rooms</h1>
        <button className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* We will map through real rooms here later */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold">Conference Room A</h2>
          <p className="text-gray-500">Capacity: 10 people</p>
          <p className="text-sm mt-2 text-blue-600 font-medium">Equip: Projector, Whiteboard</p>
          <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            View Slots
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;