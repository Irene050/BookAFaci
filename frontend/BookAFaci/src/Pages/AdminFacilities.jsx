import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar, { SidebarItem } from "../components/sidebar";
import Topbar from "../components/topbar";
import FacilityModal from "../components/FacilityModal";
import EquipmentModal from "../components/equipment";
import loginbg from "../assets/Gradient blur.png";
import { LayoutDashboard, Building2, Clipboard, Users, Edit3, Trash2, Wrench } from "lucide-react";

const base = import.meta.env.VITE_API_URL || "";

function AdminFacilities() {
  const navigate = useNavigate();
  const [facilities, setFacilities] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [isFacilityModalOpen, setIsFacilityModalOpen] = useState(false);
  const [isEquipmentModalOpen, setIsEquipmentModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [isFacilityEditMode, setIsFacilityEditMode] = useState(false);
  const [isEquipmentEditMode, setIsEquipmentEditMode] = useState(false);
  const [showAllFacilities, setShowAllFacilities] = useState(false);
  const [showAllEquipments, setShowAllEquipments] = useState(false);
  const ITEMS_TO_SHOW = 3;

  const getToken = () => {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) return adminToken;
    
    const token = localStorage.getItem('token');
    if (token) return token;
    
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        return userData.token || userData.accessToken || null;
      } catch (e) {
        console.error('Failed to parse user from localStorage');
      }
    }
    
    return null;
  };

  const checkAuth = () => {
    const token = getToken();
    if (!token) {
      toast.error("Please log in to access this page");
      navigate('/admindash', { replace: true });
      return false;
    }
    return true;
  };

useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    if (isFacilityModalOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow || '';
      document.body.style.paddingRight = originalPaddingRight || '';
    }

    return () => {
      document.body.style.overflow = originalOverflow || '';
      document.body.style.paddingRight = originalPaddingRight || '';
    };
  }, [isFacilityModalOpen]);

  useEffect(() => {
    if (!checkAuth()) return;

    (async () => {
      try {
        const tokenConfig = {
          headers: { 'Authorization': `Bearer ${getToken()}` }
        };

        const [facilityRes, equipmentRes] = await Promise.all([
          axios.get(`${base}/bookafaci/facility`, tokenConfig),
          axios.get(`${base}/bookafaci/equipment`, tokenConfig)
        ]);

        const facilityList = Array.isArray(facilityRes.data)
          ? facilityRes.data
          : Array.isArray(facilityRes.data?.facilities)
            ? facilityRes.data.facilities
            : Array.isArray(facilityRes.data?.data)
              ? facilityRes.data.data
              : [];
        setFacilities(facilityList);

        console.log('Equipment response:', equipmentRes.data);
        const equipmentList = Array.isArray(equipmentRes.data?.data)
          ? equipmentRes.data.data
          : Array.isArray(equipmentRes.data)
            ? equipmentRes.data
            : Array.isArray(equipmentRes.data?.equipments)
              ? equipmentRes.data.equipments
              : [];
        console.log('Parsed equipment list:', equipmentList);
        setEquipments(equipmentList);
        console.log('Loaded equipments:', equipmentList);
      } catch (err) {
        console.error("Failed to load data", err);
        if (err.response?.status === 401) {
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem('adminToken');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/admindash', { replace: true });
        } else {
          toast.error("Failed to load facilities and equipment");
        }
      }
    })();
  }, []);

  const fetchFacilities = async () => {
    if (!checkAuth()) return;
    
    try {
      const res = await axios.get(`${base}/bookafaci/facility`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      const list = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.facilities)
        ? res.data.facilities
        : Array.isArray(res.data?.data)
          ? res.data.data
          : [];
      setFacilities(list);
    } catch (err) {
      console.error("Refresh facilities error:", err);
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem('adminToken');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admindash', { replace: true });
      }
    }
  };

  const fetchEquipments = async () => {
    if (!checkAuth()) return;
    
    try {
      const res = await axios.get(`${base}/bookafaci/equipment`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      const list = Array.isArray(res.data?.data)
        ? res.data.data
        : Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.equipments)
            ? res.data.equipments
            : [];
      setEquipments(list);
      console.log('Refreshed equipments:', list);
    } catch (err) {
      console.error("Refresh equipments error:", err);
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem('adminToken');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admindash', { replace: true });
      }
    }
  };

  const handleAddFacility = async (payload, imageFile, facilityId) => {
    if (!checkAuth()) return;
    
    try {
      const formData = new FormData();
      formData.append('name', payload.name);
      formData.append('description', payload.description);
      formData.append('capacity', payload.capacity);
      formData.append('status', payload.status);
      formData.append('availability', JSON.stringify(payload.availability));
      if (imageFile) formData.append('image', imageFile);

      await axios.post(`${base}/bookafaci/facility`, formData, {
        headers: { 
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success("Facility added successfully");
      setIsFacilityModalOpen(false);
      fetchFacilities();
    } catch (err) {
      console.error("Add facility error:", err?.response?.data || err);
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem('adminToken');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admindash', { replace: true });
      } else {
        toast.error(err?.response?.data?.message || "Could not add facility");
      }
    }
  };

  const handleEditFacility = async (payload, imageFile, facilityId) => {
    if (!checkAuth()) return;
    
    try {
      const formData = new FormData();
      formData.append('name', payload.name);
      formData.append('description', payload.description);
      formData.append('capacity', payload.capacity);
      formData.append('status', payload.status);
      formData.append('availability', JSON.stringify(payload.availability));
      if (imageFile) formData.append('image', imageFile);

      await axios.put(`${base}/bookafaci/facility/${facilityId}`, formData, {
        headers: { 
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success("Facility updated successfully");
      setIsFacilityModalOpen(false);
      fetchFacilities();
    } catch (err) {
      console.error("Edit facility error:", err?.response?.data || err);
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem('adminToken');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admindash', { replace: true });
      } else {
        toast.error(err?.response?.data?.message || "Could not update facility");
      }
    }
  };

  const handleDeleteFacility = async (id) => {
    if (!checkAuth()) return;
    
    if (!confirm('Are you sure you want to delete this facility?')) return;
    try {
      await axios.delete(`${base}/bookafaci/facility/${id}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      toast.success("Facility deleted successfully");
      fetchFacilities();
    } catch (err) {
      console.error("Delete facility error:", err);
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem('adminToken');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admindash', { replace: true });
      } else {
        toast.error("Could not delete facility");
      }
    }
  };

  const handleAddEquipment = async (payload, imageFile, equipmentId) => {
    if (!checkAuth()) return;
    
    try {
      const formData = new FormData();
      formData.append('name', payload.name);
      formData.append('quantity', payload.quantity);
      formData.append('status', payload.status);
      if (imageFile) formData.append('image', imageFile);

      await axios.post(`${base}/bookafaci/equipment`, formData, {
        headers: { 
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success("Equipment added successfully");
      setIsEquipmentModalOpen(false);
      fetchEquipments();
    } catch (err) {
      console.error("Add equipment error:", err?.response?.data || err);
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem('adminToken');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admindash', { replace: true });
      } else {
        toast.error(err?.response?.data?.message || "Could not add equipment");
      }
    }
  };

  const handleEditEquipment = async (payload, imageFile, equipmentId) => {
    if (!checkAuth()) return;
    
    try {
      const formData = new FormData();
      formData.append('name', payload.name);
      formData.append('quantity', payload.quantity);
      formData.append('status', payload.status);
      if (imageFile) formData.append('image', imageFile);

      await axios.put(`${base}/bookafaci/equipment/${equipmentId}`, formData, {
        headers: { 
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success("Equipment updated successfully");
      setIsEquipmentModalOpen(false);
      fetchEquipments();
    } catch (err) {
      console.error("Edit equipment error:", err?.response?.data || err);
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem('adminToken');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admindash', { replace: true });
      } else {
        toast.error(err?.response?.data?.message || "Could not update equipment");
      }
    }
  };

  const handleDeleteEquipment = async (id) => {
    if (!checkAuth()) return;
    
    if (!confirm('Are you sure you want to delete this equipment?')) return;
    try {
      await axios.delete(`${base}/bookafaci/equipment/${id}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      toast.success("Equipment deleted successfully");
      fetchEquipments();
    } catch (err) {
      console.error("Delete equipment error:", err);
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem('adminToken');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admindash', { replace: true });
      } else {
        toast.error("Could not delete equipment");
      }
    }
  };

  const openFacilityEditModal = (facility) => {
    setSelectedFacility(facility);
    setIsFacilityEditMode(true);
    setIsFacilityModalOpen(true);
  };

  const openFacilityAddModal = () => {
    setSelectedFacility(null);
    setIsFacilityEditMode(false);
    setIsFacilityModalOpen(true);
  };

  const openEquipmentEditModal = (equipment) => {
    setSelectedEquipment(equipment);
    setIsEquipmentEditMode(true);
    setIsEquipmentModalOpen(true);
  };

  const openEquipmentAddModal = () => {
    setSelectedEquipment(null);
    setIsEquipmentEditMode(false);
    setIsEquipmentModalOpen(true);
  };

  const getVisibleFacilities = () => {
    const visibleCount = showAllFacilities ? facilities.length : ITEMS_TO_SHOW;
    return (Array.isArray(facilities) ? facilities : []).slice(0, visibleCount);
  };

  const getVisibleEquipments = () => {
    const visibleCount = showAllEquipments ? equipments.length : ITEMS_TO_SHOW;
    return (Array.isArray(equipments) ? equipments : []).slice(0, visibleCount);
  };

  return (
    <div className="flex min-h-screen transition-all font-inter">
      <title>Facilities</title>

      <FacilityModal
        isOpen={isFacilityModalOpen}
        onClose={() => {
          setIsFacilityModalOpen(false);
          setSelectedFacility(null);
          setIsFacilityEditMode(false);
        }}
        onSubmit={isFacilityEditMode ? handleEditFacility : handleAddFacility}
        facility={selectedFacility}
        isEdit={isFacilityEditMode}
      />

      <EquipmentModal
        isOpen={isEquipmentModalOpen}
        onClose={() => {
          setIsEquipmentModalOpen(false);
          setSelectedEquipment(null);
          setIsEquipmentEditMode(false);
        }}
        onSubmit={isEquipmentEditMode ? handleEditEquipment : handleAddEquipment}
        equipment={selectedEquipment}
        isEdit={isEquipmentEditMode}
      />

      <Sidebar>
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={false} onClick={() => navigate("/admindash")} />
        <SidebarItem icon={<Building2 size={20} />} text="Facilities" active={true} onClick={() => navigate("/adminfaci")} />
        <SidebarItem icon={<Clipboard size={20} />} text="Bookings" active={false} onClick={() => navigate("/adminbks")} />
        <SidebarItem icon={<Users size={20} />} text="Users" active={false} onClick={() => navigate("/adminusers")} />
      </Sidebar>

      <main
        className="flex-1 pl-6 pr-6 bg-center bg-cover min-h-screen relative pb-5 
          min-[320px]:w-[350px] max-[640px]:w-[450px] md:w-[450px] lg:w-[450px]
          min-[320px]:pl-6
          min-[375px]:pl-6
          min-[425px]:pl-6
          sm:pl-6
          md:pl-[5.5rem]
          lg:pl-[5.5rem]
          xl:pl-[5.5rem]"
        style={{
          backgroundImage: `linear-gradient(rgba(194, 217, 249, 0.85), rgba(194, 217, 249, 0.85)), url(${loginbg})`,
        }}
      >
        <Topbar />
        
        <div>
        <div className="bg-gradient-to-b from-[#E0E0E0] via-[#DDF2FF] to-[#E0E0E0] h-fit rounded-[10px] p-[1px] mt-[20px]">
          <div className="flex items-center justify-between pl-[35px] pr-[45px] pt-[35px]
            min-[320px]:flex-col min-[320px]:items-start min-[320px]:gap-3 min-[320px]:px-4 min-[320px]:pt-6
            min-[375px]:flex-col min-[375px]:items-start min-[375px]:gap-3 min-[375px]:px-5
            sm:flex-col sm:items-start sm:gap-3 sm:px-6
            md:flex-row md:items-center md:gap-0
            lg:flex-row">
            <h1 className="pl-[35px] pt-[35px] mb-5 font-inter font-bold text-[2rem] text-[#007BDA]">Facilities</h1>
            <button 
              className="relative overflow-hidden text-white px-6 py-2 rounded-full shadow group
                min-[320px]:px-4 min-[320px]:py-1.5 min-[320px]:text-sm
                min-[375px]:px-5 min-[375px]:py-2
                sm:px-6 sm:py-2"
              onClick={openFacilityAddModal}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] transition-all duration-300 ease-in-out group-hover:opacity-0" />
              <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
              <span className="relative font-medium">+ Add Facility</span>
            </button>
          </div>

          <div className="px-[45px] pb-[45px] pt-5
            min-[320px]:px-4 min-[375px]:px-5 sm:px-6 md:px-8 lg:px-[45px]">
            {/* --------------------------------------------------
                     FACILITIES SECTION
            -------------------------------------------------- */}
            {!showAllFacilities ? (
              <>
                <div className="flex gap-5 overflow-x-auto overflow-y-hidden pb-4 scrollbar-thin scrollbar-thumb-[#007BDA]/80 scrollbar-track-gray-100"
                  style={{ scrollbarWidth: 'thin', scrollbarColor: '#007BDA80 #F3F4F6' }}>
                  {facilities.map((f) => (
                    <div
                      key={f._id}
                      className="bg-[#F7FBFF] rounded-[15px] shadow-md p-5 flex-shrink-0 flex flex-col"
                      style={{ minWidth: "20%" }}
                    >
                      <img
                        src={f.image ? (f.image.startsWith('http') ? f.image : `${base}${f.image}`) : '/placeholder.png'}
                        className="w-full h-40 rounded-xl object-cover mb-4"
                        alt={f.name}
                        onError={(e) => { e.target.src = '/placeholder.png'; }}
                      />
                      <p className="font-bold text-lg">{f.name}</p>
                      <p className="text-gray-500 text-sm mb-2">{f.description}</p>

                      <div className="flex flex-grow items-center gap-3 mt-2">
                        <span className="text-sm text-gray-600">Capacity: {f.capacity}</span>
                        <span className={`text-sm px-2 py-0.5 rounded ${
                          f.status === 'active' ? 'bg-green-100 text-green-700' :
                          f.status === 'inactive' ? 'bg-gray-100 text-gray-700' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {f.status}
                        </span>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => openFacilityEditModal(f)}
                          className="flex-1 relative overflow-hidden text-white px-4 py-2 rounded-full shadow text-sm font-medium hover:shadow-lg transition-all"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF]" />
                          <span className="relative z-10 flex items-center gap-2 justify-center">
                            <Edit3 size={16} /> Edit
                          </span>
                        </button>
                        <button
                          onClick={() => handleDeleteFacility(f._id)}
                          className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition-all shadow-sm hover:shadow-md"
                          title="Delete facility"
                        >
                          <Trash2 size={18} className="text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {facilities.length > ITEMS_TO_SHOW && (
                  <div className="mt-3 text-right">
                    <button
                      onClick={() => {
                        const prevY = window.scrollY;
                        setShowAllFacilities(true);
                        requestAnimationFrame(() => window.scrollTo({ top: prevY, left: 0, behavior: 'instant' }));
                      }}
                      className="relative overflow-hidden text-white px-3 py-1 rounded-full shadow group"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] transition-all duration-300 ease-in-out group-hover:opacity-0" />
                      <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
                      <span className="relative z-10 font-medium">Expand</span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5
                min-[320px]:gap-3 min-[375px]:gap-4 sm:gap-4 md:gap-5">
                {facilities.map((f) => (
                  <div key={f._id} className="bg-[#F7FBFF] rounded-[15px] shadow-md p-5 flex flex-col">
                    <img
                      src={f.image ? (f.image.startsWith('http') ? f.image : `${base}${f.image}`) : '/placeholder.png'}
                      className="w-full h-40 rounded-xl object-cover mb-4"
                      alt={f.name}
                      onError={(e) => { e.target.src = '/placeholder.png'; }}
                    />
                    <p className="font-bold text-lg">{f.name}</p>
                    <p className="text-gray-500 text-sm mb-2">{f.description}</p>

                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-sm text-gray-600">Capacity: {f.capacity}</span>
                      <span className={`text-sm px-2 py-0.5 rounded ${
                        f.status === 'active' ? 'bg-green-100 text-green-700' :
                        f.status === 'inactive' ? 'bg-gray-100 text-gray-700' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {f.status}
                      </span>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => openFacilityEditModal(f)}
                        className="flex-1 relative overflow-hidden text-white px-4 py-2 rounded-full shadow text-sm font-medium hover:shadow-lg transition-all"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF]" />
                        <span className="relative z-10 flex items-center gap-2 justify-center">
                          <Edit3 size={16} /> Edit
                        </span>
                      </button>
                      <button
                        onClick={() => handleDeleteFacility(f._id)}
                        className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition-all shadow-sm hover:shadow-md"
                        title="Delete facility"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="col-span-full text-right mt-3">
                  <button
                    onClick={() => {
                      const prevY = window.scrollY;
                      setShowAllFacilities(false);
                      requestAnimationFrame(() => window.scrollTo({ top: prevY, left: 0, behavior: 'instant' }));
                    }}
                    className="relative overflow-hidden text-white px-3 py-1 rounded-full shadow group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] transition-all duration-300 ease-in-out group-hover:opacity-0" />
                          <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
                    <span className="relative z-10 font-medium">Collapse</span>
                  </button>
                </div>
              </div>
            )}

            {/* Empty State */}
            {(!Array.isArray(facilities) || facilities.length === 0) && (
              <div className="text-center py-12">
                <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-500 mb-2">No facilities found</h3>
                <button 
                  className="px-6 py-2 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all
                  "
                  onClick={openFacilityAddModal}
                >
                  + Add Facility
                </button>
              </div>
            )}
          </div>
          <hr className="my-2 mx-[45px] border-dashed border-[#346D9A]/50" />

          {/* --------------------------------------------------
                     EQUIPMENT SECTION
          -------------------------------------------------- */}
          <div className="flex items-center justify-between pl-[35px] pr-[45px] pt-[10px]
            min-[320px]:flex-col min-[320px]:items-start min-[320px]:gap-3 min-[320px]:px-4 min-[320px]:pt-4
            min-[375px]:flex-col min-[375px]:items-start min-[375px]:gap-3 min-[375px]:px-5
            sm:flex-col sm:items-start sm:gap-3 sm:px-6
            md:flex-row md:items-center md:gap-0
            lg:flex-row">
            <h1 className="pl-[35px] pt-[35px] mb-5 font-inter font-bold text-[2rem] text-[#007BDA]">Equipment</h1>
            <button 
              className="relative overflow-hidden text-white px-6 py-2 rounded-full shadow group
                min-[320px]:px-4 min-[320px]:py-1.5 min-[320px]:text-sm
                min-[375px]:px-5 min-[375px]:py-2
                sm:px-6 sm:py-2"
              onClick={openEquipmentAddModal}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] transition-all duration-300 ease-in-out group-hover:opacity-0" />
                          <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
              <span className="relative font-medium">+ Add Equipment</span>
            </button>
          </div>

          <div className="px-[45px] pb-[45px] pt-5
            min-[320px]:px-4 min-[375px]:px-5 sm:px-6 md:px-8 lg:px-[45px]">
            {!showAllEquipments ? (
              <>
                <div className="flex gap-5 overflow-x-auto overflow-y-hidden pb-4 scrollbar-thin scrollbar-thumb-[#007BDA]/80 scrollbar-track-gray-100"
                  style={{ scrollbarWidth: 'thin', scrollbarColor: '#007BDA80 #F3F4F6' }}>
                  {equipments.map((eq) => (
                    <div
                      key={eq._id}
                      className="bg-[#F7FBFF] rounded-[15px] shadow-md p-5 flex-shrink-0 flex flex-col"
                      style={{ minWidth: "20%" }}
                    >
                      <img
                        src={eq.image ? (eq.image.startsWith("http") ? eq.image : `${base}${eq.image}`) : "/placeholder.png"}
                        className="w-full h-40 rounded-xl object-cover mb-4"
                        alt={eq.name}
                        onError={(e) => { e.target.src = '/placeholder.png'; }}
                        style={{ 
                          objectFit: "cover", 
                          objectPosition: "center"
                        }}
                      />
                      <p className="font-bold text-lg">{eq.name}</p>
                      <p className="text-gray-500 text-sm mb-2">{eq.description}</p>

                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-sm text-gray-600">Qty: {eq.quantity}</span>
                        <span className={`text-sm px-2 py-0.5 rounded ${
                          eq.status === "available" || eq.status === "active" ? "bg-green-100 text-green-700" :
                          eq.status === "unavailable" || eq.status === "inactive" ? "bg-red-100 text-red-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {eq.status}
                        </span>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => openEquipmentEditModal(eq)}
                          className="flex-1 relative overflow-hidden text-white px-4 py-2 rounded-full shadow text-sm font-medium hover:shadow-lg transition-all"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF]" />
                          <span className="relative z-10 flex items-center gap-2 justify-center">
                            <Edit3 size={16} /> Edit
                          </span>
                        </button>
                        <button
                          onClick={() => handleDeleteEquipment(eq._id)}
                          className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition-all shadow-sm hover:shadow-md"
                          title="Delete equipment"
                        >
                          <Trash2 size={18} className="text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {equipments.length > ITEMS_TO_SHOW && (
                  <div className="mt-3 text-right">
                    <button
                      onClick={() => {
                        const prevY = window.scrollY;
                        setShowAllEquipments(true);
                        requestAnimationFrame(() => window.scrollTo({ top: prevY, left: 0, behavior: 'smooth' }));
                      }}
                      className="relative overflow-hidden text-white px-3 py-1 rounded-full shadow group"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] transition-all duration-300 ease-in-out group-hover:opacity-0" />
                      <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
                      <span className="relative z-10 font-medium">Expand</span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5
                min-[320px]:gap-3 min-[375px]:gap-4 sm:gap-4 md:gap-5">
                {equipments.map((eq) => (
                  <div
                    key={eq._id}
                    className="bg-[#F7FBFF] rounded-[15px] shadow-md p-5 flex flex-col"
                  >
                    <img
                      src={
                        eq.image
                          ? (eq.image.startsWith("http") ? eq.image : `${base}${eq.image}`)
                          : "/placeholder.png"
                      }
                      className="w-full h-40 rounded-xl object-cover mb-4"
                      alt={eq.name}
                      onError={(e) => { e.target.src = '/placeholder.png'; }}
                    />

                    <p className="font-bold text-lg">{eq.name}</p>
                    <p className="text-gray-500 text-sm mb-2">{eq.description}</p>

                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-sm text-gray-600">Qty: {eq.quantity}</span>

                      <span
                        className={`text-sm px-2 py-0.5 rounded ${
                          eq.status === "available" || eq.status === "active"
                            ? "bg-green-100 text-green-700"
                            : eq.status === "unavailable" || eq.status === "inactive"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {eq.status}
                      </span>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => openEquipmentEditModal(eq)}
                        className="flex-1 relative overflow-hidden text-white px-4 py-2 rounded-full shadow text-sm font-medium hover:shadow-lg transition-all"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF]" />
                        <span className="relative z-10 flex items-center gap-2 justify-center">
                          <Edit3 size={16} /> Edit
                        </span>
                      </button>
                      <button
                        onClick={() => handleDeleteEquipment(eq._id)}
                        className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition-all shadow-sm hover:shadow-md"
                        title="Delete equipment"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="col-span-full text-right mt-3">
                  <button
                    onClick={() => {
                      const prevY = window.scrollY;
                      setShowAllEquipments(false);
                      requestAnimationFrame(() => window.scrollTo({ top: prevY, left: 0, behavior: 'instant' }));
                    }}
                    className="relative overflow-hidden text-white px-3 py-1 rounded-full shadow group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] transition-all duration-300 ease-in-out group-hover:opacity-0" />
                    <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
                    <span className="relative z-10 font-medium">Collapse</span>
                  </button>
                </div>
              </div>
            )}
            
            {/* Empty State */}
            {(!Array.isArray(equipments) || equipments.length === 0) && (
              <div className="text-center py-12">
                <Wrench className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-500 mb-2">No equipment found</h3>
                <button 
                  className="px-6 py-2 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                  onClick={openEquipmentAddModal}
                >
                  + Add Equipment
                </button>
              </div>
            )}
          </div>

        </div>
        </div>
      </main>
    </div>
  );
}

export default AdminFacilities;