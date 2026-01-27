"use client";

import React, { useRef, useState, useEffect } from "react";
import Header from "./reuseable-components/Header";
import { PinContainer } from "./ui/3d-pin";
import { motion } from "motion/react";

export default function Certifications() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const theme = localStorage.getItem("theme") || "dark";
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsDark(theme === "dark");

        const handleThemeChange = () => {
            const newTheme = localStorage.getItem("theme") || "dark";
            setIsDark(newTheme === "dark");
        };

        window.addEventListener("storage", handleThemeChange);
        const observer = new MutationObserver(() => {
            const newTheme = localStorage.getItem("theme") || "dark";
            setIsDark(newTheme === "dark");
        });
        observer.observe(document.documentElement, { attributes: true });
        return () => {
            window.removeEventListener("storage", handleThemeChange);
            observer.disconnect();
        };
    }, []);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 350;
            scrollContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
            setTimeout(checkScroll, 300);
        }
    };

    return (
        <div>
            <section id="certifications" className="py-22 sm:py-24">
                <Header title="Certifications" />
                
                {/* Container with arrows */}
                <motion.div 
                    className="flex items-center gap-4 md:gap-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    {/* Left Arrow */}
                    <button
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        className={`bg-transparent border-none flex shrink-0 items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-125 ${
                            isDark
                                ? "text-white hover:shadow-[0_0_20px_rgba(147,197,253,0.8)]"
                                : "text-gray-900 hover:shadow-[0_0_20px_rgba(107,114,128,0.6)]"
                        }`}
                        aria-label="Scroll left"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Horizontal Scrollable Carousel */}
                    <div 
                        ref={scrollContainerRef}
                        onScroll={checkScroll}
                        className="flex-1 overflow-x-auto pb-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                    >
                        <div className="flex gap-4 px-2 sm:px-4 md:px-8 min-w-max">
                        <PinContainer
                            title="AWS-ML Foundations"
                            href="https://drive.google.com/file/d/12AtVA7hyUo6IRbKol13iwc_F9diX-mGX/view?usp=drive_link"
                            containerClassName="flex-shrink-0"
                        >
                            <div className="flex basis-full flex-col p-4 tracking-tight sm:basis-1/2 w-80 h-80 ">
                                <h3 className="max-w-xs pb-2! m-0! font-bold text-base text-white!">
                                    AWS ACADEMY - GRADUATE
                                </h3>
                                <div className="text-base m-0! p-0! font-normal">
                                    <span className="text-white!">
                                        Gained strong fundamentals in ML concepts and AWS-based model building.
                                    </span>
                                </div>
                                <div className="flex flex-1 w-full rounded-lg mt-4 bg-linear-to-br from-orange-500 via-red-500 to-yellow-500 items-center justify-center">
                                    {/* AWS Icon */}
                                    <div className="text-white font-bold text-3xl">AWS</div>
                                </div>
                            </div>
                        </PinContainer>
                        
                        <PinContainer
                            title="IBM Prompt Engineering"
                            href="https://drive.google.com/file/d/13OC_BZm2k92PFy2NoH6zI2r-zzIo_1WJ/view?usp=sharing"
                            containerClassName="flex-shrink-0"
                        >
                            <div className="flex basis-full flex-col p-4 tracking-tight sm:basis-1/2 w-80 h-80 ">
                                <h3 className="max-w-xs pb-2! m-0! font-bold text-base text-white!">
                                    IBM PROMPT ENGINEERING
                                </h3>
                                <div className="text-base m-0! p-0! font-normal">
                                    <span className="text-white!">
                                        Trained in IBM Prompt Engineering, mastering techniques to craft effective prompts for AI systems.
                                    </span>
                                </div>
                                <div className="flex flex-1 w-full rounded-lg mt-4 bg-linear-to-br from-blue-600 via-blue-700 to-blue-800 items-center justify-center">
                                    {/* IBM Icon */}
                                    <div className="text-white font-bold text-3xl">IBM</div>
                                </div>
                            </div>
                        </PinContainer>
                        
                        <PinContainer
                            title="Coursera-Visualizations of Tableau"
                            href="https://drive.google.com/file/d/1EivlOyptsktWOeVh8dGm2INNaVfHm5e_/view?usp=sharing"
                            containerClassName="flex-shrink-0"
                        >
                            <div className="flex basis-full flex-col p-4 tracking-tight sm:basis-1/2 w-80 h-80 ">
                                <h3 className="max-w-xs pb-2! m-0! font-bold text-base text-white!">
                                    Coursera-Visualizations of Tableau
                                </h3>
                                <div className="text-base m-0! p-0! font-normal">
                                    <span className="text-white!">
                                        Learned to create interactive data visualizations and dashboards using Tableau.
                                    </span>
                                </div>
                                <div className="flex flex-1 w-full rounded-lg mt-4 bg-linear-to-br from-red-500 via-orange-500 to-yellow-500 items-center justify-center">
                                    {/* Tableau Icon */}
                                    <div className="text-white font-bold text-3xl">📊</div>
                                </div>
                            </div>
                        </PinContainer>
                        
                        <PinContainer
                            title="DataCamp"
                            href="https://datacamp.com"
                            containerClassName="flex-shrink-0"
                        >
                            <div className="flex basis-full flex-col p-4 tracking-tight sm:basis-1/2 w-80 h-80 ">
                                <h3 className="max-w-xs pb-2! m-0! font-bold text-base text-white!">
                                    Data Camp
                                </h3>
                                <div className="text-base m-0! p-0! font-normal">
                                    <span className="text-white!">
                                        Currently Learning
                                    </span>
                                </div>
                                <div className="flex flex-1 w-full rounded-lg mt-4 bg-linear-to-br from-green-500 via-emerald-500 to-teal-500 items-center justify-center">
                                    {/* DataCamp Icon */}
                                    <div className="text-white font-bold text-3xl">DC</div>
                                </div>
                            </div>
                        </PinContainer>
                    </div>
                    </div>

                    {/* Right Arrow */}
                    <motion.button
                        onClick={() => scroll("right")}
                        disabled={!canScrollRight}
                        className={`bg-transparent border-none flex shrink-0 items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-125 ${
                            isDark
                                ? "text-white hover:shadow-[0_0_20px_rgba(147,197,253,0.8)]"
                                : "text-gray-900 hover:shadow-[0_0_20px_rgba(107,114,128,0.6)]"
                        }`}
                        aria-label="Scroll right"
                        whileHover={{ rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </motion.button>
                </motion.div>
            </section>
        </div>
    );
}