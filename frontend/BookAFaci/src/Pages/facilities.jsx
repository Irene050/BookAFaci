// // import { useEffect } from 'react';
// // import { useNavigate } from 'react-router';
// // import { toast } from 'react-toastify';
// // import Sidebar, { SidebarItem } from '../components/sidebar';
// // import {
// //   Building2,
// //   LayoutDashboard,
// // } from "lucide-react"

// // function facilities() {
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         const user = localStorage.getItem('user');
// //         if (!user) {
// //           navigate('/');
// //         }
// //       }, [navigate]);
    
// //       const user = JSON.parse(localStorage.getItem('user') || '{}');
    
// //       const handleLogout = () => {
// //         localStorage.removeItem('user');
// //         localStorage.removeItem('token');
// //         toast.info('You have been logged out', {
// //           position: "top-right",
// //           autoClose: 1000,
// //         });
// //         navigate('/');
// //       };

// //   return (
// //     <div className="flex h-screen">
// //         <title>Facilities</title>
// //         <Sidebar>
// //             <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={false} onClick={() => navigate('/dashboard')} />
// //             <SidebarItem icon={<Building2 size={20} />} text="Facilities" active={true} onClick={() => navigate('/facilities')} />
// //         </Sidebar>
        
// //         <main className="flex-1 p-6">
// //         <h1 className="text-2xl font-bold">Facilities</h1>
// //       </main>
// //     </div>
// //   )
// // }

// // export default facilities

import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Sidebar, { SidebarItem } from "../components/sidebar";
import Topbar from "../components/topbar";
import loginbg from "../assets/Gradient blur.png";

import {
  LayoutDashboard,
  Building2,
  Search,
  Plus,
} from "lucide-react";

