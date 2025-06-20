import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-purple-700">
          🌟 Solo Sparks
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-sm font-medium text-gray-700 hover:text-purple-700"
          >
            Dashboard
          </Link>
          <Link
            to="/reflect"
            className="text-sm font-medium text-gray-700 hover:text-purple-700"
          >
            Reflection
          </Link>
          <Link
            to="/growth"
            className="text-sm font-medium text-gray-700 hover:text-purple-700"
          >
            Growth
          </Link>
          <Link
            to="/rewards"
            className="text-sm font-medium text-gray-700 hover:text-purple-700"
          >
            Rewards
          </Link>
          <button
            onClick={handleLogout}
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 text-sm rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
