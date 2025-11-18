// import React, { useContext, createContext, useState, useEffect } from "react"
// import { useNavigate } from 'react-router'
// import { toast } from 'react-toastify'
import React from "react";
import { Search, Bell } from "lucide-react";

function Topbar() {
  return (
    <nav className="w-full bg-[#dbdbdb] h-[73px] rounded-b-[10px] sticky top-0 z-10 flex items-center justify-between px-6 shadow-md">

      {/* LEFT — SEARCH BAR */}
      <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm w-[350px]">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search"
          className="ml-2 w-full bg-transparent outline-none text-gray-700"
        />
      </div>

      {/* RIGHT — PROFILE AREA */}
      <div className="flex items-center gap-6">

        {/* NOTIFICATION ICON (MATCHES YOUR DESIGN) */}
        <button className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100 transition">
          <Bell size={20} className="text-gray-600" />
        </button>

        {/* PROFILE CIRCLE */}
        <div className="w-10 h-10 rounded-full bg-[#B5C6DB] flex items-center justify-center font-semibold text-gray-700">
          AP
        </div>

        {/* PROFILE TEXT */}
        <div className="leading-tight">
          <p className="font-semibold text-gray-800">Admin PPA</p>
          <p className="text-sm text-gray-600">admin@adnu.edu.ph</p>
        </div>
      </div>

    </nav>
  );
}

export default Topbar;
