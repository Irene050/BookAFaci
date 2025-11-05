import React from 'react';
import { useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router';
import { toast } from 'react-toastify';
import Sidebar, { SidebarItem } from '../components/sidebar';
import {
  Building2,
  LayoutDashboard,
} from "lucide-react"

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
    <div className="flex h-screen">
      <title>Dashboard</title>
      <Sidebar>
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={true} />
        <SidebarItem type="button" icon={<Building2 size={20} />} text="Facilities" active={false} onClick={() => navigate('/facilities')} />
      </Sidebar>

      <main className="flex-1 p-6">
        <h3 className="text-2xl font-bold">Welcome, {user.name}!</h3>
      </main>
    </div>
  );
}

export default Dashboard;