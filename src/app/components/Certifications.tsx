"use client";

import React, { useRef, useState, useEffect } from "react";
import Header from "./reuseable-components/Header";
import { FocusCards } from "./ui/focus-cards";
import { motion } from "motion/react";

export default function Certifications() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

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
            }
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const certifications = [
        {
            title: "AWS Academy Graduate – ML Foundations",
            src: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=800&auto=format&fit=crop",
            description: "ML basics, data preparation, model training on AWS",
            link: "https://drive.google.com/file/d/12AtVA7hyUo6IRbKol13iwc_F9diX-mGX/view?usp=drive_link"
        },
        {
            title: "AWS Academy Graduate – ML for NLP",
            src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop",
            description: "NLP preprocessing, tokenization, embeddings, text classification",
            link: "https://drive.google.com/file/d/1y7tWLrWHev8LqKdH2AB7fs5bqs36x4By/view?usp=sharing"
        },
        {
            title: "Prompt Engineering IBM Skills Network",
            src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
            description: "Mastered techniques to craft effective prompts for AI systems. Completed June 2024.",
            link: "https://drive.google.com/file/d/13OC_BZm2k92PFy2NoH6zI2r-zzIo_1WJ/view?usp=sharing"
        }
    ];

    return (
        <div>
            <section id="certifications" className="py-22 sm:py-24">
                <div className="mb-8">
                    <Header title="Certifications" />
                </div>
                
                <motion.div 
                    className="flex items-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    {/* Horizontal Scrollable Container */}
                    <div 
                        ref={scrollContainerRef}
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
                </motion.div>
            </section>
        </div>
    );
}
