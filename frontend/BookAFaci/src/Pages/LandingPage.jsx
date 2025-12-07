import React from 'react'
import { Link } from 'react-router';
import landingbg from "../assets/left.jpeg";
import Landingnav from '../components/landingnav';

function LandingPage() {
    return (
        <div id='Home' className='flex flex-col min-h-screen transition-all font-inter'>
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
                            min-[320px]:mt-[-10rem]
                            min-[320px]:text-[2rem]
                            min-[320px]:text-center
                            min-[320px]:ml-[-1.5rem]
                            min-[425px]:mt-[-15rem]
                            sm:mt-[-5rem]
                            md:flex
                            md:flex-col
                            md:justify-center
                            md:items-start
                            md:text-left
                            md:mt-0
                            lg:ml-0
                            lg:mt-0
                            lg:text-left
                            xl:ml-0
                            xl:mt-0
                            xl:text-left
                            min-[425px]:text-[2rem]
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
                        md:mt-[2rem]
                        md:w-[80%]
                        sm:w-[35%]
                        sm:mt-[1rem]
                        min-[320px]:mt-[-4rem]
                        min-[320px]:w-[70%]
                        min-[425px]:mt-[-15rem]
                        min-[425px]:w-[50%]
                        '>
                        <img src="/Bookafaci.svg" alt="Mainlogo" className='w-[20rem] mt-10 p-10 hover:drop-shadow-2xl hover:shadow-blue-500/50 transition-all 
                        md:p-4
                        lg:p-1
                        xl:p-1
                        xl:w-[40%]'/>
                    </div>
                </div>

            </main>
            
            <div id="About" className='flex flex-col min-h-screen bg-gradient-to-b from-[#346D9A] to-[#83C9FF] py-16 px-4'>
                <div className='max-w-6xl mx-auto w-full'>
                    <h2 className='text-white text-4xl font-bold text-center mb-8'>About BookAFaci</h2>
                    
                    <div className='bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 shadow-xl border border-white/20'>
                        <p className='text-white text-lg leading-relaxed mb-4
                            min-[320px]:text-justify
                            sm:text-justify
                            md:text-justify
                            lg:text-center
                            xl:text-center
                            '>
                            <span className='font-semibold
                            '>BookAFaci</span> is designed to streamline booking facilities and equipment reservation 
                            in Ateneo De Naga University's Physical Plant Administration. Our system provides an efficient, 
                            user-friendly platform for managing all your reservation needs.
                        </p>
                    </div>

                    <h3 className='text-white text-3xl font-bold text-center mb-8'>Key Features</h3>
                    
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {/* Facility Management */}
                        <div className='bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 hover:transform hover:scale-105 transition-all duration-300'>
                            <div className='bg-[#83C9FF] rounded-full w-12 h-12 flex items-center justify-center mb-4'>
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h4 className='text-white text-xl font-semibold mb-2'>Facility Management</h4>
                            <p className='text-white/80 text-sm
                            min-[320px]:text-justify
                            sm:text-justify
                            md:text-justify
                            lg:text-left
                            xl:text-left
                            '>
                                Browse and book university facilities with real-time availability. View detailed information including capacity, amenities, and location.
                            </p>
                        </div>

                        <div className='bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 hover:transform hover:scale-105 transition-all duration-300'>
                            <div className='bg-[#83C9FF] rounded-full w-12 h-12 flex items-center justify-center mb-4'>
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                </svg>
                            </div>
                            <h4 className='text-white text-xl font-semibold mb-2'>Equipment Reservation</h4>
                            <p className='text-white/80 text-sm
                            min-[320px]:text-justify
                            sm:text-justify
                            md:text-justify
                            lg:text-left
                            xl:text-left
                            '>
                                Reserve equipment like projectors, sound systems, and other resources. Track availability and manage your reservations easily.
                            </p>
                        </div>

                        <div className='bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 hover:transform hover:scale-105 transition-all duration-300'>
                            <div className='bg-[#83C9FF] rounded-full w-12 h-12 flex items-center justify-center mb-4'>
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h4 className='text-white text-xl font-semibold mb-2'>Real-time Calendar</h4>
                            <p className='text-white/80 text-sm
                            min-[320px]:text-justify
                            sm:text-justify
                            md:text-justify
                            lg:text-left
                            xl:text-left
                            '>
                                Interactive calendar.
                            </p>
                        </div>

                        <div className='bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 hover:transform hover:scale-105 transition-all duration-300'>
                            <div className='bg-[#83C9FF] rounded-full w-12 h-12 flex items-center justify-center mb-4'>
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h4 className='text-white text-xl font-semibold mb-2'>Secure Authentication</h4>
                            <p className='text-white/80 text-sm
                            min-[320px]:text-justify
                            sm:text-justify
                            md:text-justify
                            lg:text-left
                            xl:text-left
                            '>
                                Role-based access for internal and external users. JWT authentication ensures secure access to your booking information.
                            </p>
                        </div>

                        <div className='bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 hover:transform hover:scale-105 transition-all duration-300'>
                            <div className='bg-[#83C9FF] rounded-full w-12 h-12 flex items-center justify-center mb-4'>
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h4 className='text-white text-xl font-semibold mb-2'>Admin Dashboard</h4>
                            <p className='text-white/80 text-sm
                            min-[320px]:text-justify
                            sm:text-justify
                            md:text-justify
                            lg:text-left
                            xl:text-left
                            '>
                                Comprehensive admin panel for managing bookings, users, facilities, and equipment. Track statistics and approve reservations efficiently.
                            </p>
                        </div>

                        <div className='bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 hover:transform hover:scale-105 transition-all duration-300'>
                            <div className='bg-[#83C9FF] rounded-full w-12 h-12 flex items-center justify-center mb-4'>
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h4 className='text-white text-xl font-semibold mb-2'>Mobile Responsive</h4>
                            <p className='text-white/80 text-sm
                            min-[320px]:text-justify
                            sm:text-justify
                            md:text-justify
                            lg:text-left
                            xl:text-left
                            '>
                                Fully responsive design optimized for all devices. Access your bookings on desktop, tablet, or mobile with seamless experience.
                            </p>
                        </div>

                        <div className='bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 hover:transform hover:scale-105 transition-all duration-300 md:col-span-2 lg:col-span-3'>
                            <div className='bg-[#83C9FF] rounded-full w-12 h-12 flex items-center justify-center mb-4'>
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                            </div>
                            <h4 className='text-white text-xl font-semibold mb-2'>Comprehensive Booking Management</h4>
                            <p className='text-white/80 text-sm
                            min-[320px]:text-justify
                            sm:text-justify
                            md:text-justify
                            lg:text-left
                            xl:text-left
                            '>
                                Create, edit, and cancel bookings with ease. Track booking status (pending, approved, completed, cancelled). 
                                Receive notifications for booking confirmations and updates. Filter and search through your booking history. 
                                Validation to prevent double-booking and scheduling conflicts.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Developer Section */}
            <div className='flex flex-col min-h-screen '
                style={{
                    backgroundImage: `url(${landingbg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'bottom',
                    backgroundRepeat: 'no-repeat',
                }}>
                <div className="backdrop-blur-lg min-h-screen backdrop-brightness-50 
                bg-gradient-to-b from-[#83C9FF] from-10% via-70% via-transparent to-90% to-transparent">
                    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
                        <h2 className="text-white text-4xl font-bold mb-12 text-center">Meet Our Developers</h2>
                        
                        <div className="grid grid-cols-4 gap-8 max-w-6xl
                        min-[320px]:grid-cols-1
                        md:grid-cols-2 
                        lg:grid-cols-4 
                        sm:grid-cols-2 
                        ">
                            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4 shadow-lg border-2 border-white/30">
                                        <img 
                                            src="https://avatars.githubusercontent.com/u/189200794?v=4" 
                                            alt="placeholder"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-white text-xl font-bold mb-2">Frances Yvonne P. Madera</h3>
                                    <p className="text-[#83C9FF] text-sm font-semibold mb-4">Backend Developer</p>
                                    <a 
                                        href="https://github.com/ctrl-fmadera" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-white hover:text-[#83C9FF] transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm">GitHub</span>
                                    </a>
                                </div>
                            </div>
                            
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4 shadow-lg border-2 border-white/30">
                                        <img 
                                            src="https://avatars.githubusercontent.com/u/189200811?v=4" 
                                            alt="placeholder"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-white text-xl font-bold mb-2">Irene B. Artiaga</h3>
                                    <p className="text-[#83C9FF] text-sm font-semibold mb-4">Backend Developer</p>
                                    <a 
                                        href="https://github.com/Irene050" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-white hover:text-[#83C9FF] transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm">GitHub</span>
                                    </a>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4 shadow-lg border-2 border-white/30">
                                        <img 
                                            src="https://avatars.githubusercontent.com/u/108736019?v=4" 
                                            alt="Frances Yvonne P. Madera"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-white text-xl font-bold mb-2">Jeremiah Martin D. Lirag</h3>
                                    <p className="text-[#83C9FF] text-sm font-semibold mb-4">Frontend Developer</p>
                                    <a 
                                        href="https://github.com/J3sterlir" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-white hover:text-[#83C9FF] transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm">GitHub</span>
                                    </a>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4 shadow-lg border-2 border-white/30">
                                        <img 
                                            src="https://avatars.githubusercontent.com/u/226326465?v=4" 
                                            alt="Frances Yvonne P. Madera"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-white text-xl font-bold mb-2">Marijoe R. San Juan</h3>
                                    <p className="text-[#83C9FF] text-sm font-semibold mb-4">Frontend Developer</p>
                                    <a 
                                        href="https://github.com/marijoe-cloud" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-white hover:text-[#83C9FF] transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm">GitHub</span>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            <Landingnav />
            <footer id="Devs" className="w-full border-t bg-[#000000] border-white/30 text-white text-sm">
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