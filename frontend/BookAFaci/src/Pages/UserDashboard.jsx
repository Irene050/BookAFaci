import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, Navigate } from 'react-router';
import { toast } from 'react-toastify';
import axios from 'axios';
import Sidebar, { SidebarItem } from '../components/sidebar';
import Topbar from '../components/topbar';
import loginbg from '../assets/Gradient blur.png'
import Calendar from '../components/calendar';

import {
  Building2,
  LayoutDashboard,
  GalleryVerticalEnd,
  ClipboardClock,
  SquareX, SquareCheck,
  Clipboard
} from "lucide-react"

const base = import.meta.env.VITE_API_URL || "";

function useCountAnimation(target, { duration = 500, delay = 0 } = {}) {
  const [value, setValue] = useState(0);
  const prevRef = useRef(0);
  useEffect(() => {
    const from = Number(prevRef.current || 0);
    const to = Number(target || 0);
    if (from === to) {
      setValue(to);
      prevRef.current = to;
      return;
    }

    let raf = null;
    let startTime = null;
    let timeoutId = null;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const start = () => {
      startTime = performance.now();
      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);
        const current = Math.round(from + (to - from) * eased);
        setValue(current);
        if (progress < 1) raf = requestAnimationFrame(step);
        else prevRef.current = to;
      };
      raf = requestAnimationFrame(step);
    };

    if (delay > 0) timeoutId = setTimeout(start, delay);
    else start();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [target, duration, delay]);

  return value;
}

