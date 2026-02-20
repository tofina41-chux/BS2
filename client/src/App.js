import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Register from './pages/Register';

function App() {
  // This 'user' state will start as null (not logged in)
  const [user, setUser] = useState({ loggedIn: true, role: 'admin' });

  return (
    <Router>
      <Routes>
        {/* Pass the setUser function to Login so it can update the state */}
        <Route path="/login" element={<Login setUser={setUser} />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={user.loggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />

       // Change your Admin Route to check the REAL stored user
        <Route
          path="/admin/dashboard"
          element={
            (() => {
              const storedUser = JSON.parse(localStorage.getItem("user"));
              return (storedUser?.loggedIn && storedUser?.role === 'admin')
                ? <AdminPanel />
                : <Navigate to="/dashboard" />;
            })()
          }
        />

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;