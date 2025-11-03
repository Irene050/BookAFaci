import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object({
  fullName: yup.string().required('Full Name is required'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
}).required();

export default function ExternalSignUp({ onBack, initialValues }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      accountType: 'External',
      fullName: initialValues?.fullName || '',
      email: initialValues?.email || '',
      phone: initialValues?.phone || '',
    }
  });

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
  };

  return (
    <div className="bg-white rounded-[45px] shadow-lg w-[450px] p-10 text-center">
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