import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  // This 'user' state will start as null (not logged in)
  const [user, setUser] = useState({ loggedIn: false, role: null });

  return (
    <Router>
      <Routes>
        {/* Pass the setUser function to Login so it can update the state */}
        <Route path="/login" element={<Login setUser={setUser} />} />

        <Route 
          path="/dashboard" 
          element={user.loggedIn ? <UserDashboard /> : <Navigate to="/login" />} 
        />

        <Route 
          path="/admin/dashboard" 
          element={user.loggedIn && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/dashboard" />} 
        />

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;