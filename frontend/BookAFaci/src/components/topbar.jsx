import React, { useState, useEffect, useRef } from "react";
import { Search, Bell } from "lucide-react";
import axios from "axios";

const base = import.meta.env.VITE_API_URL || "";

function Topbar() {
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
    <nav className="w-full bg-[#dbdbdb8f] h-[73px] rounded-b-[10px] sticky top-0 z-[20] flex items-center justify-between px-6 shadow-md backdrop-blur-sm font-inter">
      <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm w-[350px]">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search"
          className="ml-2 w-full bg-transparent outline-none text-gray-700"
        />
      </div>

      <div className="flex items-center gap-1">
        <div className="relative" ref={containerRef}>
          <button
            onClick={() => setNotifOpen((s) => !s)}
            className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100 transition"
            aria-expanded={notifOpen}
            aria-haspopup="true"
          >
            <Bell size={20} className="text-gray-600" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg overflow-hidden z-50">
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

        <div className="flex p-3 gap-3">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&background=c7d2fe&color=3730a3&bold=true`}
            alt=""
            className="w-10 h-10 rounded-[2rem]"
          />
          <div className="leading-4">
            <h4 className="font-semibold">{user?.name}</h4>
            <span className="text-xs text-gray-600">{user?.email}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Topbar;