"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type PointerEvent, useEffect, useState } from "react";
import { DevFestCountdown } from "./devfest-countdown";
import { GdgGlowingBackdrop } from "./gdg-glowing-backdrop";

export function DevFestStage3D() {
  const [supportsPointerInteraction, setSupportsPointerInteraction] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncCapabilities = () => {
      setIsDesktop(desktopQuery.matches);
      setSupportsPointerInteraction(pointerQuery.matches && !motionQuery.matches);
    };

    syncCapabilities();
    desktopQuery.addEventListener("change", syncCapabilities);
    pointerQuery.addEventListener("change", syncCapabilities);
    motionQuery.addEventListener("change", syncCapabilities);

    return () => {
      desktopQuery.removeEventListener("change", syncCapabilities);
      pointerQuery.removeEventListener("change", syncCapabilities);
      motionQuery.removeEventListener("change", syncCapabilities);
    };
  }, []);

  const enable3D = isDesktop && supportsPointerInteraction;

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
      onPointerMove={enable3D ? handlePointerMove : undefined}
      onPointerLeave={enable3D ? handlePointerLeave : undefined}
      style={enable3D ? { perspective: 1200 } : undefined}
      className="relative order-1 flex min-h-[300px] w-full select-none items-center justify-center overflow-hidden border-gray-200/80 bg-[#F8F9FA] p-4 sm:min-h-[360px] sm:p-6 md:p-8 lg:order-2 lg:min-h-screen lg:w-1/2 lg:border-l lg:p-12 antialiased [text-rendering:optimizeLegibility]"
    >
      {/* Background Huge Glowing GDG Logo & Google Light Aura */}
      <GdgGlowingBackdrop
        stageMouseX={enable3D ? smoothMouseX : undefined}
        stageMouseY={enable3D ? smoothMouseY : undefined}
        variant={isDesktop ? "desktop" : "mobile"}
      />

      {/* Interactive 3D Perspective Stage */}
      <motion.div
        style={
          enable3D
            ? {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }
            : undefined
        }
        className={`relative z-10 flex w-full max-w-xl items-center justify-center lg:h-[560px] ${enable3D ? "transform-style-3d" : ""}`}
      >
        {/* 3D Countdown Console facing towards cursor */}
        <DevFestCountdown
          stageMouseX={enable3D ? smoothMouseX : undefined}
          stageMouseY={enable3D ? smoothMouseY : undefined}
          interactive={enable3D}
        />
      </motion.div>
    </aside>
  );
}
