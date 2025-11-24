import React, { useEffect, useState } from "react";
const base = import.meta.env.VITE_API_URL || "";

export default function ResourceModal({ open, onClose, onSubmit, facilityName, resources = [] }) {
  const [selection, setSelection] = useState({});
  const [bookingType, setBookingType] = useState("facility_with_resource");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const initial = {};
    (resources || []).forEach((r) => { initial[r._id || r.id] = 0; });
    setSelection(initial);
    setBookingType("facility_with_resource");
    setStartDate("");
    setEndDate("");
    setError("");
  }, [open, resources]);

  if (!open) return null;

  const updateResource = (id, delta) => {
    setSelection((prev) => ({ ...prev, [id]: Math.max((prev[id] || 0) + delta, 0) }));
  };

  const totalItems = Object.values(selection).reduce((s, v) => s + Number(v || 0), 0);

  const handleContinue = () => {
    setError("");
    if (!startDate || !endDate) {
      setError("Please provide start and end date/time.");
      return;
    }
    const s = new Date(startDate);
    const e = new Date(endDate);
    if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime()) || s >= e) {
      setError("Start date must be before end date.");
      return;
    }


    const selectedIds = [];
    for (const r of resources) {
      const qty = selection[r._id || r.id] || 0;
      if (qty > 0) selectedIds.push(r._id || r.id);
    }
    if ((bookingType === "resource" || bookingType === "facility_with_resource") && selectedIds.length === 0) {
      setError("Select at least one resource for this booking type.");
      return;
    }

    const payload = {
      bookingType,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      resource: selectedIds,
      facilityName,
    };

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white w-full max-w-[1100px] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h3 className="text-2xl font-bold text-[#007BDA]">Add resources – {facilityName}</h3>
            <p className="text-sm text-gray-600">Choose available resources</p>
          </div>
          <button onClick={onClose} className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">Close</button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div className="w-2/3 p-6 overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              {resources.map((r) => (
                <div key={r._id || r.id} className="bg-[#F7FBFF] rounded-xl p-3 shadow-sm flex flex-col">
                      <img
                          src={
                              r.image
                                  ? (r.image.startsWith('http') ? r.image : `${base}${r.image}`)
                                  : '/placeholder.png'
                          }
                          className="w-full h-40 rounded-xl object-cover mb-4"
                          alt={r.name}
                      />
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="capitalize font-semibold text-gray-800">{r.name}</p>
                      <p className="text-xs text-gray-500">Available: {r.quantity ?? '—'}</p>
                      <p className="text-xs mt-1"><span className={`px-2 py-0.5 rounded text-sm ${r.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{r.status}</span></p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button onClick={() => updateResource(r._id || r.id, -1)} className="w-9 h-9 rounded-md bg-gray-200 flex items-center justify-center">−</button>
                      <div className="w-10 text-center font-semibold">{selection[r._id || r.id] || 0}</div>
                      <button onClick={() => updateResource(r._id || r.id, 1)} className="w-9 h-9 rounded-md bg-[#007BDA] text-white flex items-center justify-center">+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-1/3 p-6 border-l bg-gradient-to-b from-white to-gray-50 overflow-auto">
            <h4 className="text-lg font-bold text-gray-800 mb-3">Order Summary</h4>

            <div className="mb-3 space-y-2">
              <label className="block text-sm font-medium text-gray-700">Booking type</label>
              <select value={bookingType} onChange={(e) => setBookingType(e.target.value)} className="w-full p-2 rounded border">
                <option value="facility_with_resource">Facility + Resources</option>
                <option value="facility">Facility only</option>
                <option value="resource">Resource only</option>
              </select>
            </div>

            <div className="mb-3 space-y-2">
              <label className="block text-sm font-medium text-gray-700">Start</label>
              <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full p-2 rounded border" />
              <label className="block text-sm font-medium text-gray-700 mt-2">End</label>
              <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full p-2 rounded border" />
            </div>

            <div className="space-y-2">
              {Object.entries(selection).filter(([, qty]) => qty > 0).map(([id, qty]) => {
                const r = resources.find(x => (x._id || x.id) === id);
                return (
                  <div key={id} className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
                    <div>
                      <div className="font-semibold text-gray-800">{r?.name}</div>
                      <div className="text-xs text-gray-500">{qty} item{qty>1 ? "s" : ""}</div>
                    </div>
                    <div className="text-gray-700 font-semibold">{qty}</div>
                  </div>
                );
              })}

              {totalItems === 0 && <div className="text-sm text-gray-500 italic">No resources selected</div>}
            </div>

            <div className="mt-4 border-t pt-4">
              <div className="flex items-center justify-between">
                <div className="text-gray-600">Total items</div>
                <div className="font-bold text-gray-800">{totalItems}</div>
              </div>
            </div>

            {error && <div className="text-sm text-red-600 mt-3">{error}</div>}

            <div className="mt-6 space-y-2">
              <button onClick={handleContinue}
                className={`w-full py-3 rounded-lg font-bold text-white transition ${(totalItems>0 || bookingType === 'facility') ? "bg-gradient-to-r from-[#346D9A] to-[#83C9FF] text-[#FFFFFF] hover:brightness-95" : "bg-gray-300 cursor-not-allowed"}`}>
                Book
              </button>
              <button onClick={onClose} className="w-full py-3 rounded-lg font-bold bg-white border border-gray-200">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}