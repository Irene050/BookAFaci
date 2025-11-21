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
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h3 className="text-2xl font-extrabold text-[#007BDA]">
              Would you like to add resources?
            </h3>
            <p className="text-sm text-gray-600">{facilityName}</p>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
          >
            Close
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div className="w-2/3 p-6 overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(resources).map((key) => (
                <div key={key} className="bg-[#F7FBFF] rounded-xl p-3 shadow-sm flex flex-col">
                  <img
                    src={resourceImages[key]}
                    alt={key}
                    className="w-full h-36 object-cover rounded-lg"
                  />
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="capitalize font-semibold text-gray-800">{friendlyName[key]}</p>
                      <p className="text-xs text-gray-500">Add how many you need</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateResource(key, -1)}
                        className="w-9 h-9 rounded-md bg-gray-200 flex items-center justify-center text-lg"
                      >
                        −
                      </button>

                      <div className="w-10 text-center font-semibold">{resources[key]}</div>

                      <button
                        onClick={() => updateResource(key, 1)}
                        className="w-9 h-9 rounded-md bg-[#007BDA] text-white flex items-center justify-center text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-1/3 p-6 border-l bg-gradient-to-b from-white to-gray-50 overflow-auto">
            <h4 className="text-lg font-bold text-gray-800 mb-3">Order Summary</h4>

            <div className="space-y-2">
              {Object.keys(resources).map((key) => {
                const count = Number(resources[key] || 0);
                if (count <= 0) return null;
                return (
                  <div key={key} className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
                    <div>
                      <div className="font-semibold text-gray-800">{friendlyName[key]}</div>
                      <div className="text-xs text-gray-500">{count} item{count > 1 ? "s" : ""}</div>
                    </div>

                    <div className="text-gray-700 font-semibold">{count}</div>
                  </div>
                );
              })}

              {totalItems === 0 && (
                <div className="text-sm text-gray-500 italic">No resources selected</div>
              )}
            </div>

            <div className="mt-4 border-t pt-4">
              <div className="flex items-center justify-between">
                <div className="text-gray-600">Total items</div>
                <div className="font-bold text-gray-800">{totalItems}</div>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Available Date</label>
              <input
                type="date"
                className="w-full mt-1 p-2 rounded-md border"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <label className="block text-sm font-medium text-gray-700 mt-3">Time</label>
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

            <div className="mt-6 space-y-2">
              <button
                disabled={!canBook}
                onClick={() =>
                  onSubmit({ facilityName, resources, date, time, notes })
                }
                className={`w-full py-3 rounded-lg font-bold text-white transition ${canBook ? "bg-[#ffcc00] hover:brightness-95" : "bg-gray-300 cursor-not-allowed"}`}
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

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/");
  }, [navigate]);

  const handleBookingSubmit = (payload) => {
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

      <Sidebar>
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={false} onClick={() => navigate("/dashboard")} />
        <SidebarItem icon={<Building2 size={20} />} text="Facilities" active={true} onClick={() => navigate("/facilities")} />
      </Sidebar>

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

                {/* FACILITY CARD 1 (UPDATED) */}
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

                    <p className="mt-4 text-[#007BDA] font-semibold">
                      Would you like to add resources?
                    </p>

                    <button
                      className="mt-2 bg-[#007BDA] text-white px-6 py-2 rounded-full shadow hover:bg-[#0069b8] transition"
                      onClick={() => {
                        setSelectedFacility("Xavier Grounds");
                        setModalOpen(true);
                      }}
                    >
                      Add Resources
                    </button>
                  </div>
                </div>

                {/* FACILITY CARD 2 (UPDATED) */}
                <div className="bg-[#F7FBFF] rounded-[15px] shadow-md p-5 flex gap-5 items-start">
                  <img
                    src="https://tse3.mm.bing.net/th/id/OIP.sHbMTFqQTCH12EDM1bIkMgHaEK"
                    className="w-[180px] h-[150px] rounded-xl object-cover"
                    alt="Alingal Convention Hall"
                  />

                  <div className="flex-1">
                    <p className="font-bold text-lg text-[#1A1A1A]">Alingal Convention Hall</p>
                    <p className="text-gray-500 text-sm mb-2">
                      Ateneo De Naga University 5th floor Alingal Building
                    </p>
                    <p className="font-semibold text-gray-700">Facility</p>
                    <p className="text-sm text-gray-600">250 Pax</p>
                    <p className="text-sm text-gray-600">Big Space</p>

                    <p className="mt-4 text-[#007BDA] font-semibold">
                      Would you like to add resources?
                    </p>

                    <button
                      className="mt-2 bg-[#007BDA] text-white px-6 py-2 rounded-full shadow hover:bg-[#0069b8] transition"
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
        </div>

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
