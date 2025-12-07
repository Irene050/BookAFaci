// import React, { useEffect, useState } from "react"; 
// import { useNavigate } from "react-router";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Sidebar, { SidebarItem } from "../components/sidebar";
// import Topbar from "../components/topbar";
// import loginbg from "../assets/Gradient blur.png";
// import EquipmentModal from "../components/EquipmentModal";
// import { LayoutDashboard, Building2, Clipboard } from "lucide-react";

// const base = import.meta.env.VITE_API_URL || "";

// function Facilities() {
//   const navigate = useNavigate();
//   const [facilities, setFacilities] = useState([]);
//   const [equipments, setEquipments] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedFacility, setSelectedFacility] = useState(null);
//   const [showAll, setShowAll] = useState(false);

//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (!user) navigate("/login");
//   }, [navigate]);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await axios.get(`${base}/bookafaci/facility`);
//         const list = Array.isArray(res.data)
//           ? res.data
//           : Array.isArray(res.data?.facilities)
//             ? res.data.facilities
//             : Array.isArray(res.data?.data)
//               ? res.data.data
//               : [];
//         setFacilities(list);

//         const rRes = await axios.get(`${base}/bookafaci/equipment`).catch(() => ({ data: [] }));
//         const equipmentsList = Array.isArray(rRes.data) ? rRes.data : (rRes.data?.equipments || rRes.data?.data || []);
//         setEquipments(equipmentsList);
//       } catch (err) {
//         console.error("Failed to load facilities/equipments", err);
//       }
//     })();
//   }, []);

//   const handleBookingSubmit = async (payload) => {
//     try {
//       const userObj = JSON.parse(localStorage.getItem("user") || "null");
//       const userId = userObj?._id || userObj?.id || userObj?.user || null;
//       const equipmentIds = Array.isArray(payload.equipment) ? payload.equipment : [];

//       const facilityValue = (selectedFacility && typeof selectedFacility === 'object')
//         ? (selectedFacility._id || selectedFacility.name || selectedFacility)
//         : selectedFacility;

//       const body = {
//         user: userId,
//         facility: facilityValue,
//         equipments: equipmentIds,
//         startDate: payload.startDate,
//         endDate: payload.endDate,
//       };

//       await axios.post(`${base}/bookafaci/book`, body, { headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` } });
//       toast.success("Booking submitted");
//       setModalOpen(false);
//     } catch (err) {
//       console.error("Booking error:", err?.response?.data || err);
//       toast.error(err?.response?.data?.message || "Could not submit booking");
//     }
//   };

//   return (
//     <div className="flex min-h-screen overflow-hidden">
//       <title>Facilities</title>

//       <EquipmentModal
//         open={modalOpen}
//         facilityName={selectedFacility?.name || selectedFacility}
//         equipments={Array.isArray(equipments) ? equipments : []}
//         onClose={() => setModalOpen(false)}
//         onSubmit={handleBookingSubmit}
//       />

//       <Sidebar>
//         <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={false} onClick={() => navigate("/dashboard-ext")} />
//         <SidebarItem icon={<Building2 size={20} />} text="Facilities" active={true} onClick={() => navigate("/facilities-ext")} />
//         <SidebarItem icon={<Clipboard size={20} />} text="Bookings" active={false} onClick={() => navigate('/bookings-ext')} />
//       </Sidebar>

//       <main
//         className="flex-1 pl-6 pr-6 bg-center bg-cover min-h-screen relative pb-5 overflow-hidden"
//         style={{
//           paddingLeft: '5.5rem',
//           backgroundImage: `linear-gradient(rgba(194, 217, 249, 0.85), rgba(194, 217, 249, 0.85)), url(${loginbg})`,
//         }}
//       >
//         <Topbar />

//         <div className="bg-gradient-to-b from-[#E0E0E0] via-[#DDF2FF] to-[#E0E0E0] h-fit rounded-[10px] p-[1px] mt-[20px]">
//           <h1 className="pl-[35px] pt-[35px] mb-5 font-inter font-bold text-[2rem] text-[#007BDA]">Facilities</h1>

