import { useState } from "react";

export default function ExternalSignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    let tempErrors = {};
    if (!fullName.trim()) tempErrors.fullName = "Full Name is Required";
    if (!email.trim()) tempErrors.email = "Email is Required";
    if (!phone.trim()) tempErrors.phone = "Phone Number is Required";

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      console.log("Form submitted:", { fullName, email, phone });
    }
  };

  return (
    <div className="bg-white rounded-[45px] shadow-lg w-[450px] p-8 text-center">
      <h3 className="text-2xl font-bold text-[#0] mb-1">Sign Up</h3>
      <p className="text-gray-500 text-sm mb-6">
        Create an <span className="font-medium">External Account</span> to continue
      </p>

      <form className="text-left space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="font-bold text-sm text-black-700 mb-1 block">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={`w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label className="font-bold text-sm text-black-700 mb-1 block">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="font-bold text-sm text-black-700 mb-1 block">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="+63 (000) 000 00"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

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

        <button
          type="submit"
          className="w-full bg-[#0b2a4a] text-white py-2.5 rounded-md font-medium hover:bg-blue-900 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}