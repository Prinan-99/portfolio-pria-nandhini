"use client";

import React from 'react'
import { cn } from '../../../lib/utils';
import { FlipWords } from './ui/flip-words';
import { CardSpotlight } from './ui/card-spotlight';
import TextType from './ui/TextType';

export default function Hero() {
    return (
        <section id='home' className='overflow-hidden'>
            <CardSpotlight className='h-[90vh] lg:h-screen w-full p-0 border-0'>
                <div className='relative h-full w-full flex justify-center items-center'>

                    <div
                        className={cn(
                            "absolute inset-0 z-0",
                            "bg-size-[20px_20px]",
                            "bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                            "dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
                        )}
                    />

                    {/* Radial gradient for the container to give a faded look */}
                    <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center bg-white mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black dark:mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

                    <div className='relative z-20 text-center px-4'>
                       {/* <h2 className='text-amber-950 dark:text-neutral-300 text-xl py-2.5'>AI & DS Student</h2>*/}
                        <h2 className='text-6xl sm:text-7xl md:text-7xl lg:text-7xl font-bold text-black dark:text-white leading-tight'>
                            Design. <FlipWords words={["Code. ", "Train.", "Build.", "AI&ML."]} duration={1000} /><br />Intelligence.
                        </h2>
                        <TextType
                            text={["@Pria Nandhini's Portfolio"]}
                            className='text-2xl sm:text-3xl md:text-3xl text-amber-600 dark:text-neutral-300 md:tracking-wider py-6'
                            typingSpeed={80}
                            deletingSpeed={0}
                            pauseDuration={1200}
                            loop={false}
                            showCursor={false}
                            startOnVisible
                        />
                        <div className='flex justify-center my-8'>
                            <a href="#about" className='px-10 py-4 text-lg sm:text-xl rounded-lg bg-linear-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:from-purple-500 hover:to-indigo-500 transition-all duration-300'>
                                Explore My Portfolio
                            </a>
                        </div>
                    </div>

                </div>
            </CardSpotlight>
        </section>
    );
}
