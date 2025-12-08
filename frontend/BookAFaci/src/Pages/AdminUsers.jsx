import React from 'react';
import { useEffect, useState } from 'react';
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
  Clipboard, Users,
  Edit
} from "lucide-react"

const base = import.meta.env.VITE_API_URL || "";


function AdminUserview() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [filterRole, setFilterRole] = useState('');
    const [editingUser, setEditingUser] = useState(null);
    const [editLoading, setEditLoading] = useState(false);

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
          const res = await axios.get(`${base}/bookafaci/users`, { headers });
          const payload = res?.data || {};
          const list = Array.isArray(payload.users)
            ? payload.users
            : Array.isArray(payload)
            ? payload
            : (payload.users || []);
          setUsers(list);
        } catch (err) {
          console.error('Failed to load users', err?.response?.data || err);
          toast.error('Failed to load users');
        } finally {
          setLoading(false);
        }
      })();
    }, [navigate]);

  return (
    <div className="flex min-h-screen transition-all font-inter">
          <title>Users</title>
    
          {/* SIDEBAR */}
          <Sidebar>
            <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={false} onClick={() => navigate("/admindash")} />
            <SidebarItem icon={<Building2 size={20} />} text="Facilities" active={false} onClick={() => navigate("/adminfaci")} />
            <SidebarItem icon={<Clipboard size={20} />} text="Bookings" active={false} onClick={() => navigate("/adminbks")} />
            <SidebarItem icon={<Users size={20} />} text="Users" active={true} onClick={() => navigate("/adminusers")} />
          </Sidebar>
    
          <main className="flex-1 pl-6 pr-6 bg-center bg-cover min-h-screen relative pb-5
            min-[320px]:w-[350px] max-[640px]:w-[450px] md:w-[450px] lg:w-[450px]
            min-[320px]:px-2 min-[375px]:px-3 min-[425px]:px-4 sm:px-4 md:px-6" 
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Role</label>
                      <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                      >
                        <option value="">Any</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                    </div>
                    <div className="flex items-end gap-2">
                      <button
                        type="button"
                        onClick={() => { setFilterRole(''); }}
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
              <div className="rounded-[10px] p-10 mt-[20px]
                min-[320px]:p-4 min-[375px]:p-5 min-[425px]:p-6 sm:p-6 md:p-8 lg:p-10">
                <div className="flex items-center justify-between w-full mb-8
                  min-[320px]:mb-4 min-[375px]:mb-5 sm:mb-6 md:mb-8">
                  <h1 className="font-inter font-bold text-[2rem] text-[#007BDA]
                    min-[320px]:text-[1.5rem] min-[375px]:text-[1.75rem] sm:text-[1.75rem] md:text-[2rem]">Users Management</h1>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6
                  min-[320px]:gap-3 min-[375px]:gap-4 min-[425px]:gap-4 sm:gap-5 md:gap-6">
                  {loading ? (
                    <div className="col-span-1 lg:col-span-3 text-center text-gray-600">Loading users...</div>
                  ) : (() => {
                    const term = search.trim().toLowerCase();
                    const roleTerm = filterRole.trim().toLowerCase();
                    const filtered = users.filter(u => {
                      const nameMatch = term ? (
                        (u.name || '').toLowerCase().includes(term) ||
                        (u.fullName || '').toLowerCase().includes(term) ||
                        (u.firstName || '').toLowerCase().includes(term) ||
                        (u.lastName || '').toLowerCase().includes(term) ||
                        (u.email || '').toLowerCase().includes(term)
                      ) : true;
                      const roleMatch = roleTerm ? (u.role || '').toLowerCase() === roleTerm : true;
                      return nameMatch && roleMatch;
                    });
                    if (filtered.length === 0) {
                      return <div className="col-span-1 lg:col-span-3 text-gray-500">No users found</div>;
                    }
                    return filtered.map(u => (
                      <div key={u._id || u.id} className="bg-[#F7FBFF] rounded-[15px] shadow-md p-5 flex flex-col">
                        <div className="flex-1">
                          <p className="font-bold text-lg text-[#1A1A1A]">{(u.name ?? u.fullName ?? (`${(u.firstName || '')} ${(u.lastName || '')}`).trim()) || u.email}</p>
                          <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                            <span>Email: {u.email ?? '—'}</span>
                            <span>Role: {u.role ?? '—'}</span>
                          </div>

                          <div className="mt-3 text-sm text-gray-700">
                            <div>Account Type: {u.accountType ?? '—'}</div>
                            <div>Created: {u.createdAt ? new Date(u.createdAt).toLocaleString() : '—'}</div>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <span className={`px-3 py-1 rounded-full text-sm ${u.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>{u.role ?? 'user'}</span>
                          
                          <button
                            title="Edit User"
                            onClick={() => setEditingUser(u)}
                            className="p-2 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-700"
                          >
                            <Edit size={18} />
                          </button>
                        </div>
                      </div>
                    ));
                  })()}
                </div>

                {/* Edit User Modal */}
                {editingUser && (
                  <div className="backdrop-blur-sm fixed inset-0 z-50 flex items-center justify-center bg-black/40
                    min-[320px]:px-4 min-[375px]:px-5 sm:px-6">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl
                      min-[320px]:p-4 min-[375px]:p-5 sm:p-6
                      min-[320px]:max-w-[95%] min-[375px]:max-w-[90%] sm:max-w-xl md:max-w-2xl">
                      <h2 className="text-lg font-bold mb-4">Edit User</h2>
                      <form onSubmit={async (e) => {
                        e.preventDefault();
                        try {
                          setEditLoading(true);
                          const form = new FormData(e.target);
                          const name = form.get('name');
                          const email = form.get('email');
                          const role = form.get('role');
                          const accountType = form.get('accountType');
                          
                          const payload = {
                            name: name || editingUser.name,
                            email: email || editingUser.email,
                            role: role || editingUser.role,
                            accountType: accountType || editingUser.accountType,
                          };
                          
                          const token = localStorage.getItem('token') || '';
                          const headers = token ? { Authorization: `Bearer ${token}` } : {};
                          const res = await axios.patch(`${base}/bookafaci/users/${editingUser._id}`, payload, { headers });
                          const updated = res.data?.user || res.data;
                          setUsers(prev => prev.map(x => (x._id === updated._id ? updated : x)));
                          toast.success('User updated successfully');
                          setEditingUser(null);
                        } catch (err) {
                          console.error('Edit failed', err?.response?.data || err);
                          toast.error(err?.response?.data?.message || 'Failed to update user');
                        } finally {
                          setEditLoading(false);
                        }
                      }}>
                        <div className="grid grid-cols-2 gap-4
                          min-[320px]:grid-cols-1 min-[375px]:grid-cols-1 sm:grid-cols-1 md:grid-cols-2
                          min-[320px]:gap-3 min-[375px]:gap-3 sm:gap-3 md:gap-4">
                          <label className="flex flex-col">
                            <span className="text-sm mb-1">Name</span>
                            <input 
                              name="name" 
                              defaultValue={editingUser.name || editingUser.fullName || `${editingUser.firstName || ''} ${editingUser.lastName || ''}`.trim()} 
                              className="border p-2 rounded" 
                            />
                          </label>
                          <label className="flex flex-col">
                            <span className="text-sm mb-1">Email</span>
                            <input 
                              name="email" 
                              type="email" 
                              defaultValue={editingUser.email || ''} 
                              className="border p-2 rounded" 
                            />
                          </label>
                          <label className="flex flex-col">
                            <span className="text-sm mb-1">Role</span>
                            <select name="role" defaultValue={editingUser.role || 'user'} className="border p-2 rounded">
                              <option value="user">User</option>
                              <option value="admin">Admin</option>
                            </select>
                          </label>
                          <label className="flex flex-col">
                            <span className="text-sm mb-1">Account Type</span>
                            <select name="accountType" defaultValue={editingUser.accountType || 'External'} className="border p-2 rounded">
                              <option value="External">External</option>
                              <option value="Internal">Internal</option>
                            </select>
                          </label>
                        </div>

                        <div className="mt-4 flex justify-end gap-2">
                          
                          <button 
                            type="button" 
                            onClick={() => setEditingUser(null)} 
                            className="relative overflow-hidden text-white px-4 py-2 rounded-full shadow group"
                          >
                            <span className="absolute inset-0 bg-gradient-to-r from-[#9a3434] to-[#ff8383] transition-all duration-300 ease-in-out group-hover:opacity-0" />
                            <span className="absolute inset-0 bg-gradient-to-r from-[#ff8383] to-[#9a3434] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
                            <span className="relative z-10 font-medium">Cancel</span>
                          </button>
                          <button 
                            type="submit" 
                            disabled={editLoading} 
                            className="relative overflow-hidden text-white px-4 py-2 rounded-full shadow group"
                          >
                            <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] transition-all duration-300 ease-in-out group-hover:opacity-0" />
                            <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
                            <span className="relative z-10 font-medium">{editLoading ? 'Saving...' : 'Save'}</span>
                          </button>
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

export default AdminUserview