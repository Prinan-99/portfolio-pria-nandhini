"use client";

import React, { useState, useEffect } from "react";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";
import TextType from './ui/TextType';
import ShinyText from './ui/ShinyText';
import {LinkPreview} from './ui/link-preview';

import Image from "next/image";

export default function About() {
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
        <section id="about" className="mt-0">
            
            <CardContainer containerClassName="py-30">
                <CardBody className="h-auto w-full">
                    <CardItem translateZ={20} className="w-full">
                        <div className="grid gap-6 md:gap-10 items-start md:[grid-template-columns:1fr_1.5fr]">
                            <Image
                                src="/Images/pria-prof.jpg"
                                alt="Profile"
                                width={300}
                                height={300}
                                className="w-full h-auto rounded-lg aspect-square object-cover"
                            />
                            <div className="space-y-6 pt-0">
                                <div className="space-y-2">
                                    <div className="flex flex-wrap items-baseline gap-3">
                                    <TextType
                                        text={["Hi, I am"]}
                                        className="font-bold text-4xl md:text-5xl lg:text-6xl themed-text"
                                        typingSpeed={85}
                                        deletingSpeed={50}
                                        pauseDuration={1400}
                                        loop={false}
                                        showCursor={false}
                                        cursorCharacter="_"
                                        variableSpeed={{ min: 60, max: 120 }}
                                        cursorBlinkDuration={0.5}
                                        startOnVisible
                                    />
                                    <TextType
                                        text={["Pria"]}
                                        className="font-bold text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500"
                                        typingSpeed={85}
                                        initialDelay={900}
                                        deletingSpeed={50}
                                        pauseDuration={1400}
                                        loop={false}
                                        showCursor={false}
                                        cursorCharacter="_"
                                        variableSpeed={{ min: 60, max: 120 }}
                                        cursorBlinkDuration={0.5}
                                        startOnVisible
                                    />
                                    </div>
                                    <TextType
                                        text={["Nandhini"]}
                                        className="font-bold text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500"
                                        typingSpeed={85}
                                        initialDelay={1400}
                                        deletingSpeed={50}
                                        pauseDuration={1400}
                                        loop={false}
                                        showCursor
                                        cursorCharacter="_"
                                        variableSpeed={{ min: 60, max: 120 }}
                                        cursorBlinkDuration={0.5}
                                        startOnVisible
                                    />
                                </div>

                                <ShinyText
                                    text="AI & Data Science Engineer"
                                    speed={2}
                                    delay={0}
                                    color={isDark ? "#ffffff" : "#1a1a2e"}
                                    shineColor={isDark ? "#a78bfa" : "#4a90e2"}
                                    spread={120}
                                    direction="left"
                                    yoyo={false}
                                    pauseOnHover={true}
                                    disabled={false}
                                    className="text-lg md:text-xl lg:text-2xl font-bold"
                                />
                                <p className="text-base md:text-lg lg:text-xl themed-text leading-relaxed max-w-4xl">
                                    I build intelligent, data-driven systems and explore immersive web experiences. Focused on machine learning, scalable software, and modern UI. Open to internships and collaborations.
                                </p>
                                <div className="flex flex-wrap gap-3 pt-2">
                                    <LinkPreview
                                        url="https://github.com/Prinan-99"
                                        className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold transition-colors bg-gray-800 hover:bg-gray-900 border border-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:border-white dark:text-black"
                                    >
                                        GitHub
                                    </LinkPreview>
                                    <LinkPreview
                                        url="https://linkedin.com/in/prianandhinii"
                                        isStatic
                                        imageSrc="/Images/pria-linkedin.jpg"
                                        className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold transition-colors bg-blue-600 hover:bg-blue-700 border border-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:border-blue-600 dark:text-white"
                                    >
                                        LinkedIn
                                    </LinkPreview>
                                </div>
                            </div>
                        </div>
                    </CardItem>
                </CardBody>
            </CardContainer>
        </section>
    );
}