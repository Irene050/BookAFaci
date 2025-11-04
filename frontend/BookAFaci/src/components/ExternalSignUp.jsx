import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const schema = yup.object({
  fullName: yup.string().required('Full Name is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
}).required();

export default function ExternalSignUp({ onBack, initialValues }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      accountType: 'External', // This will be sent to backend
      fullName: initialValues?.fullName || '',
      password: initialValues?.password || '',
      email: initialValues?.email || '',
      phone: initialValues?.phone || '',
    }
  });

  const onSubmit = async (data) => {
  try {
    console.log('Submitting form data:', data);
    const submitData = {
      accountType: 'External',
      name: data.fullName, // Map to 'name' field in backend
      password: data.password,
      email: data.email,
      phone: data.phone,
    };

    const response = await axios.post('http://localhost:5000/api/users/register', submitData);
    console.log('Registration successful:', response.data);
    
    toast.success('Registration successful! Redirecting...', {
        autoClose: 2000,
      });
      
      // Go To Login
      setTimeout(() => {
        navigate('/');
      }, 3000);

  } catch (error) {
    console.error('Registration failed:', error.response?.data || error.message);
    toast.error(`${error.response.data.message}`, {
          autoClose: 1500,
        });
  }
};


  return (
    <div className="bg-white rounded-[45px] shadow-lg w-[450px] p-10 text-center
      min-[320px]:w-[350px]  max-[640px]:w-[450px] 
      md:w-[450px] 
      lg:w-[450px] 
      transition-all
    ">

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="flex justify-start mb-4">
        <button onClick={() => onBack && onBack()} className="text-sm text-[#2A6495] font-semibold">
          ← Back
          </button>
      </div>
      <h3 className="text-2xl font-bold text-[#0] mb-1">Sign Up</h3>
      <p className="text-gray-500 text-sm mb-6">
        Create an <span className="font-medium">External Account</span> to continue
      </p>
      <form className="text-left space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="font-bold text-sm text-black-700 mb-1 block">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            {...register('fullName')}
            className={`placeholder:font-Inter placeholder:text-[#717171]/30 mt-1 block w-full border border-[#A9A9A9] rounded-[10px] shadow-sm p-2 ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
        </div>

        <div>
          <label className="font-bold text-sm text-black-700 mb-1 block">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your Email"
            {...register('email')}
            className={`placeholder:font-Inter placeholder:text-[#717171]/30 mt-1 block w-full border border-[#A9A9A9] rounded-[10px] shadow-sm p-2 ${errors.email ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="font-bold text-sm text-black-700 mb-1 block">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register('password')}
            className={`placeholder:font-Inter placeholder:text-[#717171]/30 mt-1 block w-full border border-[#A9A9A9] rounded-[10px] shadow-sm p-2 ${errors.password ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <label className="font-bold text-sm text-black-700 mb-1 block">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="+63 (000) 000 00"
            {...register('phone')}
            className={`placeholder:font-Inter placeholder:text-[#717171]/30 mt-1 block w-full border border-[#A9A9A9] rounded-[10px] shadow-sm p-2 ${errors.phone ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#2A6495] text-white py-2.5 rounded-md font-medium hover:bg-[#0d5694] transition"
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
        
        <p className="text-center font-Inter font-bold text-[13px] mt-[30px]">
          Already have an account?{" "}
          <a href="/" className="text-[#2A6495] hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}