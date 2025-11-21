import React from 'react'
//import '../Login.css'
import LoginForm from '../components/loginform.jsx'
import loginbg from '../assets/Gradient blur.png'

const Login = () => {
  return (
    <div className="min-h-screen relative transition-all">
      <div className="absolute inset-0 flex">
        <div className="w-[60%] bg-[url('/src/assets/left.jpeg')] bg-cover bg-center
        min-[320px]:w-[0%]
        min-[375px]:w-[0%]
        min-[425px]:w-[0%]
        sm:w-[0%]
        md:w-[0%]
        lg:w-[60%]
        xl:w-[70%]
        " style={{
        }}>
          <h1 className="mt-[25%] text-center text-[10rem] font-bold text-white">BOOKAFACI</h1>
        </div>

        <div className="w-[40%] bg-[url('/src/assets/right.png')] bg-cover bg-center
        min-[320px]:w-[100%]
        min-[375px]:w-[100%]
        min-[425px]:w-[100%]
        sm:w-[100%]
        md:w-[100%]
        lg:w-[40%]
        xl:w-[40%]
        ">
            <div className="w-full mb-3 mt-[25%]">
              <div className='flex flex-col items-center justify-center mt-10'>
                <LoginForm />
              </div>
            </div>
            <title>BookAFaci Login</title>
        </div>
      </div>

    </div>
  )
}

export default Login
