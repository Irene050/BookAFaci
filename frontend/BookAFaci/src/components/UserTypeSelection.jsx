import { useState } from "react";

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
