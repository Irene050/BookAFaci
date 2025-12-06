import React from 'react'
import { Link } from 'react-router';
import landingbg from "../assets/left.jpeg";
import Landingnav from '../components/landingnav';

function LandingPage() {
    return (
        <div className="flex min-h-screen transition-all font-inter">
            <title>BookAFaci</title>
            
            <main className="flex-1 bg-center bg-cover min-h-screen relative pb-5 
                  min-[320px]:w-[350px] max-[640px]:w-[450px] md:w-[450px] lg:w-[450px]"
                style={{
                    backgroundImage: `url(${landingbg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}>
                
                <div className='flex h-screen v-screen items-center text-white font-bold text-5xl gap-5
                    min-[320px]:flex-col 
                    min-[320px]:mt-[15rem]
                    min-[320px]:ml-[0rem]

                    max-[640px]:flex-col 
                    max-[640px]:mt-[15rem]
                    max-[640px]:ml-[0rem]

                    md:flex-row
                    md:mt-0
                    md:ml-[5rem]

                    lg:flex-row
                    lg:mt-0
                    lg:ml-[10rem]'
                    >
                    <div className='text-[3rem] grow group relative justify-normal'>
                        <div className='text-wrap'>
                            <article className='mb-3'>
                                <h3>BOOKAFACI</h3>
                                <p className='text-[2rem] font-normal'>Description & tagline</p>
                            </article>

                            <a className='text-white bg-transparent border p-2 rounded-full text-[1.5rem] hover:bg-white hover:text-black mix-blend-screen transition-all' href="/user-select">Get Started</a>
                        </div>
                    </div>
                    <div className='flex grow group relative justify-center'>LOGO</div>
                </div>
                <Landingnav />
            </main>
        </div>
    )
}
export default LandingPage