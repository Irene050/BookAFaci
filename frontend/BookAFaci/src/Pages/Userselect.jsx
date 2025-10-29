import loginbg from '../assets/Gradient blur.png'
import SignUpFlow from '../components/SignUpFlow'
import React from 'react'

function Userselect() {
  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${loginbg})` }}>
      <div className="w-full text-center mb-3">
        <h1 className="text-[19px] font-bold text-white">BOOKAFACI</h1>
      </div>
      <SignUpFlow />
    </div>
  )
}

export default Userselect


/*
import { useState } from "react";
import loginbg from '../assets/Gradient blur.png'

export default function UserTypeSelection({ onContinue }) {
  const [selected, setSelected] = useState("");

  return (
    <div className="container">
      <h2 className="title">BOOKAFACI</h2>
      <div className="form-box">
        <h3>Sign Up</h3>
        <p>
          Are you creating this account as an Ateneo de Naga member or an
          external user?
        </p>

        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="userType"
              value="internal"
              onChange={() => setSelected("internal")}
            />{" "}
            Ateneo de Naga Member / Internal User
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="userType"
              value="external"
              onChange={() => setSelected("external")}
            />{" "}
            External User
          </label>
        </div>

        <button
          disabled={!selected}
          onClick={() => onContinue(selected)}
          className="btn"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
*/