function UserDashboard() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({ totalBookings: 0, upcoming: 0, cancelled: 0, completed: 0 });
  const [latestPending, setLatestPending] = useState(null);
  const [latestPendingLoading, setLatestPendingLoading] = useState(false);
  const [latestApproved, setLatestApproved] = useState(null);
  const [latestApprovedLoading, setLatestApprovedLoading] = useState(false);
  
  const animatedBookings = useCountAnimation(summary.totalBookings, { duration: 800, delay: 100 });
  const animatedUpcoming = useCountAnimation(summary.upcoming, { duration: 800, delay: 100 });
  const animatedCancelled = useCountAnimation(summary.cancelled, { duration: 800, delay: 100 });
  const animatedCompleted = useCountAnimation(summary.completed, { duration: 800, delay: 100 });
  
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }

    (async () => {
      try {
        const userObj = JSON.parse(user);
        const userId = userObj?._id || userObj?.id;
        if (!userId) return;

        const res = await axios.get(`${base}/bookafaci/dashboard/summary/${userId}`);
        const data = res?.data || {};
        setSummary({
          totalBookings: data.totalBookings ?? 0,
          upcoming: data.upcoming ?? 0,
          cancelled: data.cancelled ?? 0,
          completed: data.completed ?? 0,
        });

        // fetch bookings and extract the most recent 'pending' booking
        (async () => {
          try {
            setLatestPendingLoading(true);
            const bRes = await axios.get(`${base}/bookafaci/book/status/${userId}`);
            const list = Array.isArray(bRes.data?.bookings) ? bRes.data.bookings : (bRes.data?.bookings || []);
            // normalize pending status values (could be 0, 'pending', etc.)
            const pending = list.filter(b => {
              if (b.status === 0 || b.status === '0') return true;
              return String(b.status || '').toLowerCase() === 'pending';
            });
            if (pending.length) {
              // choose the most recent by createdAt or startDate
              pending.sort((a, b) => {
                const ta = new Date(a.createdAt || a.startDate || 0).getTime();
                const tb = new Date(b.createdAt || b.startDate || 0).getTime();
                return tb - ta;
              });
              setLatestPending(pending[0]);
            } else {
              setLatestPending(null);
            }
          } catch (err) {
            console.error('Failed to load bookings for latest pending', err?.response?.data || err);
          } finally {
            setLatestPendingLoading(false);
          }
        })();

        // fetch bookings and extract the most recent 'approved' booking
        (async () => {
          try {
            setLatestApprovedLoading(true);
            const bRes = await axios.get(`${base}/bookafaci/book/status/${userId}`);
            const list = Array.isArray(bRes.data?.bookings) ? bRes.data.bookings : (bRes.data?.bookings || []);
            const approved = list.filter(b => String(b.status || '').toLowerCase() === 'approved');
            if (approved.length) {
              // choose the most recent by createdAt or startDate
              approved.sort((a, b) => {
                const ta = new Date(a.createdAt || a.startDate || 0).getTime();
                const tb = new Date(b.createdAt || b.startDate || 0).getTime();
                return tb - ta;
              });
              setLatestApproved(approved[0]);
            } else {
              setLatestApproved(null);
            }
          } catch (err) {
            console.error('Failed to load bookings for latest approved', err?.response?.data || err);
          } finally {
            setLatestApprovedLoading(false);
          }
        })();
      } catch (err) {
        console.error('Failed to load dashboard summary', err?.response?.data || err);
      }
    })();
  }, [navigate]);
  

  return (
    <div className="flex min-h-screen transition-all font-inter">
      <title>Dashboard</title>
      <Sidebar>
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={true} />
        <SidebarItem type="button" icon={<Building2 size={20} />} text="Facilities" active={false} onClick={() => navigate('/UserFacilities')} />
        <SidebarItem icon={<Clipboard size={20} />} text="Bookings" active={false} onClick={() => navigate('/UserBookings')}/>
      </Sidebar>

      <main className="flex-1 pl-6 pr-6 bg-center bg-cover min-h-screen relative pb-5 
          min-[320px]:w-[350px] max-[640px]:w-[450px] md:w-[450px] lg:w-[450px]" 
          style={{
          paddingLeft: '5.5rem', 
          backgroundImage: `linear-gradient(rgba(194, 217, 249, 0.9), rgba(194, 217, 249, 0.9)), url(${loginbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
          <Topbar />

        <div className="grid grid-cols-[1fr_2fr] gap-10 "></div>
        <div className="bg-gradient-to-b from-[#E0E0E0] via-[#DDF2FF] to-[#E0E0E0] h-fit rounded-[10px] p-[1px] mt-[20px]">
          <h1 className='pl-[35px] pt-[35px] mb-5 font-inter font-bold text-[2rem] text-[#007BDA]'>Dashboard</h1>
            <div className='flex flex-wrap items-center gap-[10rem] mb-1 pl-[45px] pr-[45px] pb-[45px] 
              min-[320px]:flex-wrap min-[320px]:gap-[2rem] max-[640px]:flex-wrap md:flex-wrap lg:flex-wrap'>

              {/* Total -> navigate to all in bks */}
              <button
                 onClick={() => navigate('/UserBookings?status=all')}
                 className="flex grow group relative w-[auto] p-[3px] rounded-[25px] overflow-hidden hover:shadow-lg transition-all"
                 aria-label="Total bookings"
               >
                 <span
                   className="flex grow pointer-events-none absolute inset-0 bg-transparent w-[650px] h-[500px] m-[-7.5rem] mb-[10px] transition-transform duration-1000 group-hover:ease-in-out group-hover:rotate-[360deg] group-hover:bg-[conic-gradient(#83C9FF,_#346D9A,_#83C9FF)]"
                   style={{ zIndex: 0 }}
                 />
 
                 {/* inner card */}
                 <div
                   className="relative flex grow items-center font-inter font-bold text-center bg-slate-300  w-[250px] h-[150px] p-[25px] rounded-[22px] text-[#007BDA] indent-1 border-[#a7bace]"
                   style={{ zIndex: 10 }}
                 >
                   <GalleryVerticalEnd size={40} className="text-[#007BDA]" />
                   <span className="ml-2">Total Bookings:</span>
                   <div className="text-4xl indent-4">{animatedBookings}</div>
                 </div>
               </button>

              {/* Upcoming -> navigate to upcoming in bks */}
              <button
                 onClick={() => navigate('/UserBookings?status=upcoming')}
                 className="flex grow group relative w-[auto] p-[3px] rounded-[25px] overflow-hidden hover:shadow-lg transition-all"
                 aria-label="Total bookings"
               >
                 <span
                   className="flex grow pointer-events-none absolute inset-0 bg-transparent w-[650px] h-[500px] m-[-7.5rem] mb-[10px] transition-transform duration-1000 group-hover:ease-in-out group-hover:rotate-[360deg] group-hover:bg-[conic-gradient(#83C9FF,_#346D9A,_#83C9FF)]"
                   style={{ zIndex: 0 }}
                 />
 
                 {/* inner card */}
                 <div
                   className="relative flex grow items-center font-inter font-bold text-center bg-slate-300  w-[250px] h-[150px] p-[25px] rounded-[22px] text-[#007BDA] indent-1 border-[#a7bace]"
                   style={{ zIndex: 10 }}
                 >
                   <GalleryVerticalEnd size={40} className="text-[#007BDA]" />
                   <span className="ml-2">Upcoming Bookings:</span>
                   <div className="text-4xl indent-4">{animatedUpcoming}</div>
                 </div>
               </button>

              {/* Cancelled -> navigate to cancelled in bks */}
              <button
                 onClick={() => navigate('/UserBookings?status=cancelled')}
                 className="flex grow group relative w-[auto] p-[3px] rounded-[25px] overflow-hidden hover:shadow-lg transition-all"
                 aria-label="Total bookings"
               >
                 <span
                   className="flex grow pointer-events-none absolute inset-0 bg-transparent w-[650px] h-[500px] m-[-7.5rem] mb-[10px] transition-transform duration-1000 group-hover:ease-in-out group-hover:rotate-[360deg] group-hover:bg-[conic-gradient(#83C9FF,_#346D9A,_#83C9FF)]"
                   style={{ zIndex: 0 }}
                 />
 
                 {/* inner card */}
                 <div
                   className="relative flex grow items-center font-inter font-bold text-center bg-slate-300  w-[250px] h-[150px] p-[25px] rounded-[22px] text-[#007BDA] indent-1 border-[#a7bace]"
                   style={{ zIndex: 10 }}
                 >
                   <GalleryVerticalEnd size={40} className="text-[#007BDA]" />
                   <span className="ml-2">Cancelled Bookings:</span>
                   <div className="text-4xl indent-4">{animatedCancelled}</div>
                 </div>
               </button>

              {/* Completed -> navigate to completed to completed in bks*/}
              <button
                 onClick={() => navigate('/UserBookings?status=completed')}
                 className="flex grow group relative w-[auto] p-[3px] rounded-[25px] overflow-hidden hover:shadow-lg transition-all"
                 aria-label="Total bookings"
               >
              <span
                className="flex grow pointer-events-none absolute inset-0 bg-transparent w-[650px] h-[500px] m-[-7.5rem] mb-[10px] transition-transform duration-1000 group-hover:ease-in-out group-hover:rotate-[360deg] group-hover:bg-[conic-gradient(#83C9FF,_#346D9A,_#83C9FF)]
                  min-[320px]:
                  min-[375px]:
                  min-[425px]:
                  sm:     
                  md:     
                  lg:     
                  xl:
                   "
                   style={{ zIndex: 0 }}
                 />
 
                 {/* inner card */}
                 <div
                   className="relative flex grow items-center font-inter font-bold text-center bg-slate-300  w-[250px] h-[150px] p-[25px] rounded-[22px] text-[#007BDA] indent-1 border-[#a7bace]           "
                   style={{ zIndex: 10 }}
                 >
                   <GalleryVerticalEnd size={40} className="text-[#007BDA]" />
                   <span className="ml-2">Complete Bookings:</span>
                   <div className="text-4xl indent-4">{animatedCompleted}</div>
                 </div>
               </button>
            </div>

            <div className='grid grid-flow-col gap-[45px] pl-[45px] pr-[45px] pb-[45px]
            min-[320px]:flex
            min-[320px]:flex-col
            min-[375px]:flex
            min-[375px]:flex-col
            min-[425px]:flex
            min-[425px]:flex-col
            sm:flex 
            sm:flex-col
            md:flex
            md:flex-col
            lg:grid
            lg:grid-flow-col
            xl:grid
            xl:grid-flow-col
            '>
              {/* Most recent pending booking card */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => navigate('/UserBookings?status=pending')}
                onKeyDown={(e) => { if (e.key === 'Enter') navigate('/UserBookings?status=pending'); }}
                className='cursor-pointer flex flex-col justify-between ] bg-white col-span-2 h-[fit] rounded-[10px] drop-shadow-lg transition-all hover:transform hover:scale-[1.01] p-6'
              > <b className='text-[#007BDA]'>Pending:</b>
                <hr className='mt-3 mb-3'></hr>
                {latestPendingLoading ? (
                  <div className='text-gray-500'>Loading latest pending booking...</div>
                ) : latestPending ? (
                  <div className='flex flex-col h-full'>
                    <div>
                      <p className='font-bold text-xl text-[#1A1A1A] ml-10'>{latestPending.facility?.name || 'Equipment Only'}</p>
                      <p className='ml-10 text-sm text-gray-600'>{latestPending.bookingType ?? ''}</p>
                    </div>

                    <div className='mt-4 text-sm text-gray-700 flex-1 ml-10'>
                      <div><strong>From:</strong> {latestPending.startDate ? new Date(latestPending.startDate).toLocaleString() : '-'}</div>
                      <div><strong>To:</strong> {latestPending.endDate ? new Date(latestPending.endDate).toLocaleString() : '-'}</div>

                      <div className='mt-3'>
                        <strong>Equipment:</strong>
                        {(() => {
                          const equipmentList = latestPending.equipment || latestPending.resource || [];
                          return Array.isArray(equipmentList) && equipmentList.length ? (
                            <ul className='list-disc list-inside text-sm'>
                              {equipmentList.map(r => <li key={r._id || r}>{ typeof r === 'object' ? (r.name || r._id) : r }</li>)}
                            </ul>
                          ) : <span className='ml-2 text-gray-500'> none</span>;
                        })()}
                      </div>
                    </div>

                    <div className='mt-2 ml-10'>
                      <span className='px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800'>pending</span>
                      <div className='text-xs text-gray-500 mt-2'>Click to view all pending bookings</div>
                    </div>
                  </div>
                ) : (
                  <div className='text-gray-500'>No pending bookings</div>
                )}
              </div>

            <div
              role="button"
              tabIndex={0}
              onClick={() => navigate('/UserBookings?status=approved')}
              onKeyDown={(e) => { if (e.key === 'Enter') navigate('/UserBookings?status=approved'); }}
              className='cursor-pointer flex flex-col justify-between ] bg-white col-span-2 h-[fit] rounded-[10px] drop-shadow-lg transition-all hover:transform hover:scale-[1.01] p-6'
            > <b className='text-[#007BDA]'>Approved:</b>
              <hr className='mt-3 mb-3'></hr>
              {latestApprovedLoading ? (
                <div className='text-gray-500'>Loading latest approved booking...</div>
              ) : latestApproved ? (
                <div className='flex flex-col h-full'>
                  <div>
                    <p className='font-bold text-xl text-[#1A1A1A] ml-10'>{latestApproved.facility?.name || 'Equipment Only'}</p>
                    <p className='ml-10 text-sm text-gray-600'>{latestApproved.bookingType ?? ''}</p>
                  </div>

                  <div className='mt-1 text-sm text-gray-700 flex-1 ml-10'>
                    <div><strong>From:</strong> {latestApproved.startDate ? new Date(latestApproved.startDate).toLocaleString() : '-'}</div>
                    <div><strong>To:</strong> {latestApproved.endDate ? new Date(latestApproved.endDate).toLocaleString() : '-'}</div>

                    <div className='mt-3'>
                      <strong>Equipment:</strong>
                      {(() => {
                        const equipmentList = latestApproved.equipment || latestApproved.resource || [];
                        return Array.isArray(equipmentList) && equipmentList.length ? (
                          <ul className='list-disc list-inside text-sm'>
                            {equipmentList.map(r => <li key={r._id || r}>{typeof r === 'object' ? (r.name || r._id) : r}</li>)}
                          </ul>
                        ) : <span className='ml-2 text-gray-500'> none</span>;
                      })()}
                    </div>
                  </div>

                  <div className='mt-2 ml-10'>
                    <span className='px-3 py-1 rounded-full text-sm bg-green-100 text-green-800'>approved</span>
                    <div className='text-xs text-gray-500 mt-2'>Click to view all approved bookings</div>
                  </div>
                </div>
              ) : (
                <div className='text-gray-500'>No approved bookings</div>
              )}
            </div>
              <div className='font-inter flex items-center justify-center text-center bg-white col-span-2 row-span-2 rounded-[10px] drop-shadow-lg transition-all hover:transform hover:scale-[1.01]
              min-[320px]:h-[35rem] min-[320px]:w-[full]
              min-[375px]:h-[35rem] min-[375px]:w-[full]
              min-[425px]:h-[35rem] min-[425px]:w-[full]
              sm:h-[35rem] sm:w-[full]
              md:h-[35rem] md:w-[full]
              lg:h-[30rem] lg:w-[full]
              xl:h-[30rem] xl:w-[full]
              '><Calendar /></div>
            </div>

        </div>
      </main>
    </div>
  );
}

export default UserDashboard
