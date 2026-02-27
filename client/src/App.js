import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Register from './pages/Register';
import BookRoom from "./pages/BookRoom";
import AdminLogin from "./pages/AdminLogin"; // 👈 ADD THIS LINE HERE!

function App() {
  // Note: I suggest starting loggedIn as false normally, 
  // but for testing, you can keep your state as is.
  const [user, setUser] = useState({ loggedIn: true, role: 'admin' });

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/BookRoom" element={<BookRoom />} />

        <Route
          path="/dashboard"
          element={user.loggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* These are the BS2 Admin Routes */}
        <Route path="/bs2-admin-login" element={<AdminLogin />} />
        <Route path="/bs2-dashboard" element={<AdminPanel />} />

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;