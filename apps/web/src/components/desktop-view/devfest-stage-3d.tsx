"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { FC, MouseEvent } from "react";
import { DevFestCountdown } from "./devfest-countdown";
import { GdgGlowingBackdrop } from "./gdg-glowing-backdrop";

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
      className="relative flex min-h-[580px] w-full select-none items-center justify-center overflow-hidden border-gray-200/80 bg-[#F8F9FA] p-6 md:p-12 lg:min-h-screen lg:w-1/2 lg:border-l"
    >
      {/* Background Huge Glowing GDG Logo & Google Light Aura */}
      <GdgGlowingBackdrop stageMouseX={smoothMouseX} stageMouseY={smoothMouseY} />

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
        {/* 3D Countdown Console facing towards cursor */}
        <DevFestCountdown stageMouseX={smoothMouseX} stageMouseY={smoothMouseY} />
      </motion.div>
    </aside>
  );
};
