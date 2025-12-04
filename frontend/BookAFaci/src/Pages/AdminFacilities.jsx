import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar, { SidebarItem } from "../components/sidebar";
import Topbar from "../components/topbar";
import FacilityModal from "../components/FacilityModal";
import EquipmentModal from "../components/equipment"; // Note lowercase filename for Equipment Modal (different from EquipmentModal.jsx)
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

  useEffect(() => {
    (async () => {
      try {
        const [facilityRes, equipmentRes] = await Promise.all([
          axios.get(`${base}/bookafaci/facility`),
          axios.get(`${base}/bookafaci/equipment`)
        ]);

        const facilityList = Array.isArray(facilityRes.data)
          ? facilityRes.data
          : Array.isArray(facilityRes.data?.facilities)
            ? facilityRes.data.facilities
            : Array.isArray(facilityRes.data?.data)
              ? facilityRes.data.data
              : [];
        setFacilities(facilityList);

        const equipmentList = Array.isArray(equipmentRes.data)
          ? equipmentRes.data
          : Array.isArray(equipmentRes.data?.equipments)
            ? equipmentRes.data.equipments
            : Array.isArray(equipmentRes.data?.data)
              ? equipmentRes.data.data
              : [];
        setEquipments(equipmentList);
      } catch (err) {
        console.error("Failed to load data", err);
        toast.error("Failed to load facilities and equipment");
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
      console.error("Refresh facilities error:", err);
    }
  };

  const fetchEquipments = async () => {
    try {
      const res = await axios.get(`${base}/bookafaci/equipment`);
      const list = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.equipments)
          ? res.data.equipments
          : Array.isArray(res.data?.data)
            ? res.data.data
            : [];
      setEquipments(list);
    } catch (err) {
      console.error("Refresh equipment error:", err);
    }
  };

  const handleAddFacility = async (payload, imageFile, facilityId) => {
    try {
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
      setIsFacilityModalOpen(false);
      fetchFacilities();
    } catch (err) {
      console.error("Add facility error:", err?.response?.data || err);
      toast.error(err?.response?.data?.message || "Could not add facility");
    }
  };

  const handleEditFacility = async (payload, imageFile, facilityId) => {
    try {
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
      setIsFacilityModalOpen(false);
      fetchFacilities();
    } catch (err) {
      console.error("Edit facility error:", err?.response?.data || err);
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
      console.error("Delete facility error:", err);
      toast.error("Could not delete facility");
    }
  };

  const handleAddEquipment = async (payload, imageFile, equipmentId) => {
    try {
      const formData = new FormData();
      formData.append('name', payload.name);
      formData.append('quantity', payload.quantity);
      formData.append('status', payload.status);
      if (imageFile) formData.append('image', imageFile);

      await axios.post(`${base}/bookafaci/equipment`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success("Equipment added successfully");
      setIsEquipmentModalOpen(false);
      fetchEquipments();
    } catch (err) {
      console.error("Add equipment error:", err?.response?.data || err);
      toast.error(err?.response?.data?.message || "Could not add equipment");
    }
  };

  const handleEditEquipment = async (payload, imageFile, equipmentId) => {
    try {
      const formData = new FormData();
      formData.append('name', payload.name);
      formData.append('quantity', payload.quantity);
      formData.append('status', payload.status);
      if (imageFile) formData.append('image', imageFile);

      await axios.put(`${base}/bookafaci/equipment/${equipmentId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success("Equipment updated successfully");
      setIsEquipmentModalOpen(false);
      fetchEquipments();
    } catch (err) {
      console.error("Edit equipment error:", err?.response?.data || err);
      toast.error(err?.response?.data?.message || "Could not update equipment");
    }
  };

  const handleDeleteEquipment = async (id) => {
    if (!confirm('Are you sure you want to delete this equipment?')) return;
    try {
      await axios.delete(`${base}/bookafaci/equipment/${id}`);
      toast.success("Equipment deleted successfully");
      fetchEquipments();
    } catch (err) {
      console.error("Delete equipment error:", err);
      toast.error("Could not delete equipment");
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

  return (
    <div className="flex min-h-screen transition-all">
      <title>Facilities & Equipment</title>

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

      <main className="flex-1 pl-6 pr-6 bg-center bg-cover min-h-screen relative pb-5 
        min-[320px]:w-[350px] max-[640px]:w-[450px] md:w-[450px] lg:w-[450px]" 
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
            <h1 className="font-inter font-bold text-[2rem] text-[#007BDA] mb-12">Facilities & Equipment Management</h1>

            {/* Facilities Section */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-xl text-[#007BDA]">Facilities</h2>
                <button 
                  className="relative overflow-hidden text-white px-6 py-2 rounded-full shadow group"
                  onClick={openFacilityAddModal}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] transition-opacity duration-300 ease-in-out group-hover:opacity-0"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></span>
                  <span className="relative font-medium">+ Add Facility</span>
                </button>
              </div>
              <div 
                id="facility-container"
                className="flex gap-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-[#007BDA]/80 scrollbar-track-gray-100 scrollbar-thumb-rounded scrollbar-track-rounded snap-x snap-mandatory"
                style={{ scrollbarWidth: 'thin', scrollbarColor: '#007BDA40 #F3F4F6' }}
              >
                {(Array.isArray(facilities) ? facilities : []).map((facility) => (
                  <div key={facility._id} className="bg-[#F7FBFF] rounded-[15px] shadow-md p-5 flex flex-col min-w-[320px] flex-shrink-0 snap-center group cursor-pointer hover:shadow-lg transition-all" onClick={() => openFacilityEditModal(facility)}>
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
                          openFacilityEditModal(facility);
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
                <div className="text-center py-12">
                  <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-500 mb-2">No facilities found</h3>
                  <button 
                    className="px-6 py-2 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                    onClick={openFacilityAddModal}
                  >
                    + Create Facility
                  </button>
                </div>
              )}
            </div>

            {/* Equipment Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-xl text-[#007BDA] flex items-center gap-2">
                  Equipment
                </h2>
                <button 
                  className="relative overflow-hidden text-white px-6 py-2 rounded-full shadow group"
                  onClick={openEquipmentAddModal}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] transition-opacity duration-300 ease-in-out group-hover:opacity-0"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></span>
                  <span className="relative font-medium">+ Add Equipment</span>
                </button>
              </div>
              <div 
                id="equipment-container"
                className="flex gap-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-[#007BDA]/80 scrollbar-track-gray-100 scrollbar-thumb-rounded scrollbar-track-rounded snap-x snap-mandatory"
                style={{ scrollbarWidth: 'thin', scrollbarColor: '#007BDA40 #F3F4F6' }}
              >
                {(Array.isArray(equipments) ? equipments : []).map((equipment) => (
                  <div key={equipment._id} className="bg-[#F7FBFF] rounded-[15px] shadow-md p-5 flex flex-col min-w-[320px] flex-shrink-0 snap-center group cursor-pointer hover:shadow-lg transition-all" onClick={() => openEquipmentEditModal(equipment)}>
                    <img
                      src={
                        equipment.image
                          ? (equipment.image.startsWith('http') ? equipment.image : `${base}${equipment.image}`)
                          : '/placeholder.png'
                      }
                      className="w-full h-40 rounded-xl object-cover mb-4"
                      alt={equipment.name}
                      onError={(e) => { e.target.src = '/placeholder.png'; }}
                    />
                    <h3 className="font-bold text-lg text-[#1A1A1A]">{equipment.name}</h3>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm text-gray-600">Quantity: {equipment.quantity}</span>
                      <span className={`text-sm px-2 py-0.5 rounded-md font-normal ${
                        equipment.status === 'active' ? 'bg-green-100 text-green-700' :
                        equipment.status === 'inactive' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {equipment.status}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEquipmentEditModal(equipment);
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
                          handleDeleteEquipment(equipment._id);
                        }}
                        className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition-all shadow-sm hover:shadow-md"
                        title="Delete equipment"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {(Array.isArray(equipments) && equipments.length === 0) && (
                <div className="text-center py-12">
                  <Wrench className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-500 mb-2">No equipment found</h3>
                  <button 
                    className="px-6 py-2 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                    onClick={openEquipmentAddModal}
                  >
                    + Create Equipment
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
