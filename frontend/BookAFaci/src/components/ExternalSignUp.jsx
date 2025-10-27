export default function ExternalSignUp() {
  return (
    <div className="container">
      <h2 className="title">BOOKAFACI</h2>
      <div className="form-box">
        <h3>Sign Up</h3>
        <p>Create an External Account to continue</p>

        <label>Full Name</label>
        <input type="text" placeholder="Enter your full name" />

        <label>Email</label>
        <input type="email" placeholder="Enter your Email" />

        <label>Phone Number</label>
        <input type="tel" placeholder="+63 (000) 000 00" />

        <button className="btn">Sign up</button>

        <button className="google-btn">
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="google"
          />
          Sign in with Google
        </button>

        <p className="footer-text">
          Already have an account? <a href="#">Login</a>
        </p>
      </div>
    </div>
  );
}
