"use client";

import React, { useRef, useState, useEffect } from "react";
import Header from "./reuseable-components/Header";
import { FocusCards } from "./ui/focus-cards";
import { motion } from "motion/react";

export default function Certifications() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isDark, setIsDark] = useState(true);
    const [isPaused, setIsPaused] = useState(false);

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

    // Auto-scroll functionality
    useEffect(() => {
        if (!scrollContainerRef.current || isPaused) return;

        const autoScroll = setInterval(() => {
            if (scrollContainerRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
                
                // Check if we've reached the end
                if (scrollLeft >= scrollWidth - clientWidth - 10) {
                    // Reset to beginning
                    scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    // Scroll to next card (approximately 400px)
                    scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
                }
            }
        }, 3000); // Change card every 3 seconds

        return () => clearInterval(autoScroll);
    }, [isPaused]);

    // Check scroll position on mount
    useEffect(() => {
        // Delay to ensure container is rendered
        const timer = setTimeout(() => {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollLeft = 0; // Ensure we start at the beginning
                checkScroll();
            }
        }, 100);
        return () => clearTimeout(timer);
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
            const scrollAmount = 400;
            scrollContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
            setTimeout(checkScroll, 300);
        }
    };

    const certifications = [
        {
            title: "AWS Academy - ML Foundations Graduate",
            src: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=800&auto=format&fit=crop",
            description: "Gained strong fundamentals in ML concepts and AWS-based model building.",
            link: "https://drive.google.com/file/d/12AtVA7hyUo6IRbKol13iwc_F9diX-mGX/view?usp=drive_link"
        },
        {
            title: "AWS Academy - ML For NLP",
            src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop",
            description: "Developed NLP expertise using AWS services for text analysis and language processing.",
            link: "https://drive.google.com/file/d/1y7tWLrWHev8LqKdH2AB7fs5bqs36x4By/view?usp=sharing"
        },
        {
            title: "IBM Prompt Engineering",
            src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
            description: "Mastered techniques to craft effective prompts for AI systems.",
            link: "https://drive.google.com/file/d/13OC_BZm2k92PFy2NoH6zI2r-zzIo_1WJ/view?usp=sharing"
        },
        {
            title: "Coursera - Tableau Visualizations",
            src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
            description: "Created interactive data visualizations and dashboards using Tableau.",
            link: "https://drive.google.com/file/d/1EivlOyptsktWOeVh8dGm2INNaVfHm5e_/view?usp=sharing"
        },
        {
            title: "DataCamp - Data Science",
            src: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop",
            description: "Currently Learning Advanced Data Science Techniques",
            link: "https://datacamp.com"
        }
    ];

    return (
        <div>
            <section id="certifications" className="py-22 sm:py-24">
                <div className="flex items-center justify-between mb-8">
                    <Header title="Certifications" />
                    <div className="flex items-center gap-2">
                        {/* Left Arrow - Show only when can scroll left */}
                        {canScrollLeft && (
                            <button
                                onClick={() => scroll("left")}
                                className={`flex items-center justify-center bg-transparent border-none p-0 transition-all duration-300 hover:scale-125 ${
                                    isDark
                                        ? "text-white hover:shadow-[0_0_15px_rgba(147,197,253,0.8)]"
                                        : "text-gray-900 hover:shadow-[0_0_15px_rgba(107,114,128,0.6)]"
                                }`}
                                aria-label="Previous certification"
                                title="Previous"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                        )}
                        
                        {/* Right Arrow - Show only when can scroll right */}
                        {canScrollRight && (
                            <button
                                onClick={() => scroll("right")}
                                className={`flex items-center justify-center bg-transparent border-none p-0 transition-all duration-300 hover:scale-125 ${
                                    isDark
                                        ? "text-white hover:shadow-[0_0_15px_rgba(147,197,253,0.8)]"
                                        : "text-gray-900 hover:shadow-[0_0_15px_rgba(107,114,128,0.6)]"
                                }`}
                                aria-label="Next certification"
                                title="Next"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
                
                <motion.div 
                    className="flex items-center gap-4 md:gap-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    {/* Left Arrow - Desktop Only */}
                    <button
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        className={`hidden md:flex bg-transparent border-none shrink-0 items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-125 ${
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

                    {/* Horizontal Scrollable Container */}
                    <div 
                        ref={scrollContainerRef}
                        onScroll={checkScroll}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setIsPaused(false)}
                        className="flex-1 overflow-x-auto pb-8 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                    >
                        <div className="px-4">
                            <FocusCards cards={certifications} />
                        </div>
                    </div>

                    {/* Right Arrow - Desktop Only */}
                    <button
                        onClick={() => scroll("right")}
                        disabled={!canScrollRight}
                        className={`hidden md:flex bg-transparent border-none shrink-0 items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-125 ${
                            isDark
                                ? "text-white hover:shadow-[0_0_20px_rgba(147,197,253,0.8)]"
                                : "text-gray-900 hover:shadow-[0_0_20px_rgba(107,114,128,0.6)]"
                        }`}
                        aria-label="Scroll right"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </motion.div>
            </section>
        </div>
    );
}