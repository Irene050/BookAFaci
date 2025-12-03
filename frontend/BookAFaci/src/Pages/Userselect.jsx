import loginbg from '../assets/Gradient blur.png'
import SignUpFlow from '../components/SignUpFlow'
import React from 'react'

function Userselect() {
  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${loginbg})` }}>
      <div className="w-full text-center mb-3">
        <h1 className="text-[19px] font-bold text-white">BOOKAFACI</h1>
      </div>
      <title>User Selection</title>
      <SignUpFlow />
    </div>
  )
}

export default Userselect