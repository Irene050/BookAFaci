import React from 'react'
import { Link } from 'react-router';
import landingbg from "../assets/left.jpeg";
import Landingnav from '../components/landingnav';

function LandingPage() {
    return (
        <div className='flex flex-col min-h-screen transition-all font-inter'>
            <title>BookAFaci</title>

            <main className="flex-1 bg-center bg-cover relative w-full"
                style={{
                    backgroundImage: `url(${landingbg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}>

                <div className='flex h-screen items-center text-white font-bold text-5xl gap-5 backdrop-blur-md p-4 overflow-hidden bg-gradient-to-b from-transparent via-transparent via-85% to-[#346D9A]
                    min-[320px]:flex-col
                    min-[640px]:flex-col 
                    min-[640px]:mt-[10rem]
                    min-[640px]:ml-[0rem]
                    md:flex-row
                    md:ml-[0rem]
                    lg:flex-row
                    lg:ml-[0rem]'
                >
                    <div className='flex items-center text-[3rem] grow group relative justify-center 
                    min-[320px]:mt-[15rem]
                    min-[320px]:ml-10
                    lg:mt-[3rem]
                    md:mt-[3rem]
                    
                    '>
                        <div className='text-wrap ml-[3rem]
                            md:ml-[2rem]
                            lg:ml-0
                        '>
                            <article className='mb-3'>
                                <h3 className='mb-4'>BOOKAFACI</h3>
                                <h1 className='text-[2rem] font-light font-inter'>"It's always easy with BookAFaci"</h1>
                            </article>

                            <a className='text-white bg-transparent border p-2 rounded-full text-[1.5rem] hover:bg-white hover:text-black mix-blend-lighten transition-all' href="/user-select">Get Started</a>
                        </div>
                    </div>
                    <div className='flex grow group relative justify-center bg-transparent drop-shadow-2xl hover:scale-105 transition-all 
                        w-[50%]
                        xl:mt-20
                        xl:w-[20%]
                        lg:mt-20
                        lg:w-[20%]
                        md:mt-10
                        md:w-[80%]
                        sm:w-[90%]'>
                        <img src="/Bookafaci.svg" alt="Mainlogo" className='w-[20rem] mt-10 p-10 hover:drop-shadow-2xl hover:shadow-blue-500/50 transition-all 
                        md:p-4
                        lg:p-1
                        xl:p-1
                        xl:w-[40%]'/>
                    </div>
                </div>

            </main>
            <div className='flex flex-col min-h-screen bg-gradient-to-b from-[#346D9A] to-[#83C9FF]'>

            </div>
            <div className='flex flex-col min-h-screen '
                style={{
                    backgroundImage: `url(${landingbg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'bottom',
                    backgroundRepeat: 'no-repeat',
                }}>
                <div className="backdrop-blur-lg min-h-screen backdrop-brightness-50 
                bg-gradient-to-b from-[#83C9FF] from-10% via-70% via-transparent to-90% to-transparent "></div>

            </div>
            <Landingnav />
            <footer className="w-full border-t bg-[#000000] border-white/30 text-white text-sm">
                <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                    <span className="opacity-80 mx-[10rem]">
                        © {new Date().getFullYear()} BookAFaci. All rights reserved.
                    </span>
                    <div className="flex gap-4 opacity-80 mx-[10rem]">
                        <a href="/user-select" className="hover:opacity-100 underline-offset-4 hover:underline">
                            Get Started
                        </a>
                        <a href="/login" className="hover:opacity-100 underline-offset-4 hover:underline">
                            Login
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
export default LandingPage