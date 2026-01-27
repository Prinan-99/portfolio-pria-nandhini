"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import ShinyText from "./ui/ShinyText";
import { motion } from "motion/react";

type Section = {
    title: string;
    items: string[];
};

const defaultSections: Section[] = [
    { title: "Expertise", items: ["Python", "Java", "SQL-PostgreSql", "HTML/CSS"] },
    {
        title: "Frameworks",
        items: ["Scikit-Learn", "Pandas", "Streamlit", "Git"],
    },
    {
        title: "Analytics",
        items: ["Tableau", "EDA", "Visualisation", "Data Cleaning"],
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
        <section id="skills" className="mx-auto w-full py-16 sm:py-24">
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
                className="grid gap-6 sm:gap-8 md:grid-cols-3"
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
                {sections.map((s) => (
                    <motion.div
                        key={s.title}
                        variants={{
                            hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
                            visible: {
                                opacity: 1,
                                y: 0,
                                filter: "blur(0px)",
                                transition: { type: "spring", stiffness: 80 },
                            },
                        }}
                    >
                        <SectionCard title={s.title} items={s.items} />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}

function SectionCard({ title, items, className }: { title: string; items: string[]; className?: string }) {
    return (
        <div
            className={cn(
                "rounded-3xl border border-neutral-800/80 bg-neutral-900/50 backdrop-blur-sm",
                "shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]",
                "p-6 sm:p-8",
                className
            )}
        >
            <div className="flex items-center gap-4">
                <h3 className="uppercase">
                    <ShinyText
                        text={title}
                        speed={2}
                        color="#93c5fd"
                        shineColor="#ffffff"
                        spread={120}
                        direction="left"
                        className="tracking-[0.25em] text-xs sm:text-sm text-indigo-300/90"
                    />
                </h3>
                <div className="h-px flex-1 bg-neutral-800" />
            </div>

            <ul className="mt-6 space-y-5">
                {items.map((label) => (
                    <li key={label} className="group flex items-center justify-between hover:bg-indigo-500/10 hover:pl-3 transition-all duration-300 rounded-lg py-2 -ml-2 pl-2">
                        <span className="text-lg sm:text-xl font-medium text-neutral-300 transition-colors duration-300 group-hover:text-indigo-400 group-hover:font-semibold">
                            {label}
                        </span>
                        <span className="relative">
                            <span className="absolute inset-0 rounded-full bg-indigo-500 blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300 scale-150" />
                            <span className="relative block w-2 h-2 rounded-full bg-indigo-500/20 group-hover:bg-indigo-500 transition-all duration-300 group-hover:scale-150 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.8)]" />
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}