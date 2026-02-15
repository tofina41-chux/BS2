import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // MOCK LOGIC: 
    // If email contains "admin", log in as admin. 
    // Otherwise, log in as a normal user.
    if (email.includes('admin')) {
      setUser({ loggedIn: true, role: 'admin' });
      navigate('/admin/dashboard');
    } else {
      setUser({ loggedIn: true, role: 'user' });
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="p-10 bg-white rounded shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-5 text-center">BS2 Login</h2>
        <input 
          type="email" 
          placeholder="Email (use 'admin' for admin view)" 
          className="w-full p-3 border rounded mb-4"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;