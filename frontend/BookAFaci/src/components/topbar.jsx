import React, { useState, useEffect } from "react";
import { Search, Bell } from "lucide-react";

function Topbar() {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    let last = localStorage.getItem('user');
    const id = setInterval(() => {
      const current = localStorage.getItem('user');
      if (current !== last) {
        last = current;
        try {
          setUser(current ? JSON.parse(current) : {});
        } catch {
          setUser({});
        }
      }
    }, 800); // poll every 800ms

    // Also listen for cross-document storage events
    const onStorage = (e) => {
      if (e.key === 'user') {
        try {
          setUser(e.newValue ? JSON.parse(e.newValue) : {});
        } catch {
          setUser({});
        }
      }
    };
    window.addEventListener('storage', onStorage);

    return () => {
      clearInterval(id);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

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
      <div className="flex items-center gap-1">

        {/* NOTIFICATION ICON*/}
        <button className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100 transition">
          <Bell size={20} className="text-gray-600" />
        </button>

        {/* PROFILE CIRCLE */}
        <div className="flex p-3 gap-3">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&background=c7d2fe&color=3730a3&bold=true`}
            alt=""
            className="w-10 h-10 rounded-[2rem]"
          />
          <div
            className={`
              flex justify-between items-center
          `}
          >
            {/* PROFILE TEXT */}
            <div className="leading-4">
              <h4 className="font-semibold">{user?.name}</h4>
              <span className="text-xs text-gray-600">{user?.email}</span>
            </div>
          </div>
        </div>
      </div>

    </nav>
  );
}

export default Topbar;