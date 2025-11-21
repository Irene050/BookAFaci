// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
// import Sidebar, { SidebarItem } from "../components/sidebar";
// import Topbar from "../components/topbar";
// import loginbg from "../assets/Gradient blur.png";

// import { LayoutDashboard, Building2, Plus } from "lucide-react";

// // ⭐ RESOURCE MODAL COMPONENT
// function ResourceModal({ open, onClose, onSubmit, facilityName }) {
//   const [resources, setResources] = useState({
//     chairs: 0,
//     tables: 0,
//     speakers: 0,
//     projector: 0,
//   });

//   if (!open) return null;

//   const updateResource = (type, amount) => {
//     setResources((prev) => ({
//       ...prev,
//       [type]: Math.max(prev[type] + amount, 0),
//     }));
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//       <div className="bg-white w-[450px] p-6 rounded-xl shadow-lg">
//         <h2 className="text-xl font-bold text-[#007BDA] mb-4">
//           Add Resources – {facilityName}
//         </h2>

//         {/* RESOURCE LIST */}
//         <div className="flex flex-col gap-4">
//           {Object.keys(resources).map((item) => (
//             <div key={item} className="flex justify-between items-center">
//               <span className="capitalize font-medium">{item}</span>

//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => updateResource(item, -1)}
//                   className="px-3 py-1 bg-gray-200 rounded-md"
//                 >
//                   -
//                 </button>
//                 <span>{resources[item]}</span>
//                 <button
//                   onClick={() => updateResource(item, 1)}
//                   className="px-3 py-1 bg-[#007BDA] text-white rounded-md"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* FOOTER BUTTONS */}
//         <div className="flex justify-end gap-3 mt-6">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-300 rounded-md"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={() => onSubmit(resources)}
//             className="px-4 py-2 bg-[#007BDA] text-white rounded-md"
//           >
//             Continue
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Facilities() {
//   const navigate = useNavigate();

//   // ⭐ ADDED STATE FOR RESOURCE MODAL
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedFacility, setSelectedFacility] = useState(null);

//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (!user) navigate("/");
//   }, [navigate]);

//   return (
//     <div className="flex h-screen">
//       <title>Facilities</title>

//       {/* SIDEBAR */}
//       <Sidebar>
//         <SidebarItem
//           icon={<LayoutDashboard size={20} />}
//           text="Dashboard"
//           active={false}
//           onClick={() => navigate("/dashboard")}
//         />
//         <SidebarItem
//           icon={<Building2 size={20} />}
//           text="Facilities"
//           active={true}
//           onClick={() => navigate("/facilities")}
//         />
//       </Sidebar>

//       {/* MAIN */}
//       <main
//         className="flex-1 pl-6 pr-6 bg-center bg-cover h-full relative pb-5"
//         style={{
//           backgroundImage: `linear-gradient(rgba(194, 217, 249, 0.85), rgba(194, 217, 249, 0.85)), url(${loginbg})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         {/* TOPBAR */}
//         <Topbar />

//         {/* MAIN PANEL */}
//         <div className="bg-gradient-to-b from-[#E0E0E0] via-[#DDF2FF] to-[#E0E0E0] rounded-[10px] p-[1px] mt-[20px] min-h-[90%]">
//           <div className="bg-gradient-to-b from-[#E0E0E0] via-[#DDF2FF] to-[#E0E0E0] rounded-[10px] p-10 mt-[20px]">

//             {/* HEADER */}
//             <div className="flex items-center justify-between w-full mb-8">
//               <h1 className="font-inter font-bold text-[2rem] text-[#007BDA]">
//                 Facilities
//               </h1>
//             </div>

//             {/* CONTENT AREA */}
//             <div className="grid grid-cols-[1fr_2fr] gap-10">

//               {/* LEFT BLANK PANEL */}
//               <div className="bg-[#F7FBFF] rounded-[15px] h-[550px] shadow-md"></div>

//               {/* RIGHT — FACILITY LIST */}
//               <div className="flex flex-col gap-6">

//                 {/* FACILITY CARD 1 */}
//                 <div className="bg-[#F7FBFF] rounded-[15px] shadow-md p-5 flex gap-5 items-start">
//                   <img
//                     src="https://images.unsplash.com/photo-1582582494700-1c7b810f0b8a"
//                     className="w-[180px] h-[150px] rounded-xl object-cover"
//                   />
//                   <div className="flex-1">
//                     <p className="font-bold text-lg text-[#1A1A1A]">
//                       Xavier Grounds
//                     </p>
//                     <p className="text-gray-500 text-sm mb-2">
//                       Ateneo De Naga University in front of Xavier Hall
//                     </p>
//                     <p className="font-semibold text-gray-700">Facility</p>
//                     <p className="text-sm text-gray-600">250 Pax</p>
//                     <p className="text-sm text-gray-600">Big Space</p>
//                   </div>

