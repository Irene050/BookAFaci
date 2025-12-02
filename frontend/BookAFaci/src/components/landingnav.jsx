import React from 'react'

function landingnav() {
    return (
        <nav class="bg-neutral-primary fixed w-full h-24 top-0 start-0 border-b border-[#3981b1b4] border-default backdrop-blur-lg bg-[#3981b1b4]">
            <div class="max-w-[150rem] flex flex-wrap items-center justify-between mt-5 mx-auto p-4">
                <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <span class="ml-[5rem] self-center text-xl text-heading font-semibold whitespace-nowrap text-white">BOOKAFACI</span>
                </a>
                <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" aria-controls="navbar-default" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14" /></svg>
                </button>
                <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul class="font-medium flex flex-col gap-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
                        <li>
                            <a href="#" class="block py-2 px-3 text-white bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0 hover:text-[#b4dfff]" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="#" class="block py-2 px-3 text-white rounded hover:text-[#b4dfff] md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">About</a>
                        </li>
                        <li>
                            <a href="#" class="block py-2 px-3 text-white rounded hover:text-[#b4dfff] md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Services</a>
                        </li>
                        <li>
                            <a href="#" class="block py-2 px-3 text-white rounded hover:text-[#b4dfff] md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Docs</a>
                        </li>
                        <li>
                            <a href="#" class="block py-2 px-3 text-white rounded hover:text-[#b4dfff] md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Contact</a>
                        </li>
                    </ul>
                </div>
                <a href="/login" className="mt-[-1px] ml-[-65rem] mr-[1rem]">
                    <span class="self-center text-xl text-heading font-inter whitespace-nowrap font-bold text-black mix-blend-screen bg-white px-[15px] py-[5px] border-white border-2 rounded-[25px] hover:bg-transparent hover:text-white transition-all">LOGIN</span>
                </a>
            </div>
        </nav>
    )
}

export default landingnav