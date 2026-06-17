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

export default function Skills({ sections = defaultSections }: { sections?: Section[] }) {
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
                className="grid gap-6 sm:gap-0 md:grid-cols-2 lg:grid-cols-4 grid-cols-1"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.15,
                            delayChildren: 0.1,
                        },
                    },
                }}
            >
                {/* First row: Languages and Tools & Databases */}
                {sections.slice(0, 1).map((s) => (
                    <motion.div
                        key={s.title}
                        variants={{
                            hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
                            visible: {
                                opacity: 1,
                                y: 0,
                                filter: "blur(0px)",
                                transition: { duration: 0.5, ease: "easeOut" },
                            },
                        }}
                        className="space-y-5 px-6"
                    >
                        <h3 className="text-xl font-bold text-white">{s.title}</h3>
                        <ul className="flex flex-wrap gap-2">
                            {s.items.map((item, i) => (
                                <motion.li
                                    key={i}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="rounded-lg border border-indigo-400/50 bg-indigo-950/30 px-3 py-1.5 text-sm font-medium text-indigo-200"
                                >
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                ))}

                {/* Tools & Databases next to Languages */}
                {sections.slice(3, 4).map((s) => (
                    <motion.div
                        key={s.title}
                        variants={{
                            hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
                            visible: {
                                opacity: 1,
                                y: 0,
                                filter: "blur(0px)",
                                transition: { duration: 0.5, ease: "easeOut" },
                            },
                        }}
                        className="space-y-5 px-6"
                    >
                        <h3 className="text-xl font-bold text-white">{s.title}</h3>
                        <ul className="flex flex-wrap gap-2">
                            {s.items.map((item, i) => (
                                <motion.li
                                    key={i}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="rounded-lg border border-purple-400/50 bg-purple-950/30 px-3 py-1.5 text-sm font-medium text-purple-200"
                                >
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                ))}

                {/* Rest of sections in next rows */}
                {sections.slice(1, 3).map((s) => (
                    <motion.div
                        key={s.title}
                        variants={{
                            hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
                            visible: {
                                opacity: 1,
                                y: 0,
                                filter: "blur(0px)",
                                transition: { duration: 0.5, ease: "easeOut" },
                            },
                        }}
                        className="space-y-5 md:col-span-2 lg:col-span-1 px-6"
                    >
                        <h3 className="text-xl font-bold text-white">{s.title}</h3>
                        <ul className="flex flex-wrap gap-2">
                            {s.items.map((item, i) => (
                                <motion.li
                                    key={i}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="rounded-lg border border-cyan-400/50 bg-cyan-950/30 px-3 py-1.5 text-sm font-medium text-cyan-200"
                                >
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                ))}

                {/* Data Science section */}
                {sections.slice(4, 5).map((s) => (
                    <motion.div
                        key={s.title}
                        variants={{
                            hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
                            visible: {
                                opacity: 1,
                                y: 0,
                                filter: "blur(0px)",
                                transition: { duration: 0.5, ease: "easeOut" },
                            },
                        }}
                        className="space-y-5 md:col-span-2 lg:col-span-1 px-6"
                    >
                        <h3 className="text-xl font-bold text-white">{s.title}</h3>
                        <ul className="flex flex-wrap gap-2">
                            {s.items.map((item, i) => (
                                <motion.li
                                    key={i}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="rounded-lg border border-green-400/50 bg-green-950/30 px-3 py-1.5 text-sm font-medium text-green-200"
                                >
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}