//                   <button
//                     className="bg-[#007BDA] text-white px-6 py-2 rounded-full shadow hover:bg-[#0069b8] transition"
//                     onClick={() => {
//                       setSelectedFacility("Xavier Grounds");
//                       setModalOpen(true);
//                     }}
//                   >
//                     Book Now
//                   </button>
//                 </div>

//                 {/* FACILITY CARD 2 */}
//                 <div className="bg-[#F7FBFF] rounded-[15px] shadow-md p-5 flex gap-5 items-start">
//                   <img
//                     src="https://images.unsplash.com/photo-1582582494700-1c7b810f0b8a"
//                     className="w-[180px] h-[150px] rounded-xl object-cover"
//                   />
//                   <div className="flex-1">
//                     <p className="font-bold text-lg text-[#1A1A1A]">
//                       Alingal Convention Hall
//                     </p>
//                     <p className="text-gray-500 text-sm mb-2">
//                       Ateneo De Naga University 5th floor Alingal Building
//                     </p>
//                     <p className="font-semibold text-gray-700">Facility</p>
//                     <p className="text-sm text-gray-600">250 Pax</p>
//                     <p className="text-sm text-gray-600">Big Space</p>
//                   </div>

//                   <button
//                     className="bg-[#007BDA] text-white px-6 py-2 rounded-full shadow hover:bg-[#0069b8] transition"
//                     onClick={() => {
//                       setSelectedFacility("Alingal Convention Hall");
//                       setModalOpen(true);
//                     }}
//                   >
//                     Book Now
//                   </button>
//                 </div>

//                 {/* ADD FACILITIES BUTTON
//                 <div className="border-2 border-dashed border-[#84B6F4] p-10 rounded-[15px] bg-[#F7FBFF] text-center shadow-sm hover:scale-[1.01] transition">
//                   <button className="flex items-center justify-center gap-3 text-[#007BDA]">
//                     <Plus size={28} />
//                     <span className="font-semibold text-lg">
//                       Add Facilities
//                     </span>
//                   </button>
//                 </div> */}

//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ⭐ RESOURCE MODAL */}
//         <ResourceModal
//           open={modalOpen}
//           facilityName={selectedFacility}
//           onClose={() => setModalOpen(false)}
//           onSubmit={(resources) => {
//             console.log("Selected facility:", selectedFacility);
//             console.log("Selected resources:", resources);

//             // 👉 you can navigate to booking page here:
//             // navigate("/booking", { state: { selectedFacility, resources } });

//             setModalOpen(false);
//           }}
//         />
//       </main>
//     </div>
//   );
// }

// export default Facilities;







// Facilities.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Sidebar, { SidebarItem } from "../components/sidebar";
import Topbar from "../components/topbar";
import loginbg from "../assets/Gradient blur.png";

import { LayoutDashboard, Building2, Plus } from "lucide-react";