//           <div className="px-[45px] pb-[45px]">
//             {facilities.length === 0 ? (
//               <div className="text-gray-500">No facilities available</div>
//             ) : (
//               <>
//                 {/* ───────── HORIZONTAL SCROLL ───────── */}
//                 {!showAll && (
//                   <>
//                     <div className="flex gap-5 overflow-x-auto overflow-y-hidden pb-4">
//                       {facilities.map((f) => (
//                         <div
//                           key={f._id}
//                           className="bg-[#F7FBFF] rounded-[15px] shadow-md p-5 flex-shrink-0 flex flex-col"
//                           style={{ minWidth: "32%" }}
//                         >
//                           <img
//                             src={f.image ? (f.image.startsWith('http') ? f.image : `${base}${f.image}`) : '/placeholder.png'}
//                             className="w-full h-40 rounded-xl object-cover mb-4"
//                             alt={f.name}
//                           />
//                           <p className="font-bold text-lg">{f.name}</p>
//                           <p className="text-gray-500 text-sm mb-2">{f.description}</p>
//                           <div className="flex items-center gap-3 mt-2">
//                             <span className="text-sm text-gray-600">Capacity: {f.capacity}</span>
//                             <span className={`text-sm px-2 py-0.5 rounded ${f.status === 'active' ? 'bg-green-100 text-green-700' : f.status === 'inactive' ? 'bg-gray-100 text-gray-700' : 'bg-yellow-100 text-yellow-800'}`}>
//                               {f.status}
//                             </span>
//                           </div>

//                           <button
//                             onClick={() => { setSelectedFacility(f); setModalOpen(true); }}
//                             className="relative overflow-hidden text-white px-3 py-1 rounded-full shadow group mt-4"
//                           >
//                             <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] transition-all duration-300 ease-in-out group-hover:opacity-0" />
//                             <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
//                             <span className="relative z-10 font-medium">Book</span>
//                           </button>
//                         </div>
//                       ))}
//                     </div>

//                     {/* SEE MORE BUTTON */}
//                     {facilities.length > 3 && (
//                       <div className="mt-3 text-right">
//                         <button
//                           onClick={() => setShowAll(true)}
//                           className="relative overflow-hidden text-white px-3 py-1 rounded-full shadow group"
//                         >
//                           <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] transition-all duration-300 ease-in-out group-hover:opacity-0" />
//                           <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
//                           <span className="relative z-10 font-medium">See More</span>
//                         </button>
//                       </div>
//                     )}
//                   </>
//                 )}

//                 {/* ───────── FULL GRID ───────── */}
//                 {showAll && (
//                   <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
//                     {facilities.map((f) => (
//                       <div
//                         key={f._id}
//                         className="bg-[#F7FBFF] rounded-[15px] shadow-md p-5 flex flex-col"
//                       >
//                         <img
//                           src={f.image ? (f.image.startsWith('http') ? f.image : `${base}${f.image}`) : '/placeholder.png'}
//                           className="w-full h-40 rounded-xl object-cover mb-4"
//                           alt={f.name}
//                         />
//                         <p className="font-bold text-lg">{f.name}</p>
//                         <p className="text-gray-500 text-sm mb-2">{f.description}</p>
//                         <div className="flex items-center gap-3 mt-2">
//                           <span className="text-sm text-gray-600">Capacity: {f.capacity}</span>
//                           <span className={`text-sm px-2 py-0.5 rounded ${f.status === 'active' ? 'bg-green-100 text-green-700' : f.status === 'inactive' ? 'bg-gray-100 text-gray-700' : 'bg-yellow-100 text-yellow-800'}`}>
//                             {f.status}
//                           </span>
//                         </div>

//                         <button
//                           onClick={() => { setSelectedFacility(f); setModalOpen(true); }}
//                           className="relative overflow-hidden text-white px-3 py-1 rounded-full shadow group mt-4"
//                         >
//                           <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] transition-all duration-300 ease-in-out group-hover:opacity-0" />
//                           <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
//                           <span className="relative z-10 font-medium">Book</span>
//                         </button>
//                       </div>
//                     ))}

//                     {/* SEE LESS BUTTON */}
//                     {facilities.length > 3 && (
//                       <div className="col-span-full text-right mt-3">
//                         <button
//                           onClick={() => setShowAll(false)}
//                           className="relative overflow-hidden text-white px-3 py-1 rounded-full shadow group"
//                         >
//                           <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] transition-all duration-300 ease-in-out group-hover:opacity-0" />
//                           <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
//                           <span className="relative z-10 font-medium">See Less</span>
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Facilities;

