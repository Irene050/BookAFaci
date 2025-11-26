import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Sidebar, { SidebarItem } from "../components/sidebar";
import Topbar from "../components/topbar";
import loginbg from "../assets/Gradient blur.png";

import {
  Building2,
  LayoutDashboard,
  GalleryVerticalEnd,
  ClipboardClock,
  SquareX, SquareCheck,
  Clipboard, Users
} from "lucide-react"

function AdminFacilities() {
  const navigate = useNavigate();
  {/*
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/");
  }, [navigate]);
*/}

  return (
    <div className="flex h-screen">
      <title>Facilities</title>

      {/* SIDEBAR */}
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
          backgroundImage: `linear-gradient(rgba(194, 217, 249, 0.9), rgba(194, 217, 249, 0.9)), url(${loginbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
          <Topbar />

        <div className="bg-gradient-to-b from-[#E0E0E0] via-[#DDF2FF] to-[#E0E0E0] rounded-[10px] p-[1px] mt-[20px]">
          <div className="rounded-[10px] p-10 mt-[20px]">
            <div className="flex items-center justify-between w-full mb-8">
              <h1 className="font-inter font-bold text-[2rem] text-[#007BDA]">Facilities Management</h1>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Facility cards would go here */}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminFacilities;
