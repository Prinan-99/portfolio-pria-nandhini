"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Home, Zap, FileText, Award, Mail, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("about");
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

  return (
    <div className="relative w-full">
      {/* Desktop Navbar */}
      <div className="hidden md:fixed md:flex md:top-4 md:inset-x-0 md:max-w-full md:mx-auto md:z-50 md:gap-32 md:items-center md:justify-center md:px-8">
        <nav
          className="relative rounded-full border shadow-input flex justify-between items-center gap-24 px-6 py-4 transition-colors duration-300 bg-[#0b1224] border-gray-700/50 dark:bg-[#0b1224] dark:border-gray-700/50"
        >
          {/* Logo */}
          <Link href="#about" onClick={(e) => handleNavClick(e, "about")} className="shrink-0 -ml-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ease-out bg-white dark:bg-white">
              <span className="font-bold text-lg transition-colors duration-500 text-black dark:text-black">PN</span>
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
                    ? "text-black bg-white shadow-[0_0_20px_rgba(255,255,255,0.7)]"
                    : "text-white hover:opacity-80 hover:scale-105"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Resume and Theme Toggle Group */}
        <div className="flex items-center gap-4 md:gap-5">
          {/* View Resume Button */}
          <a
            href="https://drive.google.com/file/d/1Lx0ardRffmBxX7cqhxEx6XNruS26GyxE/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-4 rounded-full border font-medium text-sm transition-all duration-300 hover:scale-105 bg-white text-black border-gray-700/50 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] dark:bg-white dark:text-black dark:border-gray-700/50"
          >
            <FileText size={18} />
            <span>View Resume</span>
          </a>

          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50">
        <nav className="flex justify-between items-center px-4 py-4 transition-colors duration-300 bg-[#0b1224] border-b border-gray-700/50 dark:bg-[#0b1224] dark:border-b dark:border-gray-700/50">
          {/* Logo */}
          <Link href="#about" onClick={(e) => handleNavClick(e, "about")} className="shrink-0">
            <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ease-out bg-white dark:bg-white">
              <span className="font-bold text-lg transition-colors duration-500 text-black dark:text-black">PN</span>
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
                      ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                      : "text-white hover:bg-white/10 hover:scale-110"
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
              className="flex items-center justify-center bg-transparent border-0 p-0 transition-all duration-300 text-white hover:opacity-70"
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
                {/* View Resume Button */}
                <a
                  href="https://drive.google.com/file/d/1Lx0ardRffmBxX7cqhxEx6XNruS26GyxE/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 text-white hover:bg-white/10"
                >
                  <FileText size={20} />
                  <span>View Resume</span>
                </a>

                {/* Theme Toggle */}
                <div className="w-full">
                  <ThemeToggle variant="inline" />
                </div>
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
