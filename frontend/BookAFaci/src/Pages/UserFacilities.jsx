import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar, { SidebarItem } from "../components/sidebar";
import Topbar from "../components/topbar";
import loginbg from "../assets/Gradient blur.png";
import EquipmentModal from "../components/EquipmentModal";

import { LayoutDashboard, Building2, Clipboard } from "lucide-react";

const base = import.meta.env.VITE_API_URL || "";

function Facilities() {
  const navigate = useNavigate();
  const [facilities, setFacilities] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/login");
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

        const rRes = await axios.get(`${base}/bookafaci/equipment`).catch(() => axios.get(`${base}/bookafaci/equipment`).catch(() => ({ data: [] })));
        const equipmentsList = Array.isArray(rRes.data) ? rRes.data : (rRes.data?.equipments || rRes.data?.data || []);
        setEquipments(equipmentsList);
      } catch (err) {
        console.error("Failed to load facilities/equipments", err);
      }
    })();
  }, []);

  const handleBookingSubmit = async (payload) => {
    try {
      console.log("Booking...");
      const userObj = JSON.parse(localStorage.getItem("user") || "null");
      const userId = userObj?._id || userObj?.id || userObj?.user || null;

      const equipmentIds = Array.isArray(payload.equipment) ? payload.equipment : [];

      const facilityValue = (selectedFacility && typeof selectedFacility === 'object')
        ? (selectedFacility._id || selectedFacility.name || selectedFacility)
        : selectedFacility;

      const body = {
        user: userId,
        facility: facilityValue,
        equipments: equipmentIds,
        startDate: payload.startDate,
        endDate: payload.endDate,
      };

      await axios.post(`${base}/bookafaci/book`, body, { headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` } });
      toast.success("Booking submitted");
      setModalOpen(false);
    } catch (err) {
      console.error("Booking error:", err?.response?.data || err);
      toast.error(err?.response?.data?.message || "Could not submit booking");
    }
  };

  return (
    <div className="flex h-screen">
      <title>Facilities</title>

      <EquipmentModal
        open={modalOpen}
        facilityName={selectedFacility?.name || selectedFacility}
        equipments={Array.isArray(equipments) ? equipments : []}
        onClose={() => setModalOpen(false)}
        onSubmit={handleBookingSubmit}
      />

      <Sidebar>
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={false} onClick={() => navigate("/UserDashboard")} />
        <SidebarItem icon={<Building2 size={20} />} text="Facilities" active={true} />
        <SidebarItem icon={<Clipboard size={20} />} text="Bookings" active={false} onClick={() => navigate('/UserBookings')}/>
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
              <h1 className="font-inter font-bold text-[2rem] text-[#007BDA]">Facilities</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {(Array.isArray(facilities) ? facilities : []).map((f) => (
                <div key={f._id} className="bg-[#F7FBFF] rounded-[15px] shadow-md p-5 flex flex-col">
                  <img
                    src={
                      f.image
                        ? (f.image.startsWith('http') ? f.image : `${base}${f.image}`)
                        : '/placeholder.png'
                    }
                    className="w-full h-40 rounded-xl object-cover mb-4"
                    alt={f.name}
                  />
                  <div className="flex-1">
                    <p className="font-bold text-lg text-[#1A1A1A]">{f.name}</p>
                    <p className="text-gray-500 text-sm mb-2">{f.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-sm text-gray-600">Capacity: {f.capacity}</span>
                      <span className={`text-sm px-2 py-0.5 rounded ${f.status === 'active' ? 'bg-green-100 text-green-700' : f.status === 'inactive' ? 'bg-gray-100 text-gray-700' : 'bg-yellow-100 text-yellow-800'}`}>
                        {f.status}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => { setSelectedFacility(f); setModalOpen(true); }}
                    className="mt-4 relative overflow-hidden text-white px-6 py-2 rounded-full shadow group"
                  >
                    {/* base gradient layer */}
                    <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] transition-all duration-300 ease-in-out group-hover:opacity-0" />
                    {/* hover gradient layer (fades in) */}
                    <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
                    {/* button content */}
                    <span className="relative z-10 font-medium">Book</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Facilities;
