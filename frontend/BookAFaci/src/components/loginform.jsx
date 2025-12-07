import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
const base = import.meta.env.VITE_API_URL;

import {
  Eye, EyeOff, Mail, KeyIcon
} from "lucide-react";

function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
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
      const response = await axios.post(`${base}/bookafaci/users/login`, data, {
        withCredentials: true,
      });
      console.log('Login successful:', response.data);
      
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      const token = response.data.token || response.data.user.token || `user_${Date.now()}`;
      localStorage.setItem('token', token);
      localStorage.setItem('adminToken', token);

      const { accountType, role } = response.data.user || {};
      let destination = '/dashboard';
      if (accountType === 'External' || accountType === 'Internal') destination = '/UserDashboard';
      //else if (accountType === 'Internal') destination = '/dashboard-int';
      if (role === 'admin') destination = '/admindash';

      setTimeout(() => navigate(destination, { replace: true }), 1500);
      toast.success('Login successful! Redirecting...', {
        position: "top-right",
        autoClose: 1500,
        pauseOnHover : false,
      });
      
    } catch (error) {
      console.error('Login failed:', error);
      
      if (error.response) {
        toast.error(`Login failed: ${error.response.data.message}`, {
          position: "top-right",
          autoClose: 5000,
        });
      } else if (error.request) {
        toast.error('Cannot connect to server. Please try again.', {
          position: "top-right",
          autoClose: 5000,
        });
      } else {
        toast.error('Login failed. Please check your credentials.', {
          position: "top-right",
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <div className="font-inter">
      <div className="form-container bg-white rounded-[25px] p-10 w-[450px] h-[fit-content] 
        min-[320px]:w-[350px]  
        max-[640px]:w-[450px]
        md:w-[450px] 
        lg:w-[450px] 
        transition-all">

        <div className="flex justify-center mb-6">
          <img src="/Bookafaci.svg" alt="BookAFaci Logo" className="h-20 w-auto" />
        </div>

        <h1 className="text-center font-Inter font-bold text-[23px]">Welcome Back!</h1>
        <h3 className="text-center font-Inter text-[15px] font-medium mb-[45px] text-[#717171]/80">Please enter your details</h3>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <label className="block text-sm font-Inter font-bold text-black">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                className="placeholder:font-Inter placeholder:text-[#717171]/30 mt-1 block w-full border border-[#A9A9A9] rounded-[10px] shadow-sm p-2 pl-10"
                placeholder="Enter your email"
                {...register("email")}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-0">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-Inter font-bold text-black">Password</label>
            <div className="relative">
              <KeyIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="placeholder:font-Inter placeholder:text-[#717171]/30 mt-1 block w-full border border-[#A9A9A9] rounded-[10px] shadow-sm p-2 pl-10 pr-12"
                placeholder="Enter your password"
                {...register("password")}/>
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-gray-800"
                aria-label={showPassword ? 'Hide password' : 'Show password'}>
                {showPassword ? <EyeOff size={20} strokeWidth={1.5} className="text-[#000000]" /> : <Eye size={20} strokeWidth={1.5} className="text-[#000000]" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-0">{errors.password.message}</p>}
            <h1 className=" text-right text-sm font-Inter text-[#2A6495] font-bold mt-[6px] mb-[20px]">Forgot Password?</h1>
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full h-[50px] bg-[#2A6495] text-white p-2 rounded-md hover:bg-[#0d5694] transition">Login</button>

          {/*
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
          */}

          <h1 className="text-center font-Inter font-bold text-[13px] mt-[30px]">Don't have an account? <Link to="/user-select" className="text-[#2A6495] hover:underline">Sign up</Link></h1>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
