import { useState } from "react";

export default function UserTypeSelection({ onContinue, onBack }) {
  const [selected, setSelected] = useState("");

  return (
      <div className="bg-white rounded-2xl shadow-lg w-[360px] p-8 text-center">
      <div className="flex justify-start mb-0">
        <button onClick={() => onBack && onBack()} className="text-sm text-[#2A6495] font-semibold">
          ← Back
          </button>
      </div>
        <h3 className="text-2xl font-bold text-[#0] mb-2">Sign Up</h3>
        <p className="text-gray-500 text-sm mb-6">
          Are you creating this account as an Ateneo de Naga member or an external user?
        </p>

        <div className="text-left flex flex-col gap-3 mb-6">
          <label className="flex items-center gap-2 text-sm text-black-700 cursor-pointer">
            <input
              type="radio"
              name="userType"
              value="internal"
              onChange={() => setSelected("internal")}
              className="accent-blue-700"
            />
            Ateneo de Naga Member / Internal User
          </label>

          <label className="flex items-center gap-2 text-sm text-black-700 cursor-pointer">
            <input
              type="radio"
              name="userType"
              value="external"
              onChange={() => setSelected("external")}
              className="accent-blue-700"
            />
            External User
          </label>
        </div>

        <button
          disabled={!selected}
          onClick={() => onContinue(selected)}
          className={`w-[150px] py-2.5 rounded-md font-semibold transition-colors ${
            selected
              ? "bg-[#2A6495] text-white hover:bg-[#0d5694]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue →
        </button>
      </div>
  );
}

