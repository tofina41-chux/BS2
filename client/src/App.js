import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Register from './pages/Register';
import BookRoom from "./pages/BookRoom";

function App() {
  // This 'user' state will start as null (not logged in)
  const [user, setUser] = useState({ loggedIn: true, role: 'admin' });

  return (
    <Router>
      <Routes>
        {/* Pass the setUser function to Login so it can update the state */}
        <Route path="/login" element={<Login setUser={setUser} />} />

        <Route path="/register" element={<Register />} />

        <Route path="/BookRoom" element={<BookRoom />} />

        <Route
          path="/dashboard"
          element={user.loggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />

       // Inside your Routes in App.js
        <Route path="/bs2-admin-login" element={<AdminLogin />} />
        <Route path="/bs2-dashboard" element={<AdminPanel />} />

        <Route path="/" element={<Navigate to="/login" />} />

      </Routes>
    </Router>
  );
}

export default App;