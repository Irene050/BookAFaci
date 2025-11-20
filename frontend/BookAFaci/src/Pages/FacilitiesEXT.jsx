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
        className="flex-1 pl-6 pr-6 bg-center bg-cover h-full relative pb-5"
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