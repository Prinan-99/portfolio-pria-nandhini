"use client";

import React from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Hero from "./Hero";
import { useRouter } from "next/navigation";

export default function SplashOverlay() {
  const [show, setShow] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Force dark theme on initial load
    const savedTheme = localStorage.getItem("theme");
    if (!savedTheme) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }

    // Lock body scroll while splash is visible
    document.body.style.overflow = "hidden";

    const t = setTimeout(() => {
      setShow(false);
      // Unlock scroll immediately when splash fades
      document.body.style.overflow = "unset";
      // Navigate to about section after splash
      router.push("/#about");
    }, 4000); // 4 seconds

    return () => {
      clearTimeout(t);
      document.body.style.overflow = "unset";
    };
  }, [router]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] bg-black dark:bg-black"
        >
          <Hero />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
