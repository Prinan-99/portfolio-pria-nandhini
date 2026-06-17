"use client";

import React, { useState, useEffect } from "react";
import ShinyText from "./ui/ShinyText";
import { motion } from "motion/react";

type Section = {
    title: string;
    items: string[];
};

const defaultSections: Section[] = [
    { title: "Languages", items: ["Python", "Java", "HTML", "CSS"] },
    {
        title: "AI & Machine Learning",
        items: ["LLMs", "RAG Architecture", "Vector Embeddings", "NLP", "Prompt Engineering", "ML Algorithms"],
    },
    {
        title: "Frameworks & Libraries",
        items: ["Langchain", "HuggingFace", "Scikit-learn", "Pandas", "NumPy"],
    },
    {
        title: "Tools & Databases",
        items: ["PostgreSQL", "Tableau", "ChromaDB", "CrewAI", "n8n", "GitHub"],
    },
    {
        title: "Data Science",
        items: ["EDA", "Data Preprocessing", "Feature Selection", "Model Tuning", "Data Visualization"],
    },
];

const skillStyles = [
    {
        border: "border-sky-400/45",
        bg: "bg-sky-500/10",
        text: "text-sky-700 dark:text-sky-200",
        glow: "shadow-sky-500/10",
    },
    {
        border: "border-violet-400/45",
        bg: "bg-violet-500/10",
        text: "text-violet-700 dark:text-violet-200",
        glow: "shadow-violet-500/10",
    },
    {
        border: "border-cyan-400/45",
        bg: "bg-cyan-500/10",
        text: "text-cyan-700 dark:text-cyan-200",
        glow: "shadow-cyan-500/10",
    },
    {
        border: "border-emerald-400/45",
        bg: "bg-emerald-500/10",
        text: "text-emerald-700 dark:text-emerald-200",
        glow: "shadow-emerald-500/10",
    },
    {
        border: "border-fuchsia-400/45",
        bg: "bg-fuchsia-500/10",
        text: "text-fuchsia-700 dark:text-fuchsia-200",
        glow: "shadow-fuchsia-500/10",
    },
];

export default function Skills({ sections = defaultSections }: { sections?: Section[] }) {
    const [isDark, setIsDark] = useState(true);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1,
            },
        },
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.45, ease: "easeOut" },
        },
    };

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

    return (
        <section id="skills" className="mx-auto w-full py-20 sm:py-24">
            <div className="text-center mb-10 sm:mb-14">
                <p className="uppercase tracking-[0.3em] text-xs sm:text-sm text-indigo-300/80">Capabilities</p>
                <h2 className="mt-3 font-extrabold">
                    <ShinyText
                        text="Technical"
                        speed={2}
                        color={isDark ? "#e5e7eb" : "#1a1a2e"}
                        shineColor={isDark ? "#a78bfa" : "#4a90e2"}
                        spread={120}
                        direction="left"
                        pauseOnHover
                        className="inline-block align-baseline text-4xl sm:text-5xl md:text-6xl"
                    />
                    <span className="ml-3 text-4xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                        Stack
                    </span>
                </h2>
            </div>

            <motion.div
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={containerVariants}
            >
                {sections.map((section, sectionIndex) => {
                    const style = skillStyles[sectionIndex % skillStyles.length];

                    return (
                        <motion.div
                            key={section.title}
                            variants={sectionVariants}
                            className={`flex min-h-52 flex-col rounded-lg border ${style.border} bg-[var(--card)] p-5 shadow-lg ${style.glow}`}
                        >
                            <h3 className="text-lg font-bold leading-snug text-[var(--fg)]">{section.title}</h3>
                            <ul className="mt-5 flex flex-wrap content-start gap-2">
                                {section.items.map((item) => (
                                    <motion.li
                                        key={item}
                                        whileHover={{ scale: 1.04, y: -2 }}
                                        className={`m-0 rounded-lg border ${style.border} ${style.bg} px-3 py-1.5 text-sm font-medium leading-tight ${style.text}`}
                                    >
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}