function ResourceModal({ open, onClose, onSubmit, facilityName, initialResources }) {
  const defaultResources = initialResources || {
    chairs: 0,
    tables: 0,
    speakers: 0,
    projector: 0,
  };

  const [resources, setResources] = useState(defaultResources);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    // Reset when opened
    if (open) {
      setResources(defaultResources);
      setDate("");
      setTime("");
      setNotes("");
    }
  
  }, [open]);

  const resourceImages = {
    chairs:
      "https://mixmeetings.com/wp-content/uploads/2021/04/Conference-chairs.jpeg",
    tables:
      "https://i.pinimg.com/originals/c0/6b/11/c06b115b04c3d6be8b0fd0a7d2d70acb.jpg",
    speakers:
      "https://tse4.mm.bing.net/th/id/OIP.qT0RF6dP1qY2B9HI01nvDwHaFF?w=600&h=412&rs=1&pid=ImgDetMain&o=7&rm=3",
    projector:
      "https://static.vecteezy.com/system/resources/previews/008/199/374/large_2x/close-up-the-lens-of-the-projector-with-light-for-presentation-in-a-dark-room-presention-free-photo.jpg",
  };

  const friendlyName = {
    chairs: "Chairs",
    tables: "Tables",
    speakers: "Speakers",
    projector: "Projector",
  };

  const updateResource = (type, delta) => {
    setResources((prev) => ({
      ...prev,
      [type]: Math.max((prev[type] || 0) + delta, 0),
    }));
  };

  const totalItems = Object.values(resources).reduce((s, v) => s + Number(v || 0), 0);

  const canBook = totalItems > 0 && date && time;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
     
      <div className="bg-white w-full max-w-[1100px] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h3 className="text-2xl font-extrabold text-[#007BDA]">
              Would you like to add resources?
            </h3>
            <p className="text-sm text-gray-600">{facilityName}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>

        {/* Body: left resources / right summary */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: resources (scrollable grid) */}
          <div className="w-2/3 p-6 overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(resources).map((key) => (
                <div
                  key={key}
                  className="bg-[#F7FBFF] rounded-xl p-3 shadow-sm flex flex-col"
                >
                  <img
                    src={resourceImages[key]}
                    alt={key}
                    className="w-full h-36 object-cover rounded-lg"
                  />
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="capitalize font-semibold text-gray-800">
                        {friendlyName[key]}
                      </p>
                      <p className="text-xs text-gray-500">Add how many you need</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateResource(key, -1)}
                        className="w-9 h-9 rounded-md bg-gray-200 flex items-center justify-center text-lg"
                        aria-label={`decrease ${key}`}
                      >
                        −
                      </button>

                      <div className="w-10 text-center font-semibold">{resources[key]}</div>

                      <button
                        onClick={() => updateResource(key, 1)}
                        className="w-9 h-9 rounded-md bg-[#007BDA] text-white flex items-center justify-center text-lg"
                        aria-label={`increase ${key}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: live summary (cart-style list) */}
          <div className="w-1/3 p-6 border-l bg-gradient-to-b from-white to-gray-50 overflow-auto">
            <h4 className="text-lg font-bold text-gray-800 mb-3">Order Summary</h4>

            {/* Cart-like list */}
            <div className="space-y-2">
              {Object.keys(resources).map((key) => {
                const count = Number(resources[key] || 0);
                if (count <= 0) return null;
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm"
                  >
                    <div>
                      <div className="font-semibold text-gray-800">
                        {friendlyName[key]}
                      </div>
                      <div className="text-xs text-gray-500">{count} item{count>1 ? "s" : ""}</div>
                    </div>

                    <div className="text-gray-700 font-semibold">{count}</div>
                  </div>
                );
              })}

              {totalItems === 0 && (
                <div className="text-sm text-gray-500 italic">No resources selected</div>
              )}
            </div>

            {/* Divider */}
            <div className="mt-4 border-t pt-4">
              <div className="flex items-center justify-between">
                <div className="text-gray-600">Total items</div>
                <div className="font-bold text-gray-800">{totalItems}</div>
              </div>
            </div>

            {/* Date & Time inputs */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Available Date
              </label>
              <input
                type="date"
                className="w-full mt-1 p-2 rounded-md border"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <label className="block text-sm font-medium text-gray-700 mt-3">
                Time
              </label>
              <input
                type="time"
                className="w-full mt-1 p-2 rounded-md border"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Optional: special instructions"
                className="w-full mt-1 p-2 rounded-md border h-20 resize-none"
              />
            </div>

            {/* Bottom actions */}
            <div className="mt-6 space-y-2">
              <button
                disabled={!canBook}
                onClick={() =>
                  onSubmit({
                    facilityName,
                    resources,
                    date,
                    time,
                    notes,
                  })
                }
                className={`w-full py-3 rounded-lg font-bold text-white transition ${
                  canBook ? "bg-[#ffcc00] hover:brightness-95" : "bg-gray-300 cursor-not-allowed"
                }`}
                aria-disabled={!canBook}
              >
                Book Now
              </button>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-lg font-bold bg-white border border-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Facilities() {
  const navigate = useNavigate();

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/");
  }, [navigate]);

  // handle submit from modal
  const handleBookingSubmit = (payload) => {
    // Example payload structure:
    // { facilityName, resources, date, time, notes }
    console.log("Booking payload:", payload);

    alert(
      `Booking received for ${payload.facilityName}\nDate: ${payload.date} ${payload.time}\nItems: ${Object.entries(
        payload.resources
      )
        .map(([k, v]) => `${k}: ${v}`)
        .filter((s) => !s.endsWith(": 0"))
        .join(", ")}\nNotes: ${payload.notes || "None"}`
    );

    setModalOpen(false);
  };

  return (
    <div className="flex h-screen">
      <title>Facilities</title>

      {/* SIDEBAR */}
      <Sidebar>
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={false} onClick={() => navigate("/dashboard")} />
        <SidebarItem icon={<Building2 size={20} />} text="Facilities" active={true} onClick={() => navigate("/facilities")} />
      </Sidebar>

      {/* MAIN */}
      <main
        className="flex-1 pl-6 pr-6 bg-center bg-cover h-full relative pb-5"
        style={{
          backgroundImage: `linear-gradient(rgba(194, 217, 249, 0.85), rgba(194, 217, 249, 0.85)), url(${loginbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Topbar />

        <div className="bg-gradient-to-b from-[#E0E0E0] via-[#DDF2FF] to-[#E0E0E0] rounded-[10px] p-[1px] mt-[20px] min-h-[90%]">
          <div className="bg-gradient-to-b from-[#E0E0E0] via-[#DDF2FF] to-[#E0E0E0] rounded-[10px] p-10 mt-[20px]">
            <div className="flex items-center justify-between w-full mb-8">
              <h1 className="font-inter font-bold text-[2rem] text-[#007BDA]">Facilities</h1>
            </div>

            <div className="grid grid-cols-[1fr_2fr] gap-10">
              <div className="bg-[#F7FBFF] rounded-[15px] h-[550px] shadow-md"></div>

              <div className="flex flex-col gap-6">
                {/* FACILITY CARD 1 */}
                <div className="bg-[#F7FBFF] rounded-[15px] shadow-md p-5 flex gap-5 items-start">
                  <img
                    src="https://th.bing.com/th/id/R.0906d93a9bad0dc9afe3da46206fdc37?rik=%2fFd2fWDcLfIUyw&riu=http%3a%2f%2f4.bp.blogspot.com%2f_8EuANYHPvas%2fSM0wmwQN6AI%2fAAAAAAAADbw%2fZLfEdD8Uan4%2fs400%2fw2.jpg&ehk=jz1walLmjDyOfBz75avbLfbCPssEPdRrEMEX1W%2biBUI%3d&risl=&pid=ImgRaw&r=0"
                    className="w-[180px] h-[150px] rounded-xl object-cover"
                    alt="Xavier Grounds"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-lg text-[#1A1A1A]">Xavier Grounds</p>
                    <p className="text-gray-500 text-sm mb-2">Ateneo De Naga University in front of Xavier Hall</p>
                    <p className="font-semibold text-gray-700">Facility</p>
                    <p className="text-sm text-gray-600">250 Pax</p>
                    <p className="text-sm text-gray-600">Big Space</p>
                  </div>

                  <button
                    className="bg-[#007BDA] text-white px-6 py-2 rounded-full shadow hover:bg-[#0069b8] transition"
                    onClick={() => {
                      setSelectedFacility("Xavier Grounds");
                      setModalOpen(true);
                    }}
                  >
                    Add Resources
                  </button>
                </div>

                {/* FACILITY CARD 2 */}
                <div className="bg-[#F7FBFF] rounded-[15px] shadow-md p-5 flex gap-5 items-start">
                  <img
                    src="https://tse3.mm.bing.net/th/id/OIP.sHbMTFqQTCH12EDM1bIkMgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"
                    className="w-[180px] h-[150px] rounded-xl object-cover"
                    alt="Alingal Convention Hall"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-lg text-[#1A1A1A]">Alingal Convention Hall</p>
                    <p className="text-gray-500 text-sm mb-2">Ateneo De Naga University 5th floor Alingal Building</p>
                    <p className="font-semibold text-gray-700">Facility</p>
                    <p className="text-sm text-gray-600">250 Pax</p>
                    <p className="text-sm text-gray-600">Big Space</p>
                  </div>

                  <button
                    className="bg-[#007BDA] text-white px-6 py-2 rounded-full shadow hover:bg-[#0069b8] transition"
                    onClick={() => {
                      setSelectedFacility("Alingal Convention Hall");
                      setModalOpen(true);
                    }}
                  >
                    Add Resources
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RESOURCE MODAL (kiosk-style) */}
        <ResourceModal
          open={modalOpen}
          facilityName={selectedFacility}
          onClose={() => setModalOpen(false)}
          onSubmit={handleBookingSubmit}
        />
      </main>
    </div>
  );
}

export default Facilities;
