import { useState } from "react";
import { useNavigate } from 'react-router'

export default function UserTypeSelection({ onContinue }) {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate()

  return (
    <div className="form-container bg-white rounded-[45px] p-10 w-[450px] h-[fit-content]">
      <div>
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-sm text-[#2A6495] font-semibold"
        >
          ← Back
        </button>
      </div>
      <div className="form-box">
        <h3 className="text-center font-Inter font-bold text-[23px]">Sign Up</h3>
        <p className="text-center font-Inter text-[15px] font-semibold mb-[25px] text-[#717171]/80">
          Are you creating this account as an Ateneo de Naga member or an
          external user?
        </p>
        <div className="radio-group mb-[30px]">
          <label className="font-Inter text-[15px] font-regular">
            <input
              type="radio"
              name="userType"
              value="internal"
              onChange={() => setSelected("internal")}
            />{" "}
            Ateneo de Naga Member / Internal User
          </label>
          <br />
          <br />
          <label className="font-Inter text-[15px] font-regular">
            <input
              type="radio"
              name="userType"
              value="external"
              onChange={() => setSelected("external")}
            />{" "}
            External User
          </label>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button
            disabled={!selected}
            onClick={() => onContinue(selected)}
            className="btn w-[150px] h-[50px] bg-[#2A6495] text-white p-2 rounded-md "
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
