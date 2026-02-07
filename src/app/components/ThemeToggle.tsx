"use client";
import React, { useEffect, useState } from "react";

export function ThemeToggle({ variant = "fixed" }: { variant?: "fixed" | "inline" }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isPixelating, setIsPixelating] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const initial = stored === "dark" ? "dark" : "light";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(initial);
    if (initial === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
    localStorage.setItem("theme", next);
    setIsPixelating(true);
    setTimeout(() => setIsPixelating(false), 520);
  };

  const isDark = theme === "dark";

  if (variant === "inline") {
    // Inline version for mobile menu
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 text-white hover:bg-white/10"
      >
        {isDark ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364 6.364-1.414-1.414M7.05 7.05 5.636 5.636m12.728 0-1.414 1.414M7.05 16.95l-1.414 1.414" />
            </svg>
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
            </svg>
            <span>Dark Mode</span>
          </>
        )}
      </button>
    );
  }

  // Fixed version for desktop
  return (
    <>
      {isPixelating && <div className="pixelate-overlay" aria-hidden="true" />}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className={`hidden md:flex fixed top-6 right-6 z-50 w-14 h-14 rounded-full transition-all duration-300 items-center justify-center shadow-lg ${
          isDark
            ? "bg-white text-gray-900 hover:shadow-[0_0_20px_rgba(255,255,255,0.8)]"
            : "bg-gray-900 text-white hover:shadow-[0_0_20px_rgba(0,0,0,0.6)]"
        }`}
      >
        {isDark ? (
          // Sun icon for dark mode (click to go light)
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364 6.364-1.414-1.414M7.05 7.05 5.636 5.636m12.728 0-1.414 1.414M7.05 16.95l-1.414 1.414" />
          </svg>
        ) : (
          // Moon icon for light mode (click to go dark)
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
          </svg>
        )}
      </button>
    </>
  );
}
