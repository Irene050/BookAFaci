import React from 'react'
import { Link } from 'react-router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'


function LoginForm() {
  const schema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  const onSubmit = (data) => {
    console.log('submit', data)
  }

  return (
    <div className="">
      <div className="form-container bg-white rounded-[45px] p-10 w-[450px] h-[fit-content] 
        min-[320px]:w-[350px]  max-[640px]:w-[450px] 
        md:w-[450px] 
        lg:w-[450px] 
        transition-all">

        <h1 className="text-center font-Inter font-bold text-[23px]">Welcome Back!</h1>
        <h3 className="text-center font-Inter text-[15px] font-medium mb-[45px] text-[#717171]/80">Please enter your details</h3>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <label className="block text-sm font-Inter font-bold text-black">Email</label>
            <input
              type="email"
              className="placeholder:font-Inter placeholder:text-[#717171]/30 mt-1 block w-full border border-[#A9A9A9] rounded-[10px] shadow-sm p-2"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && <p className="text-red-500 text-sm mt-0">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-Inter font-bold text-black">Password</label>
            <input
              type="password"
              className="placeholder:font-Inter placeholder:text-[#717171]/30 mt-1 block w-full border border-[#A9A9A9] rounded-[10px] shadow-sm p-2"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && <p className="text-red-500 text-sm mt-0">{errors.password.message}</p>}
            <h1 className=" text-right text-sm font-Inter text-[#2A6495] font-bold mt-[6px] mb-[20px]">Forgot Password?</h1>
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full h-[50px] bg-[#2A6495] text-white p-2 rounded-md hover:bg-[#0d5694] transition">Login</button>

          <button
            type="button"
            className="w-full border border-gray-300 py-2.5 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition mt-[30px]"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5"
            />
            <span className="text-gray-700 text-sm font-medium">Sign in with Google</span>
          </button>

          <h1 className="text-center font-Inter font-bold text-[13px] mt-[30px]">Don't have an account? <Link to="/user-select" className="text-[#2A6495] hover:underline">Sign up</Link></h1>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
