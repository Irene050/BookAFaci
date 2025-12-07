import React, { useEffect, useState, useMemo } from 'react';   
import { useNavigate, useLocation } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import Sidebar, { SidebarItem } from '../components/sidebar';
import Topbar from '../components/topbar';
import loginbg from '../assets/Gradient blur.png';
import { Building2, LayoutDashboard, Clipboard } from "lucide-react";

const base = import.meta.env.VITE_API_URL || "";

function UserBookings() {
  const navigate = useNavigate();
  const location = useLocation();
  const [bookings, setBookings] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [resources, setResources] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [formData, setFormData] = useState({
    facility: "",
    startDate: "",
    endDate: "",
    quantities: {}
  });
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

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

        const res = await axios.get(`${base}/bookafaci/book/status/${userId}`);
        setBookings(Array.isArray(res.data?.bookings) ? res.data.bookings : []);

        const fRes = await axios.get(`${base}/bookafaci/facility`).catch(() => ({ data: [] }));
        setFacilities(Array.isArray(fRes.data) ? fRes.data : []);

        const rRes = await axios.get(`${base}/bookafaci/equipment`).catch(() => ({ data: [] }));
        setResources(Array.isArray(rRes.data) ? rRes.data : []);
      } catch (err) {
        toast.error('Failed to load data');
      }
    })();
  }, [navigate]);

  const activeBookings = bookings.filter(b => (b.status || '').toLowerCase() !== 'cancelled');

  // Status tabs state
  const statuses = [
    'all',
    'upcoming',
    'pending',
    'approved',
    'rejected',
    'completed',
    'cancelled'
  ];

  const [selectedStatus, setSelectedStatus] = useState(() => {
    const params = new URLSearchParams(location.search);
    const s = (params.get('status') || 'all').toLowerCase();
    return statuses.includes(s) ? s : 'all';
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const s = (params.get('status') || 'all').toLowerCase();
    if (statuses.includes(s) && s !== selectedStatus) setSelectedStatus(s);
  }, [location.search]);

  const counts = useMemo(() => {
    const all = bookings.length;
    const upcoming = bookings.filter(b => {
      const isCancelled = ['cancelled','canceled'].includes(String(b.status || '').toLowerCase());
      return !isCancelled && new Date(b.startDate) > new Date();
    }).length;
    const byStatus = (name) => bookings.filter(b => String(b.status || '').toLowerCase() === name).length;
    return {
      all,
      upcoming,
      pending: bookings.filter(b => (b.status === 0 || b.status === '0') || String(b.status || '').toLowerCase() === 'pending').length,
      approved: byStatus('approved'),
      rejected: byStatus('rejected'),
      completed: byStatus('completed'),
      cancelled: bookings.filter(b => ['cancelled','canceled'].includes(String(b.status || '').toLowerCase())).length,
    };
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    let byStatus;
    switch (selectedStatus) {
      case 'all':
        byStatus = bookings;
        break;
      case 'upcoming':
        byStatus = bookings.filter(b => {
          const isCancelled = ['cancelled','canceled'].includes(String(b.status || '').toLowerCase());
          return !isCancelled && new Date(b.startDate) > new Date();
        });
        break;
      case 'pending':
        byStatus = bookings.filter(b => (b.status === 0 || b.status === '0') || String(b.status || '').toLowerCase() === 'pending');
        break;
      case 'approved':
      case 'rejected':
      case 'completed':
        byStatus = bookings.filter(b => String(b.status || '').toLowerCase() === selectedStatus);
        break;
      case 'cancelled':
        byStatus = bookings.filter(b => ['cancelled','canceled'].includes(String(b.status || '').toLowerCase()));
        break;
      default:
        byStatus = bookings;
    }

    const term = search.trim().toLowerCase();
    let bySearch = byStatus;
    if (term) {
      bySearch = byStatus.filter(b => {
      const facilityName = (b.facility?.name || b.facility || '').toString().toLowerCase();
      const equipmentList = b.resource || b.equipment || [];
      const equipmentMatch = equipmentList.some(r => (r?.name || '').toString().toLowerCase().includes(term));
      const typeMatch = (b.bookingType || '').toString().toLowerCase().includes(term);
      const statusMatch = (b.status || '').toString().toLowerCase().includes(term);
      return (
        facilityName.includes(term) ||
        equipmentMatch ||
        typeMatch ||
        statusMatch
      );
      });
    }

    // Apply explicit filters: name and status
    const nameTerm = filterName.trim().toLowerCase();
    const statusTerm = filterStatus.trim().toLowerCase();
    return bySearch.filter(b => {
      const facilityName = (b.facility?.name || b.facility || '').toString().toLowerCase();
      const statusVal = (b.status || '').toString().toLowerCase();
      const nameOk = nameTerm ? facilityName.includes(nameTerm) : true;
      const statusOk = statusTerm ? statusVal.includes(statusTerm) : true;
      return nameOk && statusOk;
    });
  }, [bookings, selectedStatus, search, filterName, filterStatus]);

  const onSelectStatus = (s) => {
    setSelectedStatus(s);
    const path = '/UserBookings';
    navigate(`${path}?status=${s}`);
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await axios.delete(`${base}/bookafaci/book/${bookingId}`);
      toast.success("Booking cancelled");
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user?._id || user?.id;
      if (!userId) {
        toast.warn('Session expired. Please log in again.');
        navigate('/');
        return;
      }
      const res = await axios.get(`${base}/bookafaci/book/status/${userId}`);
      setBookings(res.data.bookings);
    } catch {}
  };

  const openEditModal = (booking) => {
    const quantities = {};
    (booking.resource || booking.equipment || [])?.forEach(r => {
      quantities[r._id] = (quantities[r._id] || 0) + 1;
    });

    setEditing(booking);
    const initialFormData = {
      facility: booking.facility?._id || "",
      startDate: booking?.startDate ? String(booking.startDate).slice(0, 16) : "",
      endDate: booking?.endDate ? String(booking.endDate).slice(0, 16) : "",
      quantities
    };
    setFormData(initialFormData);
  };

  const closeEditModal = () => {
    setEditing(null);
    setFormData({ facility: "", startDate: "", endDate: "", quantities: {} });
    setSaving(false);
  };

  const hasChanges = () => {
    if (!editing) return false;
    
    const originalStartDate = editing?.startDate ? String(editing.startDate).slice(0, 16) : "";
    const originalEndDate = editing?.endDate ? String(editing.endDate).slice(0, 16) : "";
    const originalQuantities = {};
    (editing.resource || editing.equipment || [])?.forEach(r => {
      originalQuantities[r._id] = (originalQuantities[r._id] || 0) + 1;
    });

    if (formData.startDate !== originalStartDate) return true;
    if (formData.endDate !== originalEndDate) return true;
    
    const formQtyKeys = Object.keys(formData.quantities || {});
    const origQtyKeys = Object.keys(originalQuantities);
    if (formQtyKeys.length !== origQtyKeys.length) return true;
    
    for (const key of formQtyKeys) {
      if ((formData.quantities[key] || 0) !== (originalQuantities[key] || 0)) return true;
    }
    
    return false;
  };

  const saveEdit = async () => {
    if (!editing) return;

    if (!formData.facility) return toast.error("Please select a facility",{
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      autoClose: 1000,
      limit: 1
    });
    if (!formData.startDate) return toast.error("Please select start date",{
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      autoClose: 1000,
    });
    if (!formData.endDate) return toast.error("Please select end date",{
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      autoClose: 1000,
    });

    for (const [resId, qty] of Object.entries(formData.quantities)) {
      const resource = resources.find(r => r._id === resId);
      if (resource && qty > resource.available) {
        return toast.error(`Cannot exceed available ${resource.name}`, {
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          autoClose: 1000,
        });
      }
    }

    setSaving(true);

    try {
      const resourceIds = [];
      for (const [resId, qty] of Object.entries(formData.quantities)) {
        for (let i = 0; i < qty; i++) resourceIds.push(resId);
      }

      await axios.put(`${base}/bookafaci/book/${editing._id}`, {
        user: editing.user._id,
        bookingType: editing.bookingType,
        facility: formData.facility,
        resource: resourceIds,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: editing.status
      });

      toast.success("Booking updated successfully", {
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000,
      });
      closeEditModal();

      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user?._id || user?.id;
      if (!userId) {
        toast.warn('Session expired. Please log in again.', {
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          autoClose: 3000,
        });
        navigate('/');
        return;
      }
      const updated = await axios.get(`${base}/bookafaci/book/status/${userId}`);
      setBookings(updated.data.bookings);
    } catch (err) {
      toast.error("Failed to update booking", {
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 1000,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className='flex min-h-screen transition-all font-inter'>
      <title>Bookings</title>

      <Sidebar>
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={false} onClick={() => navigate('/UserDashboard')} />
        <SidebarItem icon={<Building2 size={20} />} text="Facilities" active={false} onClick={() => navigate('/UserFacilities')} />
        <SidebarItem icon={<Clipboard size={20} />} text="Bookings" active={true}/>
      </Sidebar>

      <main
        className='flex-1 pl-6 pr-6 bg-center bg-cover min-h-screen relative pb-5 overflow-hidden'
        style={{
          paddingLeft: '5.5rem',
          backgroundImage: `linear-gradient(rgba(194, 217, 249, 0.85), rgba(194, 217, 249, 0.85)), url(${loginbg})`,
        }}
      >
        <Topbar searchValue={search} onSearchChange={setSearch} onFilterClick={() => setFiltersOpen(v => !v)} />

        {filtersOpen && (
          <div className="mx-6 mt-3 bg-white rounded-xl shadow p-4 border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Facility Name</label>
                <input
                  type="text"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g., Gym, Hall"
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

        <div className='bg-gradient-to-b from-[#E0E0E0] via-[#DDF2FF] to-[#E0E0E0] h-fit rounded-[10px] p-[1px] mt-[20px]'>
          <h1 className='pl-[35px] pt-[35px] mb-5 font-inter font-bold text-[2rem] text-[#007BDA]'>Bookings</h1>

          <div className="px-[45px] pb-[45px]">
            {/* Status Tabs */}
            <div className="mb-6 flex flex-wrap gap-2">
              {statuses.map((s) => {
                const active = selectedStatus === s;
                return (
                  <button
                    key={s}
                    onClick={() => onSelectStatus(s)}
                    className={`relative overflow-hidden text-white px-3 py-1 rounded-full shadow group text-sm ${active ? 'opacity-100' : 'opacity-90'}`}
                    aria-label={`Show ${s} bookings`}
                  >
                    <span className={`absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] transition-all duration-300 ease-in-out group-hover:opacity-0 ${active ? 'bg-gradient-to-r from-[#346D9A] to-[#83C9FF]' : 'bg-gradient-to-r from-[#1a374d67] to-[#5b8db367]'}`} />
                    <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
                    <span className="relative z-10 font-medium capitalize">
                      {s} ({counts[s] ?? 0})
                    </span>
                  </button>
                );
              })}
            </div>
            {filteredBookings.length === 0 ? (
              <div className="text-gray-500">No active bookings</div>
            ) : (
              <>
                {/* ───────── SCROLL ───────── */}
                {!showAll && (
                  <div className="relative">
                    <div className="flex gap-5 overflow-x-auto overflow-y-hidden pb-4">
                      {filteredBookings.map((b) => (
                        <div
                          key={b._id}
                          className="bg-[#F7FBFF] rounded-[15px] shadow-md p-5 flex-shrink-0"
                          style={{ minWidth: "25%" }} 
                        >
                          <p className="font-bold text-lg">{b.facility?.name || 'Equipment Only'}</p>
                          <p className="text-gray-500 text-sm">{b.bookingType}</p>
                          <p className="mt-2 text-sm text-gray-600">
                            From: {new Date(b.startDate).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600">
                            To: {new Date(b.endDate).toLocaleString()}
                          </p>

                          <div className="mt-3 text-sm">
                            <span className="font-semibold">Equipment:</span>
                            {(() => {
                              const equipmentList = b.resource || b.equipment || [];
                              return equipmentList.length ? (
                                <ul className="list-disc list-inside">
                                  {Object.entries(
                                    equipmentList.reduce((acc, r) => {
                                      acc[r.name] = (acc[r.name] || 0) + 1;
                                      return acc;
                                    }, {}))
                                    .map(([name, count]) => (
                                      <li key={name}>{name}: {count}</li>
                                    ))
                                  }
                                </ul>
                              ) : <span className="ml-2 text-gray-500">none</span>;
                            })()}
                          </div>

                          <div className="mt-4 flex justify-between items-center">
                            <span
                              className={`px-3 py-1 rounded-full text-sm ${
                                b.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                                b.status === "approved" ? "bg-green-100 text-green-700" :
                                "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {b.status}
                            </span>

                            <div className="flex gap-2">
                              <button
                                onClick={() => openEditModal(b)}
                                className="relative overflow-hidden text-white px-3 py-1 rounded-full shadow group text-sm"
                              >
                                <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] transition-all duration-300 ease-in-out group-hover:opacity-0" />
                                <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
                                <span className="relative z-10 font-medium">Edit</span>
                              </button>

                              <button
                                onClick={() => handleCancel(b._id)}
                                className="relative overflow-hidden text-white px-3 py-1 rounded-full shadow group text-sm"
                              >
                                <span className="absolute inset-0 bg-gradient-to-r from-[#9a3434] to-[#ff8383] transition-all duration-300 ease-in-out group-hover:opacity-0" />
                                <span className="absolute inset-0 bg-gradient-to-r from-[#ff8383] to-[#9a3434] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
                                <span className="relative z-10 font-medium">Cancel</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* SEE MORE BUTTON */}
                    {bookings.length > 3 && (
                      <div className="mt-3 text-right">
                        <button
                          onClick={() => setShowAll(true)}
                          className="relative overflow-hidden text-white px-3 py-1 rounded-full shadow group"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] transition-all duration-300 ease-in-out group-hover:opacity-0" />
                          <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
                          <span className="relative z-10 font-medium">See More</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}


                {/* ───────── FULL GRID ───────── */}
                {showAll && (
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filteredBookings.map((b) => (
                      <div
                        key={b._id}
                        className="bg-[#F7FBFF] rounded-[15px] shadow-md p-5"
                      >
                        <p className="font-bold text-lg">{b.facility?.name || 'Equipment Only'}</p>
                        <p className="text-gray-500 text-sm">{b.bookingType}</p>
                        <p className="mt-2 text-sm text-gray-600">
                          From: {new Date(b.startDate).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          To: {new Date(b.endDate).toLocaleString()}
                        </p>

                        <div className="mt-3 text-sm">
                          <span className="font-semibold">Equipment:</span>
                          {(() => {
                            const equipmentList = b.resource || b.equipment || [];
                            return equipmentList.length ? (
                              <ul className="list-disc list-inside">
                                {Object.entries(
                                  equipmentList.reduce((acc, r) => {
                                    acc[r.name] = (acc[r.name] || 0) + 1;
                                    return acc;
                                  }, {})).
                                  map(([name, count]) => (
                                    <li key={name}>{name}: {count}</li>
                                  ))
                                }
                              </ul>
                            ) : <span className="ml-2 text-gray-500">none</span>;
                          })()}
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              b.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                              b.status === "approved" ? "bg-green-100 text-green-700" :
                              "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {b.status}
                          </span>

                          <div className="flex gap-2">
                            <button
                              onClick={() => openEditModal(b)}
                              className="relative overflow-hidden text-white px-3 py-1 rounded-full shadow group text-sm"
                            >
                              <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] transition-all duration-300 ease-in-out group-hover:opacity-0" />
                              <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
                              <span className="relative z-10 font-medium">Edit</span>
                            </button>

                            <button
                                onClick={() => handleCancel(b._id)}
                                className="relative overflow-hidden text-white px-3 py-1 rounded-full shadow group text-sm"
                              >
                                <span className="absolute inset-0 bg-gradient-to-r from-[#9a3434] to-[#ff8383] transition-all duration-300 ease-in-out group-hover:opacity-0" />
                                <span className="absolute inset-0 bg-gradient-to-r from-[#ff8383] to-[#9a3434] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
                                <span className="relative z-10 font-medium">Cancel</span>
                              </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* SEE LESS BUTTON */}
                    {filteredBookings.length > 3 && (
                      <div className="col-span-full text-right mt-3">
                        <button
                          onClick={() => setShowAll(false)}
                          className="relative overflow-hidden text-white px-3 py-1 rounded-full shadow group text-sm"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] transition-all duration-300 ease-in-out group-hover:opacity-0" />
                          <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
                          <span className="relative z-10 font-medium">See Less</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* EDIT MODAL */}
         {editing && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[70] backdrop-blur-sm backdrop-saturate-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h2 className="text-xl font-bold mb-4">Edit Booking</h2>
              <label className="text-sm">Start Date</label>
              <input
                type="datetime-local"
                className="w-full p-2 border rounded mb-3"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />

              <label className="text-sm">End Date</label>
              <input
                type="datetime-local"
                className="w-full p-2 border rounded mb-3"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />

              <div className="mb-3">
                {resources.map(r => {
                  const qty = formData.quantities?.[r._id] || 0;
                  return (
                    <div key={r._id} className="flex justify-between items-center mt-1">
                      <span>{r.name} (Available: {r.available})</span>
                      <input
                        type="number"
                        min="0"
                        max={r.available}
                        value={qty}
                        onChange={(e) => setFormData({
                          ...formData,
                          quantities: { ...formData.quantities, [r._id]: Number(e.target.value) }
                        })}
                        className="w-16 p-1 border rounded text-center"
                      />
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end gap-2 mt-3">
                <button onClick={closeEditModal} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 ">Close</button>
                <button
                  onClick={saveEdit}
                  disabled={saving || !hasChanges()}
                  className={`relative overflow-hidden text-white px-3 py-1 rounded-full shadow group text-sm w-20 ${
                    (saving || !hasChanges()) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] transition-all duration-300 ease-in-out group-hover:opacity-0" />
                  <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
                  <span className="relative z-10 font-medium">{saving ? "Saving..." : "Save"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default UserBookings;
