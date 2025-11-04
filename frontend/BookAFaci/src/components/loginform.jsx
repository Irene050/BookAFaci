import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios';
import { toast } from 'react-toastify';

function LoginForm() {
  const navigate = useNavigate();
  
  const schema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  const onSubmit = async (data) => {
    try {
      console.log('Login attempt:', data);
      
      const response = await axios.post('http://localhost:5000/api/users/login', data, {
        withCredentials: true,
      });
      
      console.log('Login successful:', response.data);
      
      // storing data to localstorage
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      //TOAST SCCESS
      toast.success('Login successful! Redirecting...', {
        position: "top-right",
        autoClose: 2000,
      });
      
      // REDIRECT TO DASHBOARD
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      console.error('Login failed:', error);
      
      if (error.response) {
        // ERROR response toast and message from backend
        toast.error(`Login failed: ${error.response.data.message}`, {
          position: "top-right",
          autoClose: 5000,
        });
      } else if (error.request) {
        // Request made but no response received
        toast.error('Cannot connect to server. Please try again.', {
          position: "top-right",
          autoClose: 5000,
        });
      } else {
        // ELSE general error
        toast.error('Login failed. Please check your credentials.', {
          position: "top-right",
          autoClose: 2000,
        });
      }
    }
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