function Facilities() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/");
  }, [navigate]);

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
        className="flex-1 pl-6 pr-6 h-full bg-center bg-cover"
        style={{
          backgroundImage: `linear-gradient(rgba(194, 217, 249, 0.85), rgba(194, 217, 249, 0.85)), url(${loginbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* TOPBAR */}
        <Topbar />

        {/* MAIN PANEL */}
        <div className="bg-gradient-to-b from-[#E0E0E0] via-[#DDF2FF] to-[#E0E0E0] rounded-[10px] p-[1px] mt-[20px] min-h-[90%]">
          <div className="bg-gradient-to-b from-[#E0E0E0] via-[#DDF2FF] to-[#E0E0E0] rounded-[10px] p-10 mt-[20px]">

            {/* HEADER + SEARCH */}
            <div className="flex items-center justify-between w-full mb-8">
              <h1 className="font-inter font-bold text-[2rem] text-[#007BDA]">
                Facilities
              </h1>
            </div>

            {/* CONTENT AREA */}
            <div className="grid grid-cols-[1fr_2fr] gap-10">

              {/* LEFT BLANK PANEL */}
              <div className="bg-[#F7FBFF] rounded-[15px] h-[550px] shadow-md"></div>

              {/* RIGHT — FACILITY LIST */}
              <div className="flex flex-col gap-6">

                {/* FACILITY CARD 1 */}
                <div className="bg-[#F7FBFF] rounded-[15px] shadow-md p-5 flex gap-5 items-start">
                  <img
                    src="https://images.unsplash.com/photo-1582582494700-1c7b810f0b8a"
                    className="w-[180px] h-[150px] rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-lg text-[#1A1A1A]">
                      Xavier Grounds
                    </p>
                    <p className="text-gray-500 text-sm mb-2">
                      Ateneo De Naga University in front of Xavier Hall
                    </p>
                    <p className="font-semibold text-gray-700">Facility</p>
                    <p className="text-sm text-gray-600">250 Pax</p>
                    <p className="text-sm text-gray-600">Big Space</p>
                  </div>

                  <button className="bg-[#007BDA] text-white px-6 py-2 rounded-full shadow hover:bg-[#0069b8] transition">
                    Book Now
                  </button>
                </div>

                {/* FACILITY CARD 2 */}
                <div className="bg-[#F7FBFF] rounded-[15px] shadow-md p-5 flex gap-5 items-start">
                  <img
                    src="https://images.unsplash.com/photo-1582582494700-1c7b810f0b8a"
                    className="w-[180px] h-[150px] rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-lg text-[#1A1A1A]">
                      Alingal Convention Hall
                    </p>
                    <p className="text-gray-500 text-sm mb-2">
                      Ateneo De Naga University 5th floor Alingal Building
                    </p>
                    <p className="font-semibold text-gray-700">Facility</p>
                    <p className="text-sm text-gray-600">250 Pax</p>
                    <p className="text-sm text-gray-600">Big Space</p>
                  </div>

                  <button className="bg-[#007BDA] text-white px-6 py-2 rounded-full shadow hover:bg-[#0069b8] transition">
                    Book Now
                  </button>
                </div>

                {/* ADD FACILITIES */}
                <div className="border-2 border-dashed border-[#84B6F4] p-10 rounded-[15px] bg-[#F7FBFF] text-center shadow-sm hover:scale-[1.01] transition">
                  <button className="flex items-center justify-center gap-3 text-[#007BDA]">
                    <Plus size={28} />
                    <span className="font-semibold text-lg">
                      Add Facilities
                    </span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Facilities;

// import { useEffect } from "react";
// import { useNavigate } from "react-router";
// import {
//   Bell,
//   Search,
//   Plus
// } from "lucide-react";
// import Sidebar from "../components/sidebar";

// export default function Facilities() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (!user) navigate("/");
//   }, [navigate]);

//   return (
//     <div className="flex h-screen bg-[#f1f5f9]">
//       <Sidebar />

//       {/* Right Content */}
//       <div className="w-full flex flex-col">

//         {/* TOP BAR */}
//         <div className="flex items-center justify-between px-8 py-4 bg-[#dce3ea] shadow-md">
//           {/* Search */}
//           <div className="flex items-center w-[350px] bg-white px-3 py-2 rounded-xl shadow-sm">
//             <Search className="text-gray-400" size={18} />
//             <input
//               type="text"
//               placeholder="Search"
//               className="ml-2 w-full outline-none"
//             />
//           </div>

//           {/* User Section */}
//           <div className="flex items-center gap-6">

//             <Bell className="text-gray-600" size={22} />

//             <div className="flex items-center gap-3">
//               {/* User Circle */}
//               <div className="w-10 h-10 rounded-full border flex items-center justify-center text-gray-700">
//                 AP
//               </div>

//               <div>
//                 <p className="font-semibold text-gray-900 text-sm">Admin PPA</p>
//                 <p className="text-xs text-gray-600">admin@gbox.adzu.edu.ph</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* CONTENT */}
//         <div className="p-8">
//           <h1 className="text-3xl font-bold text-[#1d4e89] mb-6">Facilities</h1>

//           <div className="bg-gradient-to-b from-[#edf4fb] to-[#d6ecff] p-6 rounded-2xl shadow-inner">

//             {/* COLUMN LAYOUT */}
//             <div className="grid grid-cols-2 gap-8">

//               {/* Left empty white box */}
//               <div className="bg-white rounded-2xl shadow-md h-[600px]"></div>

//               {/* RIGHT SIDE FACILITIES */}
//               <div className="flex flex-col gap-6">

//                 {/* Facility Card 1 */}
//                 <div className="bg-white p-5 rounded-2xl shadow-md flex gap-6 items-start">
//                   <img
//                     src="/images/faci1.jpg"
//                     alt=""
//                     className="w-52 h-40 rounded-xl object-cover"
//                   />

//                   <div className="flex-1">
//                     <h2 className="font-bold text-lg">Xavier Grounds</h2>
//                     <p className="text-sm text-gray-600">
//                       Ateneo De Naga University in front of Xavier hall
//                     </p>

//                     <p className="mt-3 text-sm">
//                       <span className="font-semibold">Facility</span> <br />
//                       250-Pax <br />
//                       Big Space
//                     </p>
//                   </div>

//                   <button className="bg-[#204d86] hover:bg-[#1a3d6a] text-white px-6 py-2 rounded-full shadow-md">
//                     Book Now
//                   </button>
//                 </div>

//                 {/* Facility Card 2 */}
//                 <div className="bg-white p-5 rounded-2xl shadow-md flex gap-6 items-start">
//                   <img
//                     src="/images/faci2.jpg"
//                     alt=""
//                     className="w-52 h-40 rounded-xl object-cover"
//                   />

//                   <div className="flex-1">
//                     <div className="w-40 h-3 bg-gray-300 rounded"></div>
//                     <div className="mt-3 space-y-2">
//                       <div className="w-24 h-3 bg-gray-300 rounded"></div>
//                       <div className="w-16 h-3 bg-gray-300 rounded"></div>
//                       <div className="w-20 h-3 bg-gray-300 rounded"></div>
//                     </div>
//                   </div>

//                   <button className="bg-[#204d86] hover:bg-[#1a3d6a] text-white px-6 py-2 rounded-full shadow-md">
//                     Book Now
//                   </button>
//                 </div>

//                 {/* Add Facilities */}
//                 <div className="border border-dashed border-[#71a6da] bg-[#eef7ff] h-40 rounded-2xl flex items-center justify-center">
//                   <div className="flex items-center gap-3 text-[#1d4e89] text-lg">
//                     <Plus size={35} />
//                     Add Facilities
//                   </div>
//                 </div>

//               </div>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }
