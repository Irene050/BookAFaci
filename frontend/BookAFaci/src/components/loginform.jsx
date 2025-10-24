import React from 'react'

function LoginForm() {
  return (
    <div>
        <div className="form-container bg-white rounded-[45px] p-10 w-[450px] h-[600px]">
            <h1 className="text-center font-Inter font-bold text-[23px]">Welcome Back!</h1>
            <h3 className="text-center font-Inter mb-[45px]">Please enter your details</h3>
            <form>
                <div className="mb-4">
                    <label className="block text-sm font-Inter font-bold text-black">Email</label>
                    <input type="email" className="placeholder:font-Inter placeholder:text-[#717171]/30 mt-1 block w-full border border-[#A9A9A9] rounded-[10px] shadow-sm p-2 " placeholder="Enter your email" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-Inter font-bold text-black">Password</label>
                    <input type="password" className="placeholder:font-Inter placeholder:text-[#717171]/30 mt-1 block w-full border border-[#A9A9A9] rounded-[10px] shadow-sm p-2" placeholder="Enter your password" />
                    <h1 className=" text-right text-sm font-Inter text-[#2A6495] font-bold mt-[6px] mb-[50px]">Forgot Password?</h1>
                </div>
                <button type="submit" className="w-full h-[50px] bg-[#2A6495] text-white p-2 rounded-md">Login</button>
                <button type="submit" className="w-full h-[50px] bg-[#FFFFFF] text-black p-2 rounded-md mt-[30px] w-full border border-[#A9A9A9]">Login with google</button>

                <h1 className="text-center font-Inter font-bold text-[13px] mt-[50px]">Don't have an account? <a href="#" className="text-[#2A6495]">Sign up</a></h1>
            </form>
        </div>
    </div>
  )
}

export default LoginForm
