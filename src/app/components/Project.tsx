"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "./reuseable-components/Header";
import { LinkPreview } from "./ui/link-preview";
import { motion, AnimatePresence } from "motion/react";

interface Project {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    video: string;
    playbackRate?: number;
    tags: string[];
    links: { label: string; url: string }[];
}

export default function Project() {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window === "undefined") {
            return true;
        }

        const theme = localStorage.getItem("theme") || "dark";
        return theme === "dark";
    });
    const [currentProject, setCurrentProject] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

    const projects: Project[] = [
        {
            id: "course-predictor",
            title: "Course Completion",
            subtitle: "Predictor",
            description: "Built a student analytics system using Python, Streamlit, and ML models with automated preprocessing and feature engineering. Enabled identification of learning patterns for data-driven decisions.",
            video: "/Videos/model video.mp4",
            playbackRate: 2.5,
            tags: ["PREDICTIVE MODELING", "PYTHON", "STREAMLIT", "DATA SCIENCE"],
            links: [
                { label: "GitHub Repository", url: "https://github.com/Prinan-99/CourseCompletionPredictor" },
                { label: "Deployed Streamlit App", url: "https://coursecompletion-pria.streamlit.app/" }
            ]
        },
        {
            id: "agromind-rag",
            title: "AgroMind RAG",
            subtitle: "AI Agronomist",
            description: "Built an AI-powered agricultural assistant leveraging RAG architecture, combining vector search with large language models to deliver context-aware, hallucination-reduced farming recommendations backed by domain-specific knowledge bases.",
            video: "/Videos/agromiindrag.mp4",
            playbackRate: 2.5,
            tags: ["RAG ARCHITECTURE", "LLMs", "VECTOR EMBEDDINGS", "NLP"],
            links: [
                { label: "GitHub Repository", url: "https://github.com/Prinan-99/AgroMind-AI-Agronomist" }
            ]
        },
        {
            id: "csv-agent",
            title: "AI-Powered CSV",
            subtitle: "Data Analysis Agent",
            description: "Built a multi-agent AI system that analyzes CSV files, performs preprocessing, and extracts data automatically. Developed an interactive web application for real-time data exploration and automated report generation.",
            video: "/Videos/crewai.mp4",
            playbackRate: 2.5,
            tags: ["CrewAI", "MULTI-AGENT", "DATA ANALYSIS", "WEB APP"],
            links: [
                { label: "Live Demo", url: "https://atlas-csv-crew-ai-agent.vercel.app/" }
            ]
        }
    ];

    useEffect(() => {
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
        if (isPaused) {
            if (autoScrollRef.current) clearInterval(autoScrollRef.current);
            return;
        }

        autoScrollRef.current = setInterval(() => {
            setDirection(1);
            setCurrentProject((prev) => (prev + 1) % projects.length);
        }, 5000);

        return () => {
            if (autoScrollRef.current) clearInterval(autoScrollRef.current);
        };
    }, [isPaused, projects.length]);

    const project = projects[currentProject];

    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (dir: number) => ({
            zIndex: 0,
            x: dir < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    return (
        <section id="projects" className="py-16 sm:py-24">
            <div className="flex items-center justify-between mb-8">
                <Header title="Recent Work" />
                <div className="flex items-center gap-4">
                    {/* Project Counter */}
                    <span className="text-gray-400 text-sm font-medium hidden sm:block">
                        {currentProject + 1} / {projects.length}
                    </span>

                    {/* Navigation Arrows */}
                    <div className="flex items-center gap-3">
                        <motion.button
                            onClick={() => {
                                setDirection(-1);
                                setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center justify-center p-2 rounded-full border transition-all duration-300 ${
                                isDark
                                    ? "border-neutral-700 hover:border-indigo-500 text-white hover:bg-indigo-500/10"
                                    : "border-neutral-300 hover:border-indigo-500 text-gray-900 hover:bg-indigo-500/10"
                            }`}
                            aria-label="Previous project"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </motion.button>

                        <motion.button
                            onClick={() => {
                                setDirection(1);
                                setCurrentProject((prev) => (prev + 1) % projects.length);
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center justify-center p-2 rounded-full border transition-all duration-300 ${
                                isDark
                                    ? "border-neutral-700 hover:border-indigo-500 text-white hover:bg-indigo-500/10"
                                    : "border-neutral-300 hover:border-indigo-500 text-gray-900 hover:bg-indigo-500/10"
                            }`}
                            aria-label="Next project"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Project Carousel */}
            <motion.div 
                className="relative mt-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
            >
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentProject}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                        className="w-full"
                    >
                        <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-8">
                            {/* Grid Layout */}
                            <div className="grid lg:grid-cols-2 gap-8 items-center">
                                {/* Project video */}
                                <motion.div 
                                    className="aspect-video w-full rounded-xl overflow-hidden border border-neutral-700"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <video
                                        key={project.video}
                                        src={project.video}
                                        aria-label={`${project.title} ${project.subtitle} demo video`}
                                        className="w-full h-full object-cover"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="metadata"
                                        onLoadedMetadata={(event) => {
                                            event.currentTarget.playbackRate = project.playbackRate ?? 1;
                                        }}
                                    />
                                </motion.div>

                                {/* Content */}
                                <div className="space-y-6">
                                    {/* Title */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <h2 className="text-4xl md:text-5xl font-bold">
                                            {project.title} <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500">{project.subtitle}</span>
                                        </h2>
                                    </motion.div>

                                    {/* Description */}
                                    <motion.p 
                                        className="text-lg text-gray-300 leading-relaxed"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {project.description}
                                    </motion.p>

                                    {/* Tags */}
                                    <motion.div 
                                        className="flex flex-wrap gap-2"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-4 py-2 bg-neutral-800/50 border border-neutral-700 rounded-lg text-sm font-medium text-gray-300 uppercase tracking-wider"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </motion.div>

                                    {/* Links */}
                                    <motion.div 
                                        className="flex flex-wrap gap-3 pt-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        {project.links.map((link) => (
                                            <LinkPreview
                                                key={link.label}
                                                url={link.url}
                                                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition duration-200 bg-indigo-600 hover:bg-indigo-700 border border-indigo-600 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:border-indigo-600"
                                            >
                                                {link.label}
                                            </LinkPreview>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </section>
    );
}
