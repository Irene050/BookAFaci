import { useEffect } from "react";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios';

const schema = yup.object({
  role: yup.string().required('Role is required'),
  fullName: yup.string().required('Full Name is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .matches(
      /^[A-Za-z0-9._%+-]+@gbox\.adnu\.edu\.ph$/,
      'Email must end with @gbox.adnu.edu.ph'
    ),
  phone: yup.string().required('Phone number is required'),
  department: yup.string().when('role', {
    is: 'student',
    then: (s) => s.required('Department is required'),
    otherwise: (s) => s.notRequired(),
  }),
  organization: yup.string().when('role', {
    is: 'organization',
    then: (s) => s.required('Organization is required'),
    otherwise: (s) => s.notRequired(),
  }),
  faculty: yup.string().when('role', {
    is: 'faculty',
    then: (s) => s.required('Faculty is required'),
    otherwise: (s) => s.notRequired(),
  }),
}).required();

export default function InternalSignUp({ onBack, initialValues }) {
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      accountType: 'Internal',
      role: initialValues?.role || '',
      department: initialValues?.department || '',
      organization: initialValues?.organization || '',
      faculty: initialValues?.faculty || '',
      fullName: initialValues?.fullName || '',
      password: initialValues?.password || '',
      email: initialValues?.email || '',
      phone: initialValues?.phone || '',
    }
  });

  const role = watch('role');

  useEffect(() => {
    // Clear dependent fields when role changes
    setValue('department', '');
    setValue('organization', '');
    setValue('faculty', '');
  }, [role, setValue]);

  const onSubmit = async (data) => {
  try {
    console.log('Submitting internal form data:', data);
    
    const submitData = {
      accountType: 'Internal',
      name: data.fullName, // Map to 'name' field in backend
      password: data.password,
      role: data.role,
      email: data.email,
      phone: data.phone,
      department: data.department || data.student, // Handle department mapping
      organization: data.organization,
      faculty: data.faculty
    };

    const response = await axios.post('http://localhost:5000/api/users/register', submitData);
    console.log('Internal registration successful:', response.data);
    // Handle success (redirect, show message, etc.)
  } catch (error) {
    console.error('Registration failed:', error.response?.data || error.message);
    // Handle error (show error message to user)
  }
};

  return (
    <div className="bg-white rounded-[45px] shadow-lg w-[450px] p-10 text-center
    min-[320px]:w-[350px]  max-[640px]:w-[450px] 
      md:w-[450px] 
      lg:w-[450px] 
      transition-all
    ">
      <div className="flex justify-start mb-4">
        <button onClick={() => onBack && onBack()} className="text-sm text-[#2A6495] font-semibold">
          ← Back
        </button>
      </div>
      <h3 className="text-2xl font-bold text-[#0] mb-1">Sign Up</h3>
      <p className="text-gray-500 text-sm mb-6">
        Create an <span className="font-medium">Internal Account</span> to continue
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
            placeholder="Enter your GBox account"
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

        <div>
          <label className="font-bold text-sm text-black-700 mb-1 block">Select Role:</label>
          <select className="mb-3 block w-[130px] border p-2 rounded-[10px]" {...register('role')}>
            <option value="" className="">-- Select --</option>
            <option value="student">Student</option>
            <option value="organization">Organization</option>
            <option value="faculty">Faculty</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
          {role === "student" && (
            <>
              <select
                className="border p-2 rounded w-full mb-4"
                {...register('student')}
              >
                <option value="">-- Select Department --</option>
                <option value="COLLEGE OF COMPUTER STUDIES">COLLEGE OF COMPUTER STUDIES</option>
                <option value="COLLEGE OF BUSINESS AND ACCOUNTANCY">COLLEGE OF BUSINESS AND ACCOUNTANCY</option>
                <option value="COLLEGE OF EDUCATION">COLLEGE OF EDUCATION</option>
                <option value="COLLEGE OF HUMANITIES AND SOCIAL SCIENCES">COLLEGE OF HUMANITIES AND SOCIAL SCIENCES</option>
                <option value="COLLEGE OF ENGINEERING">COLLEGE OF ENGINEERING</option>
                <option value="COLLEGE OF NURSING">COLLEGE OF NURSING</option>
              </select>
              {errors.student && <p className="text-red-500 text-sm mt-0">{errors.student.message}</p>}
            </>
          )}

          {role === "organization" && (
            <>
              <select
                className="border p-2 rounded w-full mb-4"
                {...register('organization')}
              >
                <option value="">-- Select Organization --</option>
                <option value="Org1">Org1</option>
                <option value="Org2">Org2</option>
                <option value="Org3">Org3</option>
              </select>
              {errors.organization && <p className="text-red-500 text-sm mt-0">{errors.organization.message}</p>}
            </>
          )}
          {role === "faculty" && (
            <>
              <select
                className="border p-2 rounded w-full mb-4"
                {...register('faculty')}
              >
                <option value="">-- Select Faculty --</option>
                <option value="COLLEGE OF COMPUTER STUDIES">COLLEGE OF COMPUTER STUDIES</option>
                <option value="COLLEGE OF BUSINESS AND ACCOUNTANCY">COLLEGE OF BUSINESS AND ACCOUNTANCY</option>
                <option value="COLLEGE OF EDUCATION">COLLEGE OF EDUCATION</option>
                <option value="COLLEGE OF HUMANITIES AND SOCIAL SCIENCES">COLLEGE OF HUMANITIES AND SOCIAL SCIENCES</option>
                <option value="COLLEGE OF ENGINEERING">COLLEGE OF ENGINEERING</option>
                <option value="COLLEGE OF NURSING">COLLEGE OF NURSING</option>
              </select>
              {errors.faculty && <p className="text-red-500 text-sm mt-0">{errors.faculty.message}</p>}
            </>
          )}
        </div>

        <button
          type="submit"
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
      </form>

      <p className="text-center font-Inter font-bold text-[13px] mt-[30px]">
        Already have an account?{" "}
        <a href="/" className="text-[#2A6495] hover:underline">
          Login
        </a>
      </p>
    </div>
  );
}