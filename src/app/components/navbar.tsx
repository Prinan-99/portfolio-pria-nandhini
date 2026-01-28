"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Home, Zap, FileText, Award, Mail, Sun, Moon, Menu, X } from "lucide-react";

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("about");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Theme handling: force dark theme as default
  useEffect(() => {
    // Always force dark theme
    const theme = "dark";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(theme);
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  }, []);

  const navItems = [
    { label: "Home", href: "#about", id: "about", icon: Home },
    { label: "Skills", href: "#skills", id: "skills", icon: Zap },
    { label: "Projects", href: "#projects", id: "projects", icon: FileText },
    { label: "Certifications", href: "#certifications", id: "certifications", icon: Award },
    { label: "Contact", href: "#contact", id: "contact", icon: Mail },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
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
    <div className="relative w-full">
      {/* Desktop Navbar */}
      <div className="hidden md:fixed md:flex md:top-4 md:inset-x-0 md:max-w-2xl md:mx-auto md:z-50">
        <nav
          className={`relative rounded-full border shadow-input flex justify-between items-center space-x-4 px-8 py-4 transition-colors duration-300 w-full ${
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

          {/* Desktop Navigation Links */}
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

      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50">
        <nav className={`flex justify-between items-center px-4 py-4 transition-colors duration-300 ${
          isDark
            ? "bg-[#0b1224] border-b border-gray-700/50"
            : "bg-white border-b border-blue-200"
        }`}>
          {/* Logo */}
          <Link href="#about" onClick={(e) => handleNavClick(e, "about")} className="shrink-0">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ease-out ${isDark ? "bg-white" : "bg-blue-500"}`}>
              <span className={`font-bold text-lg transition-colors duration-500 ${isDark ? "text-black" : "text-white"}`}>PN</span>
            </div>
          </Link>

          {/* Mobile Navigation Icons */}
          <div className="flex gap-3 items-center ml-4">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                    isActive(item.id)
                      ? isDark
                        ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                        : "bg-blue-500 text-white shadow-[0_0_15px_rgba(74,144,226,0.5)]"
                      : isDark
                        ? "text-white hover:bg-white/10 hover:scale-110"
                        : "text-gray-700 hover:bg-gray-100 hover:scale-110"
                  }`}
                  title={item.label}
                >
                  <IconComponent size={20} />
                </Link>
              );
            })}

            {/* Mobile Hamburger Menu for Theme Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`flex items-center justify-center bg-transparent border-0 p-0 transition-all duration-300 ${
                isDark
                  ? "text-white hover:opacity-70"
                  : "text-gray-700 hover:opacity-70"
              }`}
              title="Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-transparent"
            >
              <div className="flex flex-col p-4 gap-3">
                {/* Theme Toggle */}
                <button
                  onClick={() => {
                    const newTheme = isDark ? "light" : "dark";
                    localStorage.setItem("theme", newTheme);
                    document.documentElement.classList.toggle("dark");
                    setTheme(newTheme as "dark" | "light");
                  }}
                  className={`flex items-center justify-center gap-3 w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isDark
                      ? "text-white hover:bg-white/10"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                  <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Navbar Spacer */}
      <div className="md:hidden h-20" />
    </div>
  );
}
