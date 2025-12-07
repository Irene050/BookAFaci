import React, { useState, useEffect, useRef } from "react";
import { useLocation } from 'react-router';
import { Search, Bell } from "lucide-react";
import axios from "axios";

const base = import.meta.env.VITE_API_URL || "";

function Topbar({ searchValue = '', onSearchChange, onFilterClick }) {
  const location = useLocation();
  const showSearch = ['/UserBookings', '/adminusers', '/adminbks'].includes(location?.pathname);
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifs, setLoadingNotifs] = useState(false);
  const [notifError, setNotifError] = useState(null);

  const containerRef = useRef(null);

  useEffect(() => {
    // keep local user in sync if auth updates elsewhere
    const onStorage = (e) => {
      if (e.key === "user") {
        try {
          setUser(e.newValue ? JSON.parse(e.newValue) : {});
        } catch {
          setUser({});
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // fetch notifications from backend routes
  useEffect(() => {
    if (!notifOpen) return;
    const fetchNotifs = async () => {
      setLoadingNotifs(true);
      setNotifError(null);
      try {
        const userId = user?._id || user?.id;
        if (!userId) {
          setNotifications([]);
          setLoadingNotifs(false);
          return;
        }

        const url = `${base}/bookafaci/dashboard/notifications/${userId}`;
        const res = await axios.get(url);
        const data = res?.data || {};

        const upcoming = Array.isArray(data.upcomingBookings) ? data.upcomingBookings : [];
        const cancelled = Array.isArray(data.recentCancellations) ? data.recentCancellations : [];

        // normalize val to simple array for rendering
        const upNotifs = upcoming.map((b) => ({
          _id: b._id,
          type: "upcoming",
          title: b.facility?.name || (typeof b.facility === "string" ? b.facility : "Upcoming booking"),
          body: `${new Date(b.startDate).toLocaleString()} → ${new Date(b.endDate).toLocaleString()}`,
          createdAt: b.startDate,
          booking: b,
        }));

        const cancelNotifs = cancelled.map((b) => ({
          _id: b._id,
          type: "cancelled",
          title: "Booking cancelled",
          body: `${b.facility?.name || b.facility || ""} — ${new Date(b.updatedAt || b.endDate).toLocaleString()}`,
          createdAt: b.updatedAt || b.endDate,
          booking: b,
        }));

        setNotifications([...upNotifs, ...cancelNotifs]);
      } catch (err) {
        console.error("Failed to load notifications", err?.response?.data || err);
        setNotifError("Failed to load notifications");
        setNotifications([]);
      } finally {
        setLoadingNotifs(false);
      }
    };

    fetchNotifs();
  }, [notifOpen, user]);

  const clearNotifications = () => {
    setNotifications([]);
    //API call to mark read/clear on server
  };

  return (
    <nav className="w-full bg-[#dbdbdb8f] h-[73px] rounded-b-[10px] sticky top-0 z-[20] flex items-center justify-between px-6 shadow-md backdrop-blur-sm font-inter
      min-[320px]:h-[60px] min-[320px]:px-2
      min-[375px]:h-[65px] min-[375px]:px-3
      min-[425px]:px-4
      sm:h-[68px] sm:px-5
      md:h-[73px] md:px-6">
      <div className="flex-1 min-w-0">
        {showSearch && (
          <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm max-w-[350px] gap-2
            min-[320px]:max-w-[140px] min-[320px]:px-1.5 min-[320px]:py-1 min-[320px]:gap-1
            min-[375px]:max-w-[170px] min-[375px]:px-2 min-[375px]:gap-1.5
            min-[425px]:max-w-[220px] min-[425px]:px-3 min-[425px]:gap-2
            sm:max-w-[260px] sm:px-3
            md:max-w-[300px] md:px-4
            lg:max-w-[350px]">
            <Search size={18} className="text-gray-500 flex-shrink-0
              min-[320px]:w-3.5 min-[320px]:h-3.5
              min-[375px]:w-4 min-[375px]:h-4
              sm:w-[18px] sm:h-[18px]" />
            <input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              className="ml-2 flex-1 min-w-0 bg-transparent outline-none text-gray-700
                min-[320px]:text-[10px] min-[320px]:ml-0.5 min-[320px]:placeholder:text-[10px]
                min-[375px]:text-xs min-[375px]:ml-1
                min-[425px]:text-sm min-[425px]:ml-1.5
                sm:text-sm sm:ml-2
                md:text-base
                lg:placeholder:text-[0.9rem]"
            />
            <button
              type="button"
              onClick={() => onFilterClick && onFilterClick()}
              className="relative overflow-hidden text-white px-3 py-1 rounded-full shadow group text-sm flex-shrink-0
                min-[320px]:px-1.5 min-[320px]:py-0.5 min-[320px]:text-[10px]
                min-[375px]:px-2 min-[375px]:py-0.5 min-[375px]:text-[10px]
                min-[425px]:px-2 min-[425px]:py-1 min-[425px]:text-xs
                sm:px-3 sm:py-1 sm:text-sm"
              aria-label="Open filters"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#346D9A] to-[#83C9FF] transition-all duration-300 ease-in-out group-hover:opacity-0" />
              <span className="absolute inset-0 bg-gradient-to-r from-[#83C9FF] to-[#346D9A] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
              <span className="relative z-10 font-medium">Filter</span>
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1
        min-[320px]:gap-0.5
        min-[375px]:gap-1
        sm:gap-1">
        <div className="relative" ref={containerRef}>
          <button
            onClick={() => setNotifOpen((s) => !s)}
            className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100 transition
              min-[320px]:w-8 min-[320px]:h-8
              min-[375px]:w-9 min-[375px]:h-9
              sm:w-10 sm:h-10"
            aria-expanded={notifOpen}
            aria-haspopup="true"
          >
            <Bell size={20} className="text-gray-600
              min-[320px]:w-4 min-[320px]:h-4
              min-[375px]:w-[18px] min-[375px]:h-[18px]
              sm:w-5 sm:h-5" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg overflow-hidden z-50
              min-[320px]:w-[280px] min-[320px]:right-[-40px]
              min-[375px]:w-[300px] min-[375px]:right-[-20px]
              sm:w-[320px] sm:right-0
              md:w-80">
              <div className="flex items-center justify-between px-3 py-2 border-b">
                <div className="font-semibold">Notifications</div>
                <div className="flex items-center gap-2">
                  <button onClick={clearNotifications} className="text-xs text-gray-500 hover:text-gray-700">Clear</button>
                </div>
              </div>

              <div className="max-h-64 overflow-y-auto">
                {loadingNotifs && <div className="p-4 text-sm text-gray-500">Loading...</div>}
                {notifError && <div className="p-4 text-sm text-red-600">{notifError}</div>}
                {!loadingNotifs && notifications.length === 0 && !notifError && (
                  <div className="p-4 text-sm text-gray-500">No notifications</div>
                )}
                {!loadingNotifs && notifications.map((n) => (
                  <div key={n._id || JSON.stringify(n)} className="px-3 py-3 border-b hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{n.title}</div>
                      <div className="text-xs text-gray-400">{n.type}</div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{n.body}</div>
                    <div className="text-xs text-gray-400 mt-2">{n.createdAt ? new Date(n.createdAt).toLocaleString() : ""}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex p-3 gap-3
          min-[320px]:p-1 min-[320px]:gap-1.5
          min-[375px]:p-2 min-[375px]:gap-2
          sm:p-2.5 sm:gap-2.5
          md:p-3 md:gap-3">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&background=c7d2fe&color=3730a3&bold=true`}
            alt=""
            className="w-10 h-10 rounded-[2rem]
              min-[320px]:w-7 min-[320px]:h-7
              min-[375px]:w-8 min-[375px]:h-8
              sm:w-9 sm:h-9
              md:w-10 md:h-10"
          />
          <div className="leading-4
            min-[320px]:hidden
            min-[425px]:block min-[425px]:leading-3
            sm:leading-4">
            <h4 className="font-semibold
              min-[425px]:text-xs
              sm:text-sm
              md:text-base">{user?.name}</h4>
            <span className="text-xs text-gray-600
              min-[425px]:text-[10px]
              sm:text-xs">{user?.email}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Topbar;