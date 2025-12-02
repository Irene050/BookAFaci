import React from 'react'
import { Link } from 'react-router';
import landingbg from "../assets/left.jpeg";
import Landingnav from '../components/landingnav';

function landing() {
    return (
        <div className="flex min-h-screen transition-all">
            <main className="flex-1 bg-center bg-cover min-h-screen relative pb-5 
                  min-[320px]:w-[350px] max-[640px]:w-[450px] md:w-[450px] lg:w-[450px]"
                style={{
                    backgroundImage: `url(${landingbg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}>
                <Landingnav />
                <div className='ml-[10rem] flex h-screen v-screen items-center text-white font-bold text-5xl gap-5'>
                    <div className='font-inter text-[3rem] flex grow group relative justify-normal'>
                        <article className="text-wrap">
                            <h3>BOOKAFACI</h3>
                            <p className='text-[2rem] font-normal'>Description & tagline</p>
                            <Link to="/user-select" className="mt-4 inline-block bg-white/20 hover:bg-white/30 text-white font-normal text-lg py-2 px-4 rounded">
                                Get Started
                            </Link>
                        </article>
                    </div>
                    <div className='font-inter flex grow group relative justify-center'>LOGO</div>
                </div>
            </main>
        </div>
    )
}

export default landing