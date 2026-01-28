"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("about");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Detect scroll position to highlight active nav item
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "skills", "projects", "certifications", "contact"];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme handling: default light-blue professional, dark as alternative
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

  const navItems = [
    { label: "Home", href: "#about", id: "about" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Certifications", href: "#certifications", id: "certifications" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      // Apply navbar offset only for "about" section, no offset for others
      const navbarHeight = targetId === "about" ? 60 : 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const isActive = (id: string) => activeSection === id;
  const isDark = theme === "dark";

  return (
    <div className="relative w-full flex items-center justify-center">
      <div className="fixed top-4 inset-x-0 max-w-2xl mx-auto z-50">
        <nav
          className={`relative rounded-full border shadow-input flex justify-between items-center space-x-4 px-8 py-4 transition-colors duration-300 ${
            isDark
              ? "bg-[#0b1224] border-gray-700/50"
              : "bg-white border-blue-200 shadow-lg"
          }`}
        >
          {/* Logo */}
          <Link href="#about" onClick={(e) => handleNavClick(e, "about")} className="shrink-0 -ml-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ease-out ${isDark ? "bg-white" : "bg-blue-500"}`}>
              <span className={`font-bold text-lg transition-colors duration-500 ${isDark ? "text-black" : "text-white"}`}>PN</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`text-sm font-medium transition-all duration-500 ease-out px-4 py-2 rounded-full ${
                  isActive(item.id)
                    ? isDark
                      ? "text-black bg-white shadow-[0_0_20px_rgba(255,255,255,0.7)]"
                      : "text-white bg-blue-500 shadow-[0_0_20px_rgba(74,144,226,0.6)]"
                    : isDark
                      ? "text-white hover:opacity-80 hover:scale-105"
                      : "text-gray-700 hover:opacity-70 hover:scale-105"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
