import React from 'react';
import { useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router';
import { toast } from 'react-toastify';
import Sidebar, { SidebarItem } from '../components/sidebar';
import Topbar from '../components/topbar';
import loginbg from '../assets/Gradient blur.png'
import Calendar from '../components/calendar';

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
    <div className="flex h-screen transition-all">
      <title>Dashboard</title>
      <Sidebar>
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={true} />
        <SidebarItem type="button" icon={<Building2 size={20} />} text="Facilities" active={false} onClick={() => navigate('/facilities')} />
      </Sidebar>

      <main className="flex-1 pl-6 pr-6 bg-center bg-cover h-full relative" style={{
          paddingLeft: '5.5rem', // or '16rem' when expanded; quick fix keeps main visible
          backgroundImage: `linear-gradient(rgba(194, 217, 249, 0.9), rgba(194, 217, 249, 0.9)), url(${loginbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
          <Topbar />

        <div className="bg-gradient-to-b from-[#E0E0E0] via-[#DDF2FF] to-[#E0E0E0] h-fit rounded-[10px] p-[1px] mt-[20px]">
          <h1 className='pl-[35px] pt-[35px] mb-5 font-inter font-bold text-[2rem] text-[#007BDA]'>Dashboard</h1>
            <div className='flex items-center gap-[10rem] mb-1 pl-[45px] pr-[45px] pb-[45px]'>
              <div className='flex grow items-center justify-center text-center bg-slate-300 w-[250px] h-[150px] p-[10px] rounded-[20px] drop-shadow-lg'></div>
              <div className='flex grow items-center justify-center text-center bg-slate-300 w-[250px] h-[150px] p-[10px] rounded-[20px] drop-shadow-lg'></div>
              <div className='flex grow items-center justify-center text-center bg-slate-300 w-[250px] h-[150px] p-[10px] rounded-[20px] drop-shadow-lg'></div>
              <div className='flex grow items-center justify-center text-center bg-slate-300 w-[250px] h-[150px] p-[10px] rounded-[20px] drop-shadow-lg'></div>
            </div>

            <div className='grid grid-flow-col gap-[45px] pl-[45px] pr-[45px] pb-[45px]'>
              <div className='flex items-center justify-center text-center bg-white col-span-2 h-[15rem] rounded-[10px] drop-shadow-lg transition-all hover:transform hover:scale-[1.01]'></div>
              <div className='flex items-center justify-center text-center bg-white col-span-2 h-[13rem] rounded-[10px] drop-shadow-lg transition-all hover:transform hover:scale-[1.01]'></div>
              <div className='font-inter flex items-center justify-center text-center bg-white col-span-2 row-span-2 rounded-[10px] drop-shadow-lg transition-all hover:transform hover:scale-[1.01]'><Calendar /></div>
            </div>

        </div>
      </main>
    </div>
  );
}

export default Dashboard;