// import React, { useEffect, useState } from "react"; 
// import { useNavigate } from "react-router";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Sidebar, { SidebarItem } from "../components/sidebar";
// import Topbar from "../components/topbar";
// import loginbg from "../assets/Gradient blur.png";
// import EquipmentModal from "../components/EquipmentModal";
// import { LayoutDashboard, Building2, Clipboard } from "lucide-react";

// const base = import.meta.env.VITE_API_URL || "";

// function Facilities() {
//   const navigate = useNavigate();
//   const [facilities, setFacilities] = useState([]);
//   const [equipments, setEquipments] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedFacility, setSelectedFacility] = useState(null);
//   const [showAll, setShowAll] = useState(false);

//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (!user) navigate("/login");
//   }, [navigate]);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await axios.get(`${base}/bookafaci/facility`);
//         const list = Array.isArray(res.data)
//           ? res.data
//           : Array.isArray(res.data?.facilities)
//             ? res.data.facilities
//             : Array.isArray(res.data?.data)
//               ? res.data.data
//               : [];
//         setFacilities(list);

//         const rRes = await axios.get(`${base}/bookafaci/equipment`).catch(() => ({ data: [] }));
//         const equipmentsList = Array.isArray(rRes.data) ? rRes.data : (rRes.data?.equipments || rRes.data?.data || []);
//         setEquipments(equipmentsList);
//       } catch (err) {
//         console.error("Failed to load facilities/equipments", err);
//       }
//     })();
//   }, []);

//   const handleBookingSubmit = async (payload) => {
//     try {
//       const userObj = JSON.parse(localStorage.getItem("user") || "null");
//       const userId = userObj?._id || userObj?.id || userObj?.user || null;
//       const equipmentIds = Array.isArray(payload.equipment) ? payload.equipment : [];

//       const facilityValue = (selectedFacility && typeof selectedFacility === 'object')
//         ? (selectedFacility._id || selectedFacility.name || selectedFacility)
//         : selectedFacility;

//       const body = {
//         user: userId,
//         facility: facilityValue,
//         equipments: equipmentIds,
//         startDate: payload.startDate,
//         endDate: payload.endDate,
//       };

//       await axios.post(`${base}/bookafaci/book`, body, { headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` } });
//       toast.success("Booking submitted");
//       setModalOpen(false);
//     } catch (err) {
//       console.error("Booking error:", err?.response?.data || err);
//       toast.error(err?.response?.data?.message || "Could not submit booking");
//     }
//   };

//   return (
//     <div className="flex min-h-screen overflow-hidden">
//       <title>Facilities</title>

//       <EquipmentModal
//         open={modalOpen}
//         facilityName={selectedFacility?.name || selectedFacility}
//         equipments={Array.isArray(equipments) ? equipments : []}
//         onClose={() => setModalOpen(false)}
//         onSubmit={handleBookingSubmit}
//       />

//       <Sidebar>
//         <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={false} onClick={() => navigate("/dashboard-ext")} />
//         <SidebarItem icon={<Building2 size={20} />} text="Facilities" active={true} onClick={() => navigate("/facilities-ext")} />
//         <SidebarItem icon={<Clipboard size={20} />} text="Bookings" active={false} onClick={() => navigate('/bookings-ext')} />
//       </Sidebar>

//       <main
//         className="flex-1 pl-6 pr-6 bg-center bg-cover min-h-screen relative pb-5 overflow-hidden"
//         style={{
//           paddingLeft: '5.5rem',
//           backgroundImage: `linear-gradient(rgba(194, 217, 249, 0.85), rgba(194, 217, 249, 0.85)), url(${loginbg})`,
//         }}
//       >
//         <Topbar />

//         <div className="bg-gradient-to-b from-[#E0E0E0] via-[#DDF2FF] to-[#E0E0E0] h-fit rounded-[10px] p-[1px] mt-[20px]">
//           <h1 className="pl-[35px] pt-[35px] mb-5 font-inter font-bold text-[2rem] text-[#007BDA]">Facilities</h1>

