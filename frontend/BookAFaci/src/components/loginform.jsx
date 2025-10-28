import React from 'react'
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
    <div>
        <div className="form-container bg-white rounded-[45px] p-10 w-[450px] h-[fit-content]">
            <h1 className="text-center font-Inter font-bold text-[23px]">Welcome Back!</h1>
            <h3 className="text-center font-Inter mb-[45px]">Please enter your details</h3>
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
                <button type="submit" disabled={isSubmitting} className="w-full h-[50px] bg-[#2A6495] text-white p-2 rounded-md">Login</button>
                <button type="button" className="w-full h-[50px] bg-[#FFFFFF] text-black p-2 rounded-md mt-[30px] border border-[#A9A9A9]">Login with google</button>

                <h1 className="text-center font-Inter font-bold text-[13px] mt-[50px]">Don't have an account? <a href="#" className="text-[#2A6495]">Sign up</a></h1>
            </form>
        </div>
    </div>
  )
}

export default LoginForm
