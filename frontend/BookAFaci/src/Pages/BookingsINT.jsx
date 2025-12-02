import React, { useEffect, useState, useMemo } from 'react'
import {  useNavigate, useLocation } from 'react-router'
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

function BookingsINT() {
    const navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const initialStatus = params.get('status') || 'pending';
    const [bookings, setBookings] = useState([]);
    const [equipment, setEquipment] = React.useState([])
    const [selectedStatus, setSelectedStatus] = useState(initialStatus);


  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const s = p.get('status');
    if (s) setSelectedStatus(s);
  }, [location.search]);

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

  

  const statuses = ['all', 'upcoming', 'pending', 'approved', 'rejected', 'completed', 'cancelled'];

  const counts = useMemo(() => {
    const now = new Date();
    const c = { all: bookings.length };

    // upcoming: startDate in future OR explicit status 0
    c.upcoming = bookings.filter(b => {
      if (b.status === 0 || b.status === '0') return true;
      return !!(b.startDate && new Date(b.startDate) >= now);
    }).length;

    // other statuses: exclude status 0 entries
    statuses.slice(2).forEach(s => {
      c[s] = bookings.filter(b => {
        if (b.status === 0 || b.status === '0') return false;
        return (b.status || '').toLowerCase() === s;
      }).length;
    });

    return c;
  }, [bookings]);

   const filtered = useMemo(() => {
     const now = new Date();
     if (selectedStatus === 'all') return bookings;
     if (selectedStatus === 'upcoming') {
       return bookings.filter(b => (b.status === 0 || b.status === '0') || (b.startDate && new Date(b.startDate) >= now));
     }
     return bookings.filter(b => {
       if (b.status === 0 || b.status === '0') return false;
       return (b.status || '').toLowerCase() === selectedStatus;
     });
   }, [bookings, selectedStatus]);

  const renderBookingCard = (b) => (
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
        {(() => {
           const isZero = b.status === 0 || b.status === '0';
           const label = isZero ? 'upcoming' : (b.status || 'unknown');
           const cls = label === 'pending' ? 'bg-yellow-100 text-yellow-800'
             : label === 'approved' ? 'bg-green-100 text-green-800'
             : label === 'rejected' ? 'bg-red-100 text-red-800'
             : label === 'completed' ? 'bg-blue-100 text-blue-800'
             : label === 'upcoming' ? 'bg-indigo-100 text-indigo-800'
             : 'bg-gray-100 text-gray-700';
           return <span className={`px-3 py-1 rounded-full text-sm ${cls}`}>{label}</span>;
         })()}
      </div>
    </div>
  );

  return (
    <div className='flex min-h-screen transition-all'>
      <title>Bookings</title>

      <Sidebar>
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={false} onClick={() => navigate('/dashboard-int')} />
        <SidebarItem icon={<Building2 size={20} />} text="Facilities" active={false} onClick={() => navigate('/facilities-int')} />
        <SidebarItem icon={<Clipboard size={20} />} text="Bookings" active={true} onClick={() => navigate('/bookings-int')}/>
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

              {/* tabs */}
              <div className="flex gap-3 mb-6 flex-wrap">
                {statuses.map(status => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-4 py-2 rounded-lg ${selectedStatus === status ? 'bg-gradient-to-r from-[#63bbff] to-[#346D9A] text-[#ffffff]' : 'bg-transparent text-gray-700 hover:bg-white'}`}
                    aria-pressed={selectedStatus === status}
                  >
                    <span className="capitalize">{status}</span>
                    <span className="ml-2 inline-block bg-gray-100 text-xs text-gray-700 px-2 py-0.5 rounded-full">{counts[status] ?? 0}</span>
                  </button>
                ))}
              </div>

              {/* bookings grid for selected tab */}
              {filtered.length === 0 ? (
                <div className="text-gray-500 mb-4">No {selectedStatus} bookings</div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  {filtered.map(renderBookingCard)}
                </div>
              )}

            </div>
          </div>

      </main>
    </div>
  )
}

export default BookingsINT