//           <div className="px-[45px] pb-[45px]">
//             {facilities.length === 0 ? (
//               <div className="text-gray-500">No facilities available</div>
//             ) : (
//               <>
//                 {!showAll && (
//                   <>
//                     <div className="flex gap-5 overflow-x-auto overflow-y-hidden pb-4">
//                       {facilities.map((f) => (
//                         <div
//                           key={f._id}
//                           className="bg-[#F7FBFF] rounded-[15px] shadow-md p-5 flex-shrink-0 flex flex-col"
//                           style={{ minWidth: "32%" }}
//                         >
//                           <img
//                             src={f.image ? (f.image.startsWith('http') ? f.image : `${base}${f.image}`) : '/placeholder.png'}
//                             className="w-full h-40 rounded-xl object-cover mb-4"
//                             alt={f.name}
//                           />
//                           <p className="font-bold text-lg">{f.name}</p>
//                           <p className="text-gray-500 text-sm mb-2">{f.description}</p>
//                           <div className="flex items-center gap-3 mt-2">
//                             <span className="text-sm text-gray-600">Capacity: {f.capacity}</span>
//                             <span className={`text-sm px-2 py-0.5 rounded ${f.status === 'active' ? 'bg-green-100 text-green-700' : f.status === 'inactive' ? 'bg-gray-100 text-gray-700' : 'bg-yellow-100 text-yellow-800'}`}>
//                               {f.status}
//                             </span>
//                           </div>

//                           <button
//                             onClick={() => { setSelectedFacility(f); setModalOpen(true); }}
//                             className="relative overflow-hidden text-white px-3 py-1 rounded-full shadow group mt-4"
//                           >
//                             <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] transition-all duration-300 ease-in-out group-hover:opacity-0" />
//                             <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
//                             <span className="relative z-10 font-medium">Book</span>
//                           </button>
//                         </div>
//                       ))}
//                     </div>

//                     {facilities.length > 3 && (
//                       <div className="mt-3 text-right">
//                         <button
//                           onClick={() => setShowAll(true)}
//                           className="relative overflow-hidden text-white px-3 py-1 rounded-full shadow group"
//                         >
//                           <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] transition-all duration-300 ease-in-out group-hover:opacity-0" />
//                           <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
//                           <span className="relative z-10 font-medium">See More</span>
//                         </button>
//                       </div>
//                     )}
//                   </>
//                 )}

//                 {showAll && (
//                   <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
//                     {facilities.map((f) => (
//                       <div
//                         key={f._id}
//                         className="bg-[#F7FBFF] rounded-[15px] shadow-md p-5 flex flex-col"
//                       >
//                         <img
//                           src={f.image ? (f.image.startsWith('http') ? f.image : `${base}${f.image}`) : '/placeholder.png'}
//                           className="w-full h-40 rounded-xl object-cover mb-4"
//                           alt={f.name}
//                         />
//                         <p className="font-bold text-lg">{f.name}</p>
//                         <p className="text-gray-500 text-sm mb-2">{f.description}</p>
//                         <div className="flex items-center gap-3 mt-2">
//                           <span className="text-sm text-gray-600">Capacity: {f.capacity}</span>
//                           <span className={`text-sm px-2 py-0.5 rounded ${f.status === 'active' ? 'bg-green-100 text-green-700' : f.status === 'inactive' ? 'bg-gray-100 text-gray-700' : 'bg-yellow-100 text-yellow-800'}`}>
//                             {f.status}
//                           </span>
//                         </div>

//                         <button
//                           onClick={() => { setSelectedFacility(f); setModalOpen(true); }}
//                           className="relative overflow-hidden text-white px-3 py-1 rounded-full shadow group mt-4"
//                         >
//                           <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] transition-all duration-300 ease-in-out group-hover:opacity-0" />
//                           <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
//                           <span className="relative z-10 font-medium">Book</span>
//                         </button>
//                       </div>
//                     ))}

//                     {facilities.length > 3 && (
//                       <div className="col-span-full text-right mt-3">
//                         <button
//                           onClick={() => setShowAll(false)}
//                           className="relative overflow-hidden text-white px-3 py-1 rounded-full shadow group"
//                         >
//                           <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] transition-all duration-300 ease-in-out group-hover:opacity-0" />
//                           <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
//                           <span className="relative z-10 font-medium">See Less</span>
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </>
//             )}
//           </div>

//           {/* ─────────────── EQUIPMENT SECTION ─────────────── */}
//           <h1 className="pl-[35px] pt-[10px] mb-5 font-inter font-bold text-[2rem] text-[#007BDA]">
//             Equipment
//           </h1>

