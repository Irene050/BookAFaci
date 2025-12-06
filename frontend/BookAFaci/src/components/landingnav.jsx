import React, { useState } from 'react'

function landingnav() {
    const [open, setOpen] = useState(false);
    return (
        <nav className="bg-neutral-primary fixed w-full h-24 top-0 left-0 border-b border-[#3981b1b4] backdrop-blur-lg bg-[#3981b1b4] font-inter">
            <div className="max-w-[150rem] flex flex-wrap items-center justify-between mt-5 mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="ml-[1rem] self-center text-xl text-heading font-semibold whitespace-nowrap text-white">BOOKAFACI</span>
                </a>
                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    onClick={() => setOpen(!open)}
                    aria-controls="navbar-default"
                    aria-expanded={open}
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" /></svg>
                </button>
                <div className={`${open ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
                    <ul className="font-medium flex flex-col gap-4 md:p-0 mt-4 border rounded border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary
                    min-[320px]:bg-gray-800
                    min-[375px]:bg-gray-800
                    min-[425px]:bg-gray-800
                    min-[764px]:bg-gray-800
                    min-[641px]:bg-gray-800
                    sm:bg-transparent
                    md:bg-transparent
                    lg:bg-transparent
                    xl:bg-transparent
                    ">
                        <li>
                            <a href="#" onClick={() => setOpen(false)} className="block py-2 px-3 text-white bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0 hover:text-[#b4dfff]" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="#" onClick={() => setOpen(false)} className="block py-2 px-3 text-white rounded hover:text-[#b4dfff] md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">About</a>
                        </li>
                        <li>
                            <a href="#" onClick={() => setOpen(false)} className="block py-2 px-3 text-white rounded hover:text-[#b4dfff] md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Services</a>
                        </li>
                        <li>
                            <a href="#" onClick={() => setOpen(false)} className="block py-2 px-3 text-white rounded hover:text-[#b4dfff] md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Docs</a>
                        </li>
                        <li>
                            <a href="#" onClick={() => setOpen(false)} className="block py-2 px-3 text-white rounded hover:text-[#b4dfff] md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Contact</a>
                        </li>
                        {/* Mobile-only login link */}
                        <li className="md:hidden">
                            <a href="/login" onClick={() => setOpen(false)} className="block py-2 px-3 text-white rounded hover:text-[#b4dfff]">Login</a>
                        </li>
                    </ul>
                </div>
                {/* Desktop login button - hidden on small screens */}
                <div className="hidden md:flex items-center">
                    <a href="/login" className="ml-4">
                        <span className="self-center text-[1rem] font-inter font-bold mix-blend-screen bg-white px-4 py-2 border border-white rounded-full hover:text-white hover:bg-transparent transition-all">LOGIN</span>
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default landingnav