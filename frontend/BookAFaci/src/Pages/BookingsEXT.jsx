import React, { useEffect, useState } from 'react';   
import { useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import Sidebar, { SidebarItem } from '../components/sidebar';
import Topbar from '../components/topbar';
import loginbg from '../assets/Gradient blur.png';

import { Building2, LayoutDashboard, Clipboard } from "lucide-react";

const base = import.meta.env.VITE_API_URL || "";

function BookingsEXT() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [resources, setResources] = useState([]);

  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    facility: "",
    startDate: "",
    endDate: "",
    quantities: {}
  });
  const [saving, setSaving] = useState(false);

  // Load bookings + facilities + resources
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
        setBookings(Array.isArray(res.data?.bookings) ? res.data.bookings : []);

        const fRes = await axios.get(`${base}/bookafaci/facility`).catch(() => ({ data: [] }));
        setFacilities(Array.isArray(fRes.data) ? fRes.data : (fRes.data?.facilities || fRes.data?.data || []));

        const rRes = await axios.get(`${base}/bookafaci/resources`).catch(() => ({ data: [] }));
        setResources(Array.isArray(rRes.data) ? rRes.data : (rRes.data?.resources || rRes.data?.data || []));
      } catch (err) {
        console.error('Failed to load bookings/facilities/resources', err?.response?.data || err);
        toast.error('Failed to load data');
      }
    })();
  }, [navigate]);

  const activeBookings = bookings.filter(b => (b.status || '').toLowerCase() !== 'cancelled');

  // Cancel booking
  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await axios.delete(`${base}/bookafaci/book/${bookingId}`);
      toast.success("Booking cancelled");
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await axios.get(`${base}/bookafaci/book/status/${user._id}`);
      setBookings(res.data.bookings);
    } catch {
    }
  };

  // Open edit modal
  const openEditModal = (booking) => {
    const quantities = {};
    booking.resource?.forEach(r => {
      quantities[r._id] = (quantities[r._id] || 0) + 1;
    });

    setEditing(booking);
    setFormData({
      facility: booking.facility?._id || "",
      startDate: booking.startDate.slice(0, 16),
      endDate: booking.endDate.slice(0, 16),
      quantities
    });
  };

  const closeEditModal = () => {
    setEditing(null);
    setFormData({ facility: "", startDate: "", endDate: "", quantities: {} });
    setSaving(false);
  };

  // Save edited booking
  const saveEdit = async () => {
    if (!editing) return;

    if (!formData.facility) return toast.error("Please select a facility");
    if (!formData.startDate) return toast.error("Please select start date");
    if (!formData.endDate) return toast.error("Please select end date");

    // Check if resource quantities exceed availability
    for (const [resId, qty] of Object.entries(formData.quantities)) {
      const resource = resources.find(r => r._id === resId);
      if (!resource) continue;
      if (qty > resource.available) {
        return toast.error(`Cannot book more than available ${resource.name} (${resource.available})`);
      }
    }

    setSaving(true);

    try {
      const resourceIds = [];
      for (const [resId, qty] of Object.entries(formData.quantities || {})) {
        for (let i = 0; i < qty; i++) resourceIds.push(resId);
      }

      const res = await axios.put(`${base}/bookafaci/book/${editing._id}`, {
        user: editing.user._id,
        bookingType: editing.bookingType,
        facility: formData.facility,
        resource: resourceIds,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: editing.status
      });

      if (res.data.booking) {
        toast.success(res.data.message || "Booking updated successfully");
        closeEditModal();
        const user = JSON.parse(localStorage.getItem('user'));
        const updatedRes = await axios.get(`${base}/bookafaci/book/status/${user._id}`);
        setBookings(updatedRes.data.bookings);
      } else {
        toast.error("Failed to update booking");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update booking");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className='flex min-h-screen transition-all'>
      <title>Bookings</title>

      <Sidebar>
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={false} onClick={() => navigate('/dashboard-ext')} />
        <SidebarItem icon={<Building2 size={20} />} text="Facilities" active={false} onClick={() => navigate('/facilities-ext')} />
        <SidebarItem icon={<Clipboard size={20} />} text="Bookings" active={true} onClick={() => navigate('/bookings-ext')} />
      </Sidebar>

      <main
        className='flex-1 pl-6 pr-6 bg-center bg-cover min-h-screen relative pb-5'
        style={{
          paddingLeft: '5.5rem',
          backgroundImage: `linear-gradient(rgba(194, 217, 249, 0.85), rgba(194, 217, 249, 0.85)), url(${loginbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
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
                      <p className="font-bold text-lg text-[#1A1A1A]">{b.facility?.name ?? "Facility"}</p>
                      <p className="text-gray-500 text-sm mb-2">{b.bookingType}</p>

                      <div className="mt-2 text-sm text-gray-600">
                        From: {b.startDate ? new Date(b.startDate).toLocaleString() : "-"}
                      </div>
                      <div className="text-sm text-gray-600">
                        To: {b.endDate ? new Date(b.endDate).toLocaleString() : "-"}
                      </div>

                      <div className="mt-3 text-sm text-gray-700">
                        Resources:
                        {Array.isArray(b.resource) && b.resource.length ? (
                          <ul className="list-disc list-inside">
                            {Object.entries(
                              b.resource.reduce((acc, r) => {
                                acc[r.name] = (acc[r.name] || 0) + 1;
                                return acc;
                              }, {})
                            ).map(([name, count]) => (
                              <li key={name}>{name}: {count}</li>
                            ))}
                          </ul>
                        ) : (
                          <span className="ml-2 text-gray-500">none</span>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          b.status === 'pending' ? 'bg-yellow-100 text-yellow-800'
                          : b.status === 'approved' ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-700'
                        }`}>
                        {b.status}
                      </span>

                      <div className="flex gap-2">
                        {/* Edit button gradient like Facilities */}
                        <button
                          onClick={() => openEditModal(b)}
                          className="mt-1 relative overflow-hidden text-white px-3 py-1 rounded-full shadow group"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] transition-opacity duration-300 ease-in-out group-hover:opacity-0" />
                          <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
                          <span className="relative z-10 font-medium text-sm">Edit</span>
                        </button>

                        {/* Cancel button gradient like Edit */}
                        <button
                          onClick={() => handleCancel(b._id)}
                          className="mt-1 relative overflow-hidden text-white px-3 py-1 rounded-full shadow group"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-[#FF5E5E] to-[#FF8C8C] transition-opacity duration-300 ease-in-out group-hover:opacity-0" />
                          <span className="absolute inset-0 bg-gradient-to-r from-[#FF8C8C] to-[#FF5E5E] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
                          <span className="relative z-10 font-medium text-sm">Cancel</span>
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* EDIT MODAL */}
        {editing && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h2 className="text-xl font-bold mb-4">Edit Booking</h2>

              <label className="text-sm">Facility</label>
              <select
                className="w-full p-2 border rounded mb-3"
                value={formData.facility}
                onChange={(e) => setFormData({ ...formData, facility: e.target.value })}
              >
                <option value="">Select facility</option>
                {facilities.map(f => (
                  <option key={f._id} value={f._id}>{f.name}</option>
                ))}
              </select>

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
                <p className="text-sm font-semibold">Resources</p>
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
                <button onClick={closeEditModal} className="px-4 py-1 bg-gray-300 rounded">Close</button>
                <button
                  onClick={saveEdit}
                  className="px-4 py-1 bg-blue-600 text-white rounded"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default BookingsEXT;