//           <div className="px-[45px] pb-[45px]">
//             {equipments.length === 0 ? (
//               <div className="text-gray-500">No equipment available</div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
//                 {equipments.map((eq) => (
//                   <div
//                     key={eq._id}
//                     className="bg-[#F7FBFF] rounded-[15px] shadow-md p-5 flex flex-col"
//                   >
//                     <img
//                       src={
//                         eq.image
//                           ? (eq.image.startsWith("http") ? eq.image : `${base}${eq.image}`)
//                           : "/placeholder.png"
//                       }
//                       className="w-full h-40 rounded-xl object-cover mb-4"
//                       alt={eq.name}
//                     />

//                     <p className="font-bold text-lg">{eq.name}</p>
//                     <p className="text-gray-500 text-sm mb-2">{eq.description}</p>

//                     <div className="flex items-center gap-3 mt-2">
//                       <span className="text-sm text-gray-600">
//                         Qty: {eq.quantity}
//                       </span>

//                       <span
//                         className={`text-sm px-2 py-0.5 rounded ${
//                           eq.status === "available"
//                             ? "bg-green-100 text-green-700"
//                             : eq.status === "unavailable"
//                             ? "bg-red-100 text-red-700"
//                             : "bg-gray-100 text-gray-700"
//                         }`}
//                       >
//                         {eq.status}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//         </div>
//       </main>
//     </div>
//   );
// }

