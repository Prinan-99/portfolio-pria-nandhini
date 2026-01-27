"use client";

import React, { useState, useEffect, useRef } from "react";
import ShinyText from "./ui/ShinyText";
import Header from "./reuseable-components/Header";
import { LinkPreview } from "./ui/link-preview";
import { motion } from "motion/react";

export default function Project() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isDark, setIsDark] = useState(true);
    const LOOP_START = 36;
    const LOOP_END = 41;

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

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoaded = () => {
            video.currentTime = LOOP_START;
            video.play().catch(() => undefined);
        };

        const handleTimeUpdate = () => {
            if (video.currentTime >= LOOP_END) {
                video.currentTime = LOOP_START;
                video.play().catch(() => undefined);
            }
        };

        video.addEventListener("loadedmetadata", handleLoaded);
        video.addEventListener("timeupdate", handleTimeUpdate);

        return () => {
            video.removeEventListener("loadedmetadata", handleLoaded);
            video.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, []);

    return (
        <section id="projects" className="py-16 sm:py-24">
            <Header title="Recent Work" />

            {/* Title */}
            <motion.div 
                className="mb-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
            >
                <motion.h1 
                    className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
                    whileHover={{ letterSpacing: "0.05em" }}
                    transition={{ type: "spring", stiffness: 200 }}
                >
                    Course Completion <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500">Predictor</span>
                </motion.h1>
                <ShinyText
                    text="ADVANCED STUDENT ANALYTICS"
                    speed={2}
                    color="#818cf8"
                    shineColor="#ffffff"
                    spread={120}
                    className="text-sm tracking-[0.3em] uppercase"
                />
            </motion.div>

            {/* Stats Section */}
            <motion.div 
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto items-center justify-items-center text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.2,
                        },
                    },
                }}
            >
                <motion.div
                    variants={{
                        hidden: { opacity: 0, scale: 0.8, rotate: -10 },
                        visible: {
                            opacity: 1,
                            scale: 1,
                            rotate: 0,
                            transition: { type: "spring", stiffness: 100 },
                        },
                    }}
                    whileHover={{ scale: 1.1, y: -5 }}
                >
                    <p className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 mb-2">Accuracy</p>
                    <ShinyText
                        text="95%"
                        speed={2.5}
                        color={isDark ? "#ffffff" : "#1a1a2e"}
                        shineColor={isDark ? "#a78bfa" : "#4a90e2"}
                        spread={120}
                        className="text-3xl sm:text-4xl font-bold"
                    />
                </motion.div>
                <motion.div
                    variants={{
                        hidden: { opacity: 0, scale: 0.8, rotate: 10 },
                        visible: {
                            opacity: 1,
                            scale: 1,
                            rotate: 0,
                            transition: { type: "spring", stiffness: 100 },
                        },
                    }}
                    whileHover={{ scale: 1.1, y: -5 }}
                >
                    <p className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 mb-2">Precision</p>
                    <ShinyText
                        text="97.4%"
                        speed={2.5}
                        color={isDark ? "#ffffff" : "#1a1a2e"}
                        shineColor={isDark ? "#a78bfa" : "#4a90e2"}
                        spread={120}
                        className="text-3xl sm:text-4xl font-bold"
                    />
                </motion.div>
                <motion.div
                    variants={{
                        hidden: { opacity: 0, scale: 0.8, rotate: -10 },
                        visible: {
                            opacity: 1,
                            scale: 1,
                            rotate: 0,
                            transition: { type: "spring", stiffness: 100 },
                        },
                    }}
                    whileHover={{ scale: 1.1, y: -5 }}
                >
                    <p className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 mb-2">Model</p>
                    <ShinyText
                        text="XGBoost"
                        speed={2.5}
                        color={isDark ? "#ffffff" : "#1a1a2e"}
                        shineColor={isDark ? "#c084fc" : "#4a90e2"}
                        spread={120}
                        className="text-3xl sm:text-4xl font-bold"
                    />
                </motion.div>
            </motion.div>

            {/* Video + Description (adjacent) */}
            <div className="grid md:grid-cols-2 gap-8 items-start mb-12">
                {/* Video */}
                <div className="aspect-video w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/50">
                    <video
                        ref={videoRef}
                        muted
                        autoPlay
                        playsInline
                        loop
                        controls={false}
                        preload="auto"
                        className="w-full h-full object-cover"
                        src="/Videos/model video.mp4"
                        aria-label="Looped demo clip (0:36-0:41)"
                    />
                </div>

                {/* Description + Tags */}
                <div>
                    <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-6 max-w-prose">
                        Developed a predictive engine leveraging historical performance and engagement metrics
                        to forecast student completion probabilities with high accuracy.
                    </p>
                    <div className="flex flex-wrap gap-3 mb-6">
                        <LinkPreview
                            url="https://github.com/Prinan-99/CourseCompletionPredictor"
                            className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold transition duration-200 bg-purple-600 hover:bg-purple-700 border border-purple-600 text-white dark:bg-purple-600 dark:hover:bg-purple-700 dark:border-purple-600"
                        >
                            GitHub Repository
                        </LinkPreview>
                        <LinkPreview
                            url="https://coursecompletion-pria.streamlit.app/"
                            isStatic
                            imageSrc="/Images/model-pic.jpg"
                            className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold transition-colors bg-red-600 hover:bg-red-700 border border-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700 dark:border-red-600"
                        >
                            Deployed Streamlit App
                            {/*<img src="/Images/pria-linkedin.jpg" alt="LinkedIn" className="h-6 w-6 rounded" />*/}
                        </LinkPreview>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {["PREDICTIVE MODELING", "PYTHON", "STREAMLIT", "DATA SCIENCE"].map((tag) => (
                            <span
                                key={tag}
                                className="px-4 py-2 bg-neutral-900/80 border border-neutral-700 rounded-lg text-sm font-medium text-gray-300 uppercase tracking-wider"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
