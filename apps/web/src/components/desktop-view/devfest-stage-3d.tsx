"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { FC, MouseEvent } from "react";
import { DevFestCountdown } from "./devfest-countdown";

export const DevFestStage3D: FC = () => {
  // Motion values normalized between -0.5 and 0.5 for the entire stage
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for fluid movement and gentle return
  const springConfig = { damping: 25, stiffness: 140, mass: 0.8 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Stage 3D perspective tilt angling towards the mouse (gentle)
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-7, 7]);
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [7, -7]);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <aside
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
      className="relative flex min-h-[580px] w-full select-none items-center justify-center overflow-hidden bg-[#0d1117] p-6 md:p-12 lg:min-h-screen lg:w-1/2"
    >
      {/* Background Google Glow Orbs container (isolated to preserve 3D context) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#4285F4]/35 blur-[100px]" />
        <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-[#EA4335]/25 blur-[90px]" />
        <div className="absolute top-1/2 left-1/3 h-72 w-72 rounded-full bg-[#FBBC05]/20 blur-[80px]" />
        <div className="absolute right-10 bottom-1/4 h-64 w-64 rounded-full bg-[#34A853]/25 blur-[85px]" />
        <div className="absolute inset-0 bg-grid-dots-dark opacity-40" />
      </div>

      {/* Interactive 3D Perspective Stage */}
      <motion.div
        style={{
          transformPerspective: 1200,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="transform-style-3d relative z-10 flex h-[560px] w-full max-w-xl items-center justify-center"
      >
        {/* New 3D Countdown Console facing towards cursor */}
        <DevFestCountdown stageMouseX={smoothMouseX} stageMouseY={smoothMouseY} />
      </motion.div>

      <div className="pointer-events-none absolute right-6 bottom-4 left-6 flex items-center justify-between text-[11px] text-gray-500">
        <span className="flex items-center gap-1 font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4285F4]" />
          Interactive 3D Festival Space
        </span>
        <span className="hidden sm:inline">Countdown timer dynamically angles towards your cursor</span>
      </div>
    </aside>
  );
};