// export default Facilities;





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

  const [showAll, setShowAll] = useState(false);
  const [showEquipmentAll, setShowEquipmentAll] = useState(false); // ⭐ NEW

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    (async () => {
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

        const rRes = await axios.get(`${base}/bookafaci/equipment`).catch(() => ({ data: [] }));
        const equipmentsList = Array.isArray(rRes.data) ? rRes.data : (rRes.data?.equipments || rRes.data?.data || []);
        setEquipments(equipmentsList);
      } catch (err) {
        console.error("Failed to load facilities/equipments", err);
      }
    })();
  }, []);

  const handleBookingSubmit = async (payload) => {
    try {
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
    <div className="flex min-h-screen overflow-hidden">
      <title>Facilities</title>

      <EquipmentModal
        open={modalOpen}
        facilityName={selectedFacility?.name || selectedFacility}
        equipments={Array.isArray(equipments) ? equipments : []}
        onClose={() => setModalOpen(false)}
        onSubmit={handleBookingSubmit}
      />

      <Sidebar>
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={false} onClick={() => navigate("/dashboard-ext")} />
        <SidebarItem icon={<Building2 size={20} />} text="Facilities" active={true} onClick={() => navigate("/facilities-ext")} />
        <SidebarItem icon={<Clipboard size={20} />} text="Bookings" active={false} onClick={() => navigate('/bookings-ext')} />
      </Sidebar>

      <main
        className="flex-1 pl-6 pr-6 bg-center bg-cover min-h-screen relative pb-5 overflow-hidden"
        style={{
          paddingLeft: '5.5rem',
          backgroundImage: `linear-gradient(rgba(194, 217, 249, 0.85), rgba(194, 217, 249, 0.85)), url(${loginbg})`,
        }}
      >
        <Topbar />

        <div className="bg-gradient-to-b from-[#E0E0E0] via-[#DDF2FF] to-[#E0E0E0] h-fit rounded-[10px] p-[1px] mt-[20px]">
          <h1 className="pl-[35px] pt-[35px] mb-5 font-inter font-bold text-[2rem] text-[#007BDA]">Facilities</h1>

          <div className="px-[45px] pb-[45px]">
            {/* --------------------------------------------------
                     FACILITIES SECTION
            -------------------------------------------------- */}
            {!showAll ? (
              <>
                <div className="flex gap-5 overflow-x-auto overflow-y-hidden pb-4">
                  {facilities.map((f) => (
                    <div
                      key={f._id}
                      className="bg-[#F7FBFF] rounded-[15px] shadow-md p-5 flex-shrink-0 flex flex-col"
                      style={{ minWidth: "32%" }}
                    >
                      <img
                        src={f.image ? (f.image.startsWith('http') ? f.image : `${base}${f.image}`) : '/placeholder.png'}
                        className="w-full h-40 rounded-xl object-cover mb-4"
                        alt={f.name}
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

                      <button
                        onClick={() => { setSelectedFacility(f); setModalOpen(true); }}
                        className="relative overflow-hidden text-white px-3 py-1 rounded-full shadow group mt-4"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF]" />
                        <span className="relative z-10 font-medium">Book</span>
                      </button>
                    </div>
                  ))}
                </div>

                {facilities.length > 3 && (
                  <div className="mt-3 text-right">
                    <button
                      onClick={() => setShowAll(true)}
                      className="relative overflow-hidden text-white px-3 py-1 rounded-full shadow group"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF]" />
                      <span className="relative z-10 font-medium">See More</span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {facilities.map((f) => (
                  <div key={f._id} className="bg-[#F7FBFF] rounded-[15px] shadow-md p-5 flex flex-col">
                    <img
                      src={f.image ? (f.image.startsWith('http') ? f.image : `${base}${f.image}`) : '/placeholder.png'}
                      className="w-full h-40 rounded-xl object-cover mb-4"
                      alt={f.name}
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

                    <button
                      onClick={() => { setSelectedFacility(f); setModalOpen(true); }}
                      className="relative overflow-hidden text-white px-3 py-1 rounded-full shadow group mt-4"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF]" />
                      <span className="relative z-10 font-medium">Book</span>
                    </button>
                  </div>
                ))}

                <div className="col-span-full text-right mt-3">
                  <button
                    onClick={() => setShowAll(false)}
                    className="relative overflow-hidden text-white px-3 py-1 rounded-full shadow group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A]" />
                    <span className="relative z-10 font-medium">See Less</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* --------------------------------------------------
                     EQUIPMENT SECTION
          -------------------------------------------------- */}
          <h1 className="pl-[35px] pt-[10px] mb-5 font-inter font-bold text-[2rem] text-[#007BDA]">
            Equipment
          </h1>

          <div className="px-[45px] pb-[45px]">
            {!showEquipmentAll ? (
              <>
                <div className="flex gap-5 overflow-x-auto overflow-y-hidden pb-4">
                  {equipments.map((eq) => (
                    <div
                      key={eq._id}
                      className="bg-[#F7FBFF] rounded-[15px] shadow-md p-5 flex-shrink-0 flex flex-col"
                      style={{ minWidth: "32%" }}
                    >
                      <img
                        src={eq.image ? (eq.image.startsWith("http") ? eq.image : `${base}${eq.image}`) : "/placeholder.png"}
                        className="w-full h-40 rounded-xl object-cover mb-4"
                        alt={eq.name}
                      />
                      <p className="font-bold text-lg">{eq.name}</p>
                      <p className="text-gray-500 text-sm mb-2">{eq.description}</p>

                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-sm text-gray-600">Qty: {eq.quantity}</span>
                        <span className={`text-sm px-2 py-0.5 rounded ${
                          eq.status === "available" ? "bg-green-100 text-green-700" :
                          eq.status === "unavailable" ? "bg-red-100 text-red-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {eq.status}
                        </span>
                      </div>

                      {/* BOOK BUTTON FOR EQUIPMENT */}
                      <button
                        onClick={() => { setSelectedFacility(eq.name); setModalOpen(true); }}
                        className="relative overflow-hidden text-white px-3 py-1 rounded-full shadow group mt-4"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF]" />
                        <span className="relative z-10 font-medium">Book</span>
                      </button>
                    </div>
                  ))}
                </div>

                {equipments.length > 3 && (
                  <div className="mt-3 text-right">
                    <button
                      onClick={() => setShowEquipmentAll(true)}
                      className="relative overflow-hidden text-white px-3 py-1 rounded-full shadow group"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF]" />
                      <span className="relative z-10 font-medium">See More</span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
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
                    />

                    <p className="font-bold text-lg">{eq.name}</p>
                    <p className="text-gray-500 text-sm mb-2">{eq.description}</p>

                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-sm text-gray-600">Qty: {eq.quantity}</span>

                      <span
                        className={`text-sm px-2 py-0.5 rounded ${
                          eq.status === "available"
                            ? "bg-green-100 text-green-700"
                            : eq.status === "unavailable"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {eq.status}
                      </span>
                    </div>

                    {/* BOOK BUTTON */}
                    <button
                      onClick={() => { setSelectedFacility(eq.name); setModalOpen(true); }}
                      className="relative overflow-hidden text-white px-3 py-1 rounded-full shadow group mt-4"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF]" />
                      <span className="relative z-10 font-medium">Book</span>
                    </button>
                  </div>
                ))}

                <div className="col-span-full text-right mt-3">
                  <button
                    onClick={() => setShowEquipmentAll(false)}
                    className="relative overflow-hidden text-white px-3 py-1 rounded-full shadow group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A]" />
                    <span className="relative z-10 font-medium">See Less</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

export default Facilities;
