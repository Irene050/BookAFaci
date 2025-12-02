import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar, { SidebarItem } from "../components/sidebar";
import Topbar from "../components/topbar";
import FacilityModal from "../components/FacilityModal";
import loginbg from "../assets/Gradient blur.png";
import { LayoutDashboard, Building2, Clipboard, Users, Edit3, Trash2 } from "lucide-react";

const base = import.meta.env.VITE_API_URL || "";

function AdminFacilities() {
  const navigate = useNavigate();
  const [facilities, setFacilities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/");
  }, [navigate]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${base}/bookafaci/facility`);
        console.log('Facilities Loaded');
        const list = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.facilities)
            ? res.data.facilities
            : Array.isArray(res.data?.data)
              ? res.data.data
              : [];
        setFacilities(list);
      } catch (err) {
        console.error("Failed to load facilities", err);
        toast.error("Failed to load facilities");
      }
    })();
  }, []);

  const fetchFacilities = async () => {
    try {
      const res = await axios.get(`${base}/bookafaci/facility`);
      const list = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.facilities)
          ? res.data.facilities
          : Array.isArray(res.data?.data)
            ? res.data.data
            : [];
      setFacilities(list);
    } catch (err) {
      console.error("Refresh error:", err);
    }
  };

  const handleAddFacility = async (payload, imageFile, facilityId) => {
    try {
      console.log("Adding facility...");
      const formData = new FormData();
      formData.append('name', payload.name);
      formData.append('description', payload.description);
      formData.append('capacity', payload.capacity);
      formData.append('status', payload.status);
      formData.append('availableDates', JSON.stringify(payload.availableDates));
      if (imageFile) formData.append('image', imageFile);

      await axios.post(`${base}/bookafaci/facility`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success("Facility added successfully");
      setIsModalOpen(false);
      fetchFacilities();
    } catch (err) {
      console.error("Add error:", err?.response?.data || err);
      toast.error(err?.response?.data?.message || "Could not add facility");
    }
  };

  const handleEditFacility = async (payload, imageFile, facilityId) => {
    try {
      console.log("Updating facility ID:", facilityId);
      const formData = new FormData();
      formData.append('name', payload.name);
      formData.append('description', payload.description);
      formData.append('capacity', payload.capacity);
      formData.append('status', payload.status);
      formData.append('availableDates', JSON.stringify(payload.availableDates));
      if (imageFile) formData.append('image', imageFile);

      await axios.put(`${base}/bookafaci/facility/${facilityId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success("Facility updated successfully");
      setIsModalOpen(false);
      fetchFacilities();
    } catch (err) {
      console.error("Edit error:", err?.response?.data || err);
      toast.error(err?.response?.data?.message || "Could not update facility");
    }
  };

  const handleDeleteFacility = async (id) => {
    if (!confirm('Are you sure you want to delete this facility?')) return;
    try {
      await axios.delete(`${base}/bookafaci/facility/${id}`);
      toast.success("Facility deleted successfully");
      fetchFacilities();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Could not delete facility");
    }
  };

  const openEditModal = (facility) => {
    setSelectedFacility(facility);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setSelectedFacility(null);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-screen">
      <title>Facilities</title>

      <FacilityModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedFacility(null);
          setIsEditMode(false);
        }}
        onSubmit={isEditMode ? handleEditFacility : handleAddFacility}
        facility={selectedFacility}
        isEdit={isEditMode}
      />

      <Sidebar>
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={false} onClick={() => navigate("/admindash")} />
        <SidebarItem icon={<Building2 size={20} />} text="Facilities" active={true} onClick={() => navigate("/adminfaci")} />
        <SidebarItem icon={<Clipboard size={20} />} text="Bookings" active={false} onClick={() => navigate("/adminbks")} />
        <SidebarItem icon={<Users size={20} />} text="Users" active={false} onClick={() => navigate("/adminusers")} />
      </Sidebar>

      <main className="flex-1 pl-6 pr-6 bg-center bg-cover h-full relative pb-5"
        style={{
          paddingLeft: '5.5rem',
          backgroundImage: `linear-gradient(rgba(194, 217, 249, 0.85), rgba(194, 217, 249, 0.85)), url(${loginbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}>
        <Topbar />

        <div className="bg-gradient-to-b from-[#E0E0E0] via-[#DDF2FF] to-[#E0E0E0] rounded-[10px] p-[1px] mt-[20px]">
          <div className="rounded-[10px] p-10 mt-[20px]">
            <div className="flex items-center justify-between w-full mb-8">
              <h1 className="font-inter font-bold text-[2rem] text-[#007BDA]">Facilities & Equipment Management</h1>
              <button 
                className="mt-4 relative overflow-hidden text-white px-6 py-2 rounded-full shadow group"
                onClick={openAddModal}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] transition-opacity duration-300 ease-in-out group-hover:opacity-0"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></span>
                <span className="relative font-medium">+ Add Facility</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {(Array.isArray(facilities) ? facilities : []).map((facility) => (
                <div key={facility._id} className="bg-[#F7FBFF] rounded-[15px] shadow-md p-5 flex flex-col group cursor-pointer hover:shadow-lg transition-all" onClick={() => openEditModal(facility)}>
                  <img
                    src={
                      facility.image
                        ? (facility.image.startsWith('http') ? facility.image : `${base}${facility.image}`)
                        : '/placeholder.png'
                    }
                    className="w-full h-40 rounded-xl object-cover mb-4"
                    alt={facility.name}
                    onError={(e) => { e.target.src = '/placeholder.png'; }}
                  />

                    <h3 className="font-bold text-lg text-[#1A1A1A]">{facility.name}</h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{facility.description}</p>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm text-gray-600">Capacity: {facility.capacity}</span>
                      <span className={`text-sm px-2 py-0.5 rounded-md font-normal ${
                        facility.status === 'active' ? 'bg-green-100 text-green-700' :
                        facility.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
                        facility.status === 'under maintenance' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {facility.status}
                      </span>
                    </div>
                  
                  
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(facility);
                      }}
                      className="flex-1 relative overflow-hidden text-white px-4 py-2 rounded-full shadow text-sm font-medium hover:shadow-lg transition-all"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] hover:opacity-90 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center gap-2">
                        <Edit3 size={16} /> Edit
                      </span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFacility(facility._id);
                      }}
                      className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition-all shadow-sm hover:shadow-md"
                      title="Delete facility"
                    >
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {(Array.isArray(facilities) && facilities.length === 0) && (
              <div className="col-span-full text-center py-20">
                <Building2 className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-500 mb-2">No facilities found</h3>
                <p className="text-gray-400 mb-6">Get started by creating your first facility.</p>
                <button 
                  className="px-8 py-3 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                  onClick={openAddModal}
                >
                  + Create Facility
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminFacilities;
