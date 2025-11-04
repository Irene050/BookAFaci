import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

function Dashboard() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/');
    }
  }, [navigate]);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    toast.info('You have been logged out', {
      position: "top-right",
      autoClose: 1000,
    });
    navigate('/');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
      <p className="text-gray-600">Email: {user.email}</p>
      <p className="text-gray-600">Account Type: {user.accountType}</p>
      <button 
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;