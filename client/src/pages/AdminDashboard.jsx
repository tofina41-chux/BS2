import React, { useState } from 'react';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Admin Panel</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Room</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Room Name</label>
            <input type="text" className="w-full p-2 border rounded mt-1" placeholder="e.g. Boardroom" />
          </div>
          <div>
            <label className="block text-sm font-medium">Capacity</label>
            <input type="number" className="w-full p-2 border rounded mt-1" />
          </div>
          <button className="w-full bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700">
            Create Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;