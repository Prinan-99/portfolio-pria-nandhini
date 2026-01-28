"use client";

import React from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Hero from "./Hero";
import { useRouter } from "next/navigation";

export default function SplashOverlay() {
  const [show, setShow] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "dark";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(theme === "dark");
  }, []);

  useEffect(() => {
    // Only show splash overlay in dark theme
    if (!isDark) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(false);
      return;
    }

    // lock body scroll while splash is visible
    document.body.style.overflow = "hidden";

    const t = setTimeout(() => {
      setShow(false);
      // Unlock scroll immediately when splash fades
      document.body.style.overflow = "unset";
      // Navigate to home page after splash
      router.push("/");
    }, 4000); // 4 seconds

    return () => {
      clearTimeout(t);
      document.body.style.overflow = "unset";
    };
  }, [router, isDark]);

  return (
    <AnimatePresence>
      {show && isDark && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-9999 bg-black"
        >
          <Hero />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
