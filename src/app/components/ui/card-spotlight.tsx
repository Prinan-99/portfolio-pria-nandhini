"use client";

import { useMotionValue, motion, useMotionTemplate } from "motion/react";
import React, { MouseEvent as ReactMouseEvent, useState } from "react";
import { cn } from "@/lib/utils";

export const CardSpotlight = ({
  children,
  radius = 350,
  color = "#262626",
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group/spotlight p-10 rounded-md relative border border-neutral-800 bg-black dark:border-neutral-800",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute z-0 -inset-px rounded-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: mounted || isHovering ? 0.6 : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${radius * 1.5}px circle at 50% 50%,
              rgba(168, 85, 247, 0.4),
              rgba(236, 72, 153, 0.25) 40%,
              transparent 70%
            )
          `,
        }}
      />
      <motion.div
        className="pointer-events-none absolute z-0 -inset-px rounded-md"
        animate={{ opacity: isHovering ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              rgba(168, 85, 247, 0.5),
              rgba(236, 72, 153, 0.3) 40%,
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </div>
  );
};
