import React from 'react';
import { useNavigate } from 'react-router';
import landingbg from "../assets/left.jpeg";
import { CircleAlert } from "lucide-react"

export default function NotFound() {
    const navigate = useNavigate();
    return (

        <div className=" flex min-h-screen transition-all font-inter" 
        style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(${landingbg})`
        }}>
            <title>404 Not Found</title>

            <div className='ms-px backdrop-blur-md w-full backdrop-grayscale transition-all'>
                <div className='flex place-items-start items-center pl-[10%] pt-[19%] gap-4 transition-al'>
                    <CircleAlert className="mb-0 mr-2 text-red-400 drop-shadow-2xl" size={65} />
                    <h1 className="text-7xl font-bold mb-0 text-[#007BDA] drop-shadow-2xl bg-white/50 px-1">404 Page Not Found</h1>
                </div>
                <div className='flex items-center pl-[10%]'>
                    <h1 className="text-[1.5rem] font-semibold mb-4 mt-2 text-[#007BDA] drop-shadow-2xl bg-white/50 px-1 py-[2px]">URL Missing or Incorrect</h1>
                </div>
                <div className='flex place-items-start flex-row gap-2 pl-[10%] transition-all'>
                    <a onClick={() => navigate(-1)} className='text-white font-semibold bg-white/10 border p-2 rounded-md text-[1.5rem] hover:bg-white/30 hover:text-white transition-all cursor-pointer'>Go Back</a>
                    <a className='text-white font-semibold bg-transparent border p-2 rounded-md text-[1.5rem] hover:bg-white hover:text-[#007BDA] transition-all' href="/Login">Login</a>
                </div>

            </div>
        </div>
    );
}

/*
<main className="flex-1 flex items-center justify-center bg-center bg-cover min-h-screen pb-5
                          min-[320px]:w-[350px] max-[640px]:w-[450px] md:w-[450px] lg:w-[450px]"
                style={{
                    backgroundImage: `url(${landingbg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}>

                <div className="max-w-xl w-full backdrop-blur-sm rounded-lg shadow-lg p-8 text-center">
                    <div className='flex items-center justify-center'>
                        <CircleAlert className="mb-4 mr-4 text-red-600" size={48} />
                        <h1 className="text-4xl font-bold mb-4">404 Page Not Found</h1>
                    </div>

                    <div className="flex justify-center gap-3">
                        <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-200 rounded">Go back</button>
                        <button onClick={() => navigate('/login')} className="px-4 py-2 bg-blue-600 text-white rounded">Login</button>
                    </div>
                </div>
            </main>
*/