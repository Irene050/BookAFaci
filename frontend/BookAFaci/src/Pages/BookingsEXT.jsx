import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router'
import axios from 'axios'
import { toast } from 'react-toastify'
import Sidebar, { SidebarItem } from '../components/sidebar'
import Topbar from '../components/topbar'
import loginbg from '../assets/Gradient blur.png'

import {
  Building2,
  LayoutDashboard,
  Clipboard
} from "lucide-react"

const base = import.meta.env.VITE_API_URL || "";

    function BookingsEXT() {
        const navigate = useNavigate();
        const [bookings, setBookings] = useState([]);
        const [equipment, setEquipment] = React.useState([])

    useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/');
      return;
    }

    (async () => {
      try {
        const userObj = JSON.parse(user);
        const userId = userObj?._id || userObj?.id;
        if (!userId) return;

        const res = await axios.get(`${base}/bookafaci/book/status/${userId}`);
        // server returns { message, bookings }
        const list = Array.isArray(res.data?.bookings) ? res.data.bookings : [];
        setBookings(list);

        const rRes = await axios.get(`${base}/bookafaci/equipment`).catch(() => ({ data: [] }));
        const equipmentList = Array.isArray(rRes.data) ? rRes.data : (rRes.data?.equipment || rRes.data?.data || []);
        setEquipment(equipmentList);
      } catch (err) {
        console.error('Failed to load bookings', err?.response?.data || err);
        toast.error('Failed to load bookings');
      }
    })();
  }, [navigate]);
                    
  const activeBookings = bookings.filter(b => (b.status || '').toLowerCase() !== 'cancelled');

  return (
    <div className='flex min-h-screen transition-all'>
      <title>Bookings</title>

      <Sidebar>
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={false} onClick={() => navigate('/dashboard-ext')} />
        <SidebarItem icon={<Building2 size={20} />} text="Facilities" active={false} onClick={() => navigate('/facilities-ext')} />
        <SidebarItem icon={<Clipboard size={20} />} text="Bookings" active={true} onClick={() => navigate('/bookings-ext')}/>
      </Sidebar>

      <main className='flex-1 pl-6 pr-6 bg-center bg-cover min-h-screen relative pb-5'
        style={{
            paddingLeft: '5.5rem',
            backgroundImage: `linear-gradient(rgba(194, 217, 249, 0.85), rgba(194, 217, 249, 0.85)), url(${loginbg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}>
        <Topbar />

        <div className='bg-gradient-to-b from-[#E0E0E0] via-[#DDF2FF] to-[#E0E0E0] h-fit rounded-[10px] p-[1px] mt-[20px]'>
          <h1 className='pl-[35px] pt-[35px] mb-5 font-inter font-bold text-[2rem] text-[#007BDA]'>Bookings</h1>
            <div className="px-[45px] pb-[45px]">
            {activeBookings.length === 0 ? (
              <div className="text-gray-500">No active bookings</div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {activeBookings.map((b) => (
                  <div key={b._id} className="bg-[#F7FBFF] rounded-[15px] shadow-md p-5 flex flex-col">
                    <div className="flex-1">
                      <p className="font-bold text-lg text-[#1A1A1A]">{b.facility?.name ?? b.facility ?? 'Facility'}</p>
                  
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-sm text-gray-600">From: {b.startDate ? new Date(b.startDate).toLocaleString() : '-'}</span>
                        <span className="text-sm text-gray-600">To: {b.endDate ? new Date(b.endDate).toLocaleString() : '-'}</span>
                      </div>

                      <div className="mt-3 text-sm text-gray-700">
                        Equipment:
                        {Array.isArray(b.equipment) && b.equipment.length
                          ? <ul className="list-disc list-inside">
                              {b.equipment.map(r => <li key={r._id || r}>{ typeof r === 'object' ? (r.name || r._id) : r }</li>)}
                            </ul>
                          : <span className="ml-2 text-gray-500"> none</span>
                        }
                      </div>
                    </div>

                    <div className="mt-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${b.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : b.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>
                        {b.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  )
}

export default BookingsEXT
