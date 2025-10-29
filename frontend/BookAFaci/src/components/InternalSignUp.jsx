export default function InternalSignUp() {
  return (

      <div className="bg-white rounded-2xl shadow-lg w-[450px] p-8 text-center">
        <h3 className="text-2xl font-bold text-[#0] mb-1">Sign Up</h3>
        <p className="text-gray-500 text-sm mb-6">
          Create an <span className="font-medium">Internal Account</span> to continue
        </p>

        <form className="text-left space-y-4">
          <div>
            <label className="font-bold text-sm text-black-700 mb-1 block">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full p-2.5 border border-black-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-sm text-black-700 mb-1 block">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your GBox account"
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

          <div>
            <label className="font-bold text-sm text-black-700 mb-1 block">
              Department
            </label>
            <select className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none">
              <option disabled selected>
                Pick an option
              </option>
              <option>COLLEGE OF COMPUTER STUDIES</option>
              <option>COLLEGE OF BUSINESS AND ACCOUNTANCY</option>
              <option>COLLEGE OF EDUCATION</option>
              <option>COLLEGE OF HUMANITIES AND SOCIAL SCIENCES</option>
              <option>COLLEGE OF ENGINEERING</option>
              <option>COLLEGE OF NURSING</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0b2a4a] text-white py-2.5 rounded-md font-medium hover:bg-blue-900 transition"
          >
            Sign Up
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
