export default function InternalSignUp() {
  return (
    <div className="container">
      <h2 className="title">BOOKAFACI</h2>
      <div className="form-box">
        <h3>Sign Up</h3>
        <p>Create an Internal Account to continue</p>

        <label>Full Name</label>
        <input type="text" placeholder="Enter your full name" />

        <label>Email</label>
        <input type="email" placeholder="Enter your Gbox account" />

        <label>Phone Number</label>
        <input type="tel" placeholder="+63 (000) 000 00" />

        <label>Department</label>
        <select>
          <option disabled selected>
            Pick an option
          </option>
          <option>College of Computer Studies</option>
        </select>

        <button className="btn">Sign up</button>

        <p className="footer-text">
          Already have an account? <a href="#">Login</a>
        </p>
      </div>
    </div>
  );
}
