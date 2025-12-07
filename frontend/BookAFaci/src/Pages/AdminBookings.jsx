import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router';
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
    Edit,
    CircleSlash,
  Clipboard, Users
} from "lucide-react"

const base = import.meta.env.VITE_API_URL || "";

function AdminBookings() {
  const navigate = useNavigate();
  const location = useLocation();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = new URLSearchParams(location.search);
  const initialStatus = params.get('status') || 'all';
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [editingBooking, setEditingBooking] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    const raw = localStorage.getItem('user');
    if (!raw) {
      navigate('/login');
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token') || '';
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await axios.get(`${base}/bookafaci/book`, { headers });
        const payload = res?.data || {};
        const list = Array.isArray(payload.bookings)
          ? payload.bookings
          : Array.isArray(payload)
          ? payload
          : (payload.data || payload.bookings || []);
        setBookings(list);
      } catch (err) {
        console.error('Failed to load bookings', err?.response?.data || err);
        toast.error('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  return (
    <div className="flex min-h-screen font-inter">
      <title>Bookings</title>

      {/* SIDEBAR */}
      <Sidebar>
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={false} onClick={() => navigate("/admindash")} />
        <SidebarItem icon={<Building2 size={20} />} text="Facilities" active={false} onClick={() => navigate("/adminfaci")} />
        <SidebarItem icon={<Clipboard size={20} />} text="Bookings" active={true} onClick={() => navigate("/adminbks")} />
        <SidebarItem icon={<Users size={20} />} text="Users" active={false} onClick={() => navigate("/adminusers")} />
      </Sidebar>

      <main className="flex-1 pl-6 pr-6 bg-center bg-cover min-h-screen relative pb-5"
        style={{
          paddingLeft: '5.5rem',
          backgroundImage: `linear-gradient(rgba(194, 217, 249, 0.9), rgba(194, 217, 249, 0.9)), url(${loginbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
        <Topbar searchValue={search} onSearchChange={setSearch} onFilterClick={() => setFiltersOpen(v => !v)} />

        {filtersOpen && (
          <div className="mx-6 mt-3 bg-white rounded-xl shadow p-4 border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Facility/User</label>
                <input
                  type="text"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g., Gym, John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                >
                  <option value="">Any</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex items-end gap-2">
                <button
                  type="button"
                  onClick={() => { setFilterName(''); setFilterStatus(''); }}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl border text-gray-700"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  className="relative overflow-hidden text-white px-4 py-2 rounded-xl shadow group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] transition-all duration-300 ease-in-out group-hover:opacity-0" />
                  <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
                  <span className="relative z-10 font-medium">Apply</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-b from-[#E0E0E0] via-[#DDF2FF] to-[#E0E0E0] rounded-[10px] p-[1px] mt-[20px]">
          <div className="rounded-[10px] p-10 mt-[20px]">
            <div className="flex items-center justify-between w-full mb-8">
              <h1 className="font-inter font-bold text-[2rem] text-[#007BDA]">Booking Management</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* status tabs (same styles as UserBookings.jsx) */}
              <div className="col-span-1 lg:col-span-3 flex gap-3 mb-6 flex-wrap w-full">
                {(() => {
                  const statuses = ['all', 'upcoming', 'pending', 'approved', 'rejected', 'completed', 'cancelled'];
                  const now = new Date();
                  const counts = { all: bookings.length };

                  counts.upcoming = bookings.filter(b => {
                    if (b.status === 0 || b.status === '0') return true;
                    return !!(b.startDate && new Date(b.startDate) >= now);
                  }).length;

                  statuses.slice(2).forEach(s => {
                    counts[s] = bookings.filter(b => {
                      if (b.status === 0 || b.status === '0') return false;
                      return (b.status || '').toLowerCase() === s;
                    }).length;
                  });

                  return statuses.map(status => (
                    <button
                      key={status}
                      onClick={() => {
                        setSelectedStatus(status);
                        navigate(`/adminbks?status=${status}`);
                      }}
                      className={`px-4 py-2 rounded-lg ${selectedStatus === status ? 'bg-gradient-to-r from-[#63bbff] to-[#346D9A] text-[#ffffff]' : 'bg-transparent text-gray-700 hover:bg-white'}`}
                      aria-pressed={selectedStatus === status}
                    >
                      <span className="capitalize">{status}</span>
                      <span className="ml-2 inline-block bg-gray-100 text-xs text-gray-700 px-2 py-0.5 rounded-full">{counts[status] ?? 0}</span>
                    </button>
                  ));
                })()}
              </div>

              {loading ? (
                <div className="col-span-1 lg:col-span-3 text-center text-gray-600">Loading bookings...</div>
              ) : (() => {
                // compute filtered list based on selectedStatus (same logic as UserBookings.jsx)
                const now = new Date();
                let filtered = (selectedStatus === 'all') ? bookings : (selectedStatus === 'upcoming')
                  ? bookings.filter(b => (b.status === 0 || b.status === '0') || (b.startDate && new Date(b.startDate) >= now))
                  : bookings.filter(b => {
                    if (b.status === 0 || b.status === '0') return false;
                    return (b.status || '').toLowerCase() === selectedStatus;
                  });

                // Apply search
                const term = search.trim().toLowerCase();
                if (term) {
                  filtered = filtered.filter(b => {
                    const facilityName = (b.facility?.name || b.facility || '').toString().toLowerCase();
                    const userName = b.user && typeof b.user === 'object' ? (b.user.name || b.user.email || '').toLowerCase() : (b.user || '').toString().toLowerCase();
                    const equipmentList = Array.isArray(b.equipment) ? b.equipment : (Array.isArray(b.resource) ? b.resource : []);
                    const equipmentMatch = equipmentList.some(r => (r?.name || '').toString().toLowerCase().includes(term));
                    const typeMatch = (b.bookingType || '').toString().toLowerCase().includes(term);
                    const statusMatch = (b.status || '').toString().toLowerCase().includes(term);
                    return facilityName.includes(term) || userName.includes(term) || equipmentMatch || typeMatch || statusMatch;
                  });
                }

                // Apply explicit filters
                const nameTerm = filterName.trim().toLowerCase();
                const statusTerm = filterStatus.trim().toLowerCase();
                if (nameTerm || statusTerm) {
                  filtered = filtered.filter(b => {
                    const facilityName = (b.facility?.name || b.facility || '').toString().toLowerCase();
                    const userName = b.user && typeof b.user === 'object' ? (b.user.name || b.user.email || '').toLowerCase() : (b.user || '').toString().toLowerCase();
                    const statusVal = (b.status || '').toString().toLowerCase();
                    const nameOk = nameTerm ? (facilityName.includes(nameTerm) || userName.includes(nameTerm)) : true;
                    const statusOk = statusTerm ? statusVal.includes(statusTerm) : true;
                    return nameOk && statusOk;
                  });
                }

                if (!filtered || filtered.length === 0) {
                  return <div className="col-span-1 lg:col-span-3 text-gray-500">No {selectedStatus} bookings</div>;
                }

                return filtered.map((b, idx) => (
                  <div key={`${b._id || b.id || 'booking'}-${idx}`} className="bg-[#F7FBFF] rounded-[15px] shadow-md p-5 flex flex-col">
                    <div className="flex-1">
                      <p className="font-bold text-lg text-[#1A1A1A]">{b.facility?.name || 'Equipment Only'}</p>
                      <p className="text-gray-500 text-sm mb-2">{b.bookingType}</p>
                      <p className="text-sm text-gray-700 mb-1">Booked by: {b.user && typeof b.user === 'object' ? (b.user.name || b.user._id) : (b.user || 'Unknown')}{b.user && typeof b.user === 'object' && b.user.email ? ` (${b.user.email})` : ''}</p>
                      <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                        <span>From: {b.startDate ? new Date(b.startDate).toLocaleString() : '-'}</span>
                        <span>To: {b.endDate ? new Date(b.endDate).toLocaleString() : '-'}</span>
                      </div>

                      <div className="mt-3 text-sm text-gray-700">
                        {(() => {
                          const list = Array.isArray(b.equipment) ? b.equipment : (Array.isArray(b.resource) ? b.resource : []);
                          if (list.length === 0) return <div className="text-sm text-gray-500">No equipment</div>;
                          return (
                            <ul className="list-disc list-inside">
                              {list.map((r, ri) => (
                                <li key={r && r._id ? r._id : `${typeof r === 'object' ? (r.name || 'equip') : r}-${ri}`}>
                                  {typeof r === 'object' ? (r.name || r._id) : r}
                                </li>
                              ))}
                            </ul>
                          );
                        })()}
                      </div>
                    </div>

                    <div className="mt-4">
                          <div className="flex items-center justify-between">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              b.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              b.status === 'approved' ? 'bg-green-100 text-green-800' :
                              b.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              b.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-700'}`}>
                              {(b.status === 0 || b.status === '0') ? 'upcoming' : (b.status || 'unknown')}
                            </span>

                            <div className="flex items-center gap-2">
                              <button
                                title="Approve"
                                onClick={async () => {
                                  try {
                                    const token = localStorage.getItem('token') || '';
                                    const headers = token ? { Authorization: `Bearer ${token}` } : {};
                                    const payload = {
                                      user: b.user && typeof b.user === 'object' ? (b.user._id || b.user) : b.user,
                                      bookingType: b.bookingType,
                                      facility: b.facility && typeof b.facility === 'object' ? (b.facility._id || b.facility) : b.facility,
                                      equipment: Array.isArray(b.equipment) ? b.equipment.map(e => (e && e._id) ? e._id : e) : (b.equipment || []),
                                      startDate: b.startDate,
                                      endDate: b.endDate,
                                      status: 'approved'
                                    };
                                    const res = await axios.put(`${base}/bookafaci/book/${b._id}`, payload, { headers });
                                    const updated = res.data?.booking || res.data;
                                    setBookings(prev => prev.map(x => (x._id === updated._id ? updated : x)));
                                    toast.success('Booking approved');
                                  } catch (err) {
                                    console.error('Approve failed', err?.response?.data || err);
                                    toast.error('Failed to approve booking');
                                  }
                                }}
                                className="p-2 rounded-md bg-green-50 hover:bg-green-100 text-green-700">
                                <SquareCheck size={18} />
                              </button>

                              <button
                                title="Reject"
                                onClick={async () => {
                                  try {
                                    const token = localStorage.getItem('token') || '';
                                    const headers = token ? { Authorization: `Bearer ${token}` } : {};
                                    const payload = {
                                      user: b.user && typeof b.user === 'object' ? (b.user._id || b.user) : b.user,
                                      bookingType: b.bookingType,
                                      facility: b.facility && typeof b.facility === 'object' ? (b.facility._id || b.facility) : b.facility,
                                      equipment: Array.isArray(b.equipment) ? b.equipment.map(e => (e && e._id) ? e._id : e) : (b.equipment || []),
                                      startDate: b.startDate,
                                      endDate: b.endDate,
                                      status: 'rejected'
                                    };
                                    const res = await axios.put(`${base}/bookafaci/book/${b._id}`, payload, { headers });
                                    const updated = res.data?.booking || res.data;
                                    setBookings(prev => prev.map(x => (x._id === updated._id ? updated : x)));
                                    toast.success('Booking rejected');
                                  } catch (err) {
                                    console.error('Reject failed', err?.response?.data || err);
                                    toast.error('Failed to reject booking');
                                  }
                                }}
                                className="p-2 rounded-md bg-red-50 hover:bg-red-100 text-red-700">
                                <SquareX size={18} />
                              </button>

                              <button
                                title="Cancel"
                                onClick={async () => {
                                  try {
                                    if (!window.confirm('Cancel this booking? This will mark it cancelled.')) return;
                                    const token = localStorage.getItem('token') || '';
                                    const headers = token ? { Authorization: `Bearer ${token}` } : {};
                                    const res = await axios.delete(`${base}/bookafaci/book/${b._id}`, { headers });
                                    const updated = res.data?.booking || res.data;
                                    if (updated && updated._id) {
                                      setBookings(prev => prev.map(x => (x._id === updated._id ? updated : x)));
                                    } else {
                                      // fallback: mark locally as cancelled
                                      setBookings(prev => prev.map(x => x._id === b._id ? { ...x, status: 'cancelled' } : x));
                                    }
                                    toast.success('Booking cancelled');
                                  } catch (err) {
                                    console.error('Cancel failed', err?.response?.data || err);
                                    toast.error('Failed to cancel booking');
                                  }
                                }}
                                className="p-2 rounded-md bg-orange-50 hover:bg-orange-100 text-orange-700">
                                <CircleSlash size={18} />
                              </button>

                              <button
                                title="Edit"
                                onClick={() => setEditingBooking(b)}
                                className="p-2 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-700">
                                <Edit size={18} />
                              </button>
                            </div>
                          </div>
                    </div>
                  </div>
                ))
              })() }
            </div>

            {/* Edit modal */}
            {editingBooking && (
              <div className="backdrop-blur-sm fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                  <h2 className="text-lg font-bold mb-4">Edit Booking</h2>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                      setEditLoading(true);
                      const b = editingBooking;
                      const form = new FormData(e.target);
                      const bookingType = form.get('bookingType');
                      const startDate = form.get('startDate');
                      const endDate = form.get('endDate');
                      const status = form.get('status');
                      const payload = {
                        user: b.user && typeof b.user === 'object' ? (b.user._id || b.user) : b.user,
                        bookingType,
                        facility: b.facility && typeof b.facility === 'object' ? (b.facility._id || b.facility) : b.facility,
                        equipment: Array.isArray(b.equipment) ? b.equipment.map(e => (e && e._id) ? e._id : e) : (b.equipment || []),
                        startDate: startDate || b.startDate,
                        endDate: endDate || b.endDate,
                        status: status || b.status,
                      };
                      const token = localStorage.getItem('token') || '';
                      const headers = token ? { Authorization: `Bearer ${token}` } : {};
                      const res = await axios.put(`${base}/bookafaci/book/${b._id}`, payload, { headers });
                      const updated = res.data?.booking || res.data;
                      setBookings(prev => prev.map(x => (x._id === updated._id ? updated : x)));
                      toast.success('Booking updated');
                      setEditingBooking(null);
                    } catch (err) {
                      console.error('Edit failed', err?.response?.data || err);
                      toast.error('Failed to update booking');
                    } finally {
                      setEditLoading(false);
                    }
                  }}>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex flex-col">
                        <span className="text-sm mb-1">Booking Type</span>
                        <input name="bookingType" defaultValue={editingBooking.bookingType || ''} className="border p-2 rounded" />
                      </label>
                      <label className="flex flex-col">
                        <span className="text-sm mb-1">Status</span>
                        <select name="status" defaultValue={editingBooking.status || 'pending'} className="border p-2 rounded">
                          <option value="pending">pending</option>
                          <option value="approved">approved</option>
                          <option value="rejected">rejected</option>
                          <option value="completed">completed</option>
                          <option value="cancelled">cancelled</option>
                        </select>
                      </label>
                      <label className="flex flex-col">
                        <span className="text-sm mb-1">Start</span>
                        <input name="startDate" type="datetime-local" defaultValue={editingBooking.startDate ? new Date(editingBooking.startDate).toISOString().slice(0,16) : ''} className="border p-2 rounded" />
                      </label>
                      <label className="flex flex-col">
                        <span className="text-sm mb-1">End</span>
                        <input name="endDate" type="datetime-local" defaultValue={editingBooking.endDate ? new Date(editingBooking.endDate).toISOString().slice(0,16) : ''} className="border p-2 rounded" />
                      </label>
                    </div>

                    <div className="mt-4 flex justify-end gap-2">
                      <button type="button" onClick={() => setEditingBooking(null)} className="px-4 py-2 rounded bg-gray-100">Cancel</button>
                      <button type="submit" disabled={editLoading} className="px-4 py-2 rounded bg-gradient-to-r from-[#63bbff] to-[#346D9A] text-white">{editLoading ? 'Saving...' : 'Save'}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminBookings;