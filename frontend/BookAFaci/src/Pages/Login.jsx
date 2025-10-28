import React from 'react'
//import '../Login.css'
import LoginForm from '../components/loginform.jsx'
import loginbg from '../assets/Gradient blur.png'

const Login = () => {
  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${loginbg})` }}>
      <div className="w-full text-center mb-3">
        <h1 className="text-[19px] font-bold text-white">BOOKAFACI</h1>
      </div>
      <LoginForm />
    </div>
  )
}

export default Login
