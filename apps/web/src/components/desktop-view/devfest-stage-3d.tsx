"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type PointerEvent, useEffect, useState } from "react";
import { DevFestCountdown } from "./devfest-countdown";
import { GdgGlowingBackdrop } from "./gdg-glowing-backdrop";

export function DevFestStage3D() {
  const [supportsPointerInteraction, setSupportsPointerInteraction] = useState(false);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncInteractionSupport = () => setSupportsPointerInteraction(pointerQuery.matches && !motionQuery.matches);

    syncInteractionSupport();
    pointerQuery.addEventListener("change", syncInteractionSupport);
    motionQuery.addEventListener("change", syncInteractionSupport);

    return () => {
      pointerQuery.removeEventListener("change", syncInteractionSupport);
      motionQuery.removeEventListener("change", syncInteractionSupport);
    };
  }, []);

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

  const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <aside
      onPointerMove={supportsPointerInteraction ? handlePointerMove : undefined}
      onPointerLeave={supportsPointerInteraction ? handlePointerLeave : undefined}
      style={{ perspective: 1200 }}
      className="relative order-1 flex min-h-[300px] w-full select-none items-center justify-center overflow-hidden border-gray-200/80 bg-[#F8F9FA] p-4 sm:min-h-[360px] sm:p-6 md:p-8 lg:order-2 lg:min-h-screen lg:w-1/2 lg:border-l lg:p-12"
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
        className="transform-style-3d relative z-10 flex w-full max-w-xl items-center justify-center lg:h-[560px]"
      >
        {/* 3D Countdown Console facing towards cursor */}
        <DevFestCountdown stageMouseX={smoothMouseX} stageMouseY={smoothMouseY} interactive={supportsPointerInteraction} />
      </motion.div>
    </aside>
  );
}
