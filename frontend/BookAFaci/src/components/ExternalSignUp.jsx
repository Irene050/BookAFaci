export default function ExternalSignUp() {
  return (
      <div className="bg-white rounded-2xl shadow-lg w-[450px] p-8 text-center">
        <h3 className="text-2xl font-bold text-[#0b2a4a] mb-1">Sign Up</h3>
        <p className="text-gray-500 text-sm mb-6">
          Create an <span className="font-medium">External Account</span> to continue
        </p>

        <form className="text-left space-y-4">
          <div>
            <label className="font-bold text-sm text-black-700 mb-1 block">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-sm text-black-700 mb-1 block">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-sm text-black-700 mb-1 block">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+63 (000) 000 00"
              className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0b2a4a] text-white py-2.5 rounded-md font-medium hover:bg-blue-900 transition"
          >
            Sign Up
          </button>

          <button
            type="button"
            className="w-full border border-gray-300 py-2.5 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5"
            />
            <span className="text-gray-700 text-sm font-medium">Sign in with Google</span>
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-5">
          Already have an account?{" "}
          <a href="#" className="text-blue-700 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
  );
}

// export default function ExternalSignUp() {
//   return (
//     <div className="container">
//       <h2 className="title">BOOKAFACI</h2>
//       <div className="form-box">
//         <h3>Sign Up</h3>
//         <p>Create an External Account to continue</p>

//         <label>Full Name</label>
//         <input type="text" placeholder="Enter your full name" />

//         <label>Email</label>
//         <input type="email" placeholder="Enter your Email" />

//         <label>Phone Number</label>
//         <input type="tel" placeholder="+63 (000) 000 00" />

//         <button className="btn">Sign up</button>

//         <button className="google-btn">
//           <img
//             src="https://www.svgrepo.com/show/355037/google.svg"
//             alt="google"
//           />
//           Sign in with Google
//         </button>

//         <p className="footer-text">
//           Already have an account? <a href="#">Login</a>
//         </p>
//       </div>
//     </div>
//   );
// }


