"use client";

import { type MotionValue, motion, useMotionValue, useTransform } from "framer-motion";
import { type FC, useId } from "react";

// Official GDG Logo capsule paths from gdg-logo-svg.tsx
const RED_PATH =
  "M23.63 79.75 L144.11 10.19 C161.71 0.03, 184.21 6.06, 194.38 23.66 C204.54 41.26, 198.51 63.76, 180.91 73.92 L60.43 143.48 C42.83 153.64, 20.33 147.61, 10.17 130.01 L10.16 130.01 C0.00 112.41, 6.03 89.91, 23.63 79.75 Z";

const BLUE_PATH =
  "M60.63 79.40 L181.12 148.96 C198.71 159.12, 204.74 181.62, 194.58 199.22 C184.42 216.82, 161.92 222.85, 144.32 212.69 L23.84 143.13 C6.24 132.97, 0.21 110.46, 10.37 92.87 C20.53 75.27, 43.04 69.24, 60.63 79.40 Z";

const YELLOW_PATH =
  "M252.94 201.80 C262.69 218.69, 284.29 224.48, 301.18 214.73 L424.22 143.69 C441.11 133.94, 446.90 112.34, 437.15 95.45 L435.67 92.89 C425.92 76.00, 404.32 70.21, 387.43 79.96 L264.39 151.00 C247.50 160.75, 241.71 182.35, 251.46 199.24 Z";

const GREEN_PATH =
  "M253.67 25.24 C243.92 42.13, 249.71 63.73, 266.60 73.48 L389.64 144.52 C406.53 154.27, 428.13 148.48, 437.88 131.59 L439.36 129.03 C449.11 112.14, 443.32 90.54, 426.43 80.79 L303.39 9.75 C286.50 -0.00, 264.90 5.79, 255.15 22.68 Z";

type GdgGlowingBackdropProps = {
  stageMouseX?: MotionValue<number>;
  stageMouseY?: MotionValue<number>;
  className?: string;
  variant?: "desktop" | "mobile";
};

export const GdgGlowingBackdrop: FC<GdgGlowingBackdropProps> = ({ stageMouseX, stageMouseY, className = "", variant = "desktop" }) => {
  const uniqueId = useId().replace(/:/g, "_");

  // Fallback motion values for parallax when no mouse props provided
  const localX = useMotionValue(0);
  const localY = useMotionValue(0);
  const activeX = stageMouseX ?? localX;
  const activeY = stageMouseY ?? localY;

  // Counter-parallax: moves gently in reverse of the cursor for deep 3D separation
  const parallaxX = useTransform(activeX, [-0.5, 0.5], [26, -26]);
  const parallaxY = useTransform(activeY, [-0.5, 0.5], [20, -20]);
  const subtleRotate = useTransform(activeX, [-0.5, 0.5], [-2.5, 2.5]);

  return (
    <div className={`pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden ${className}`}>
      {/* 1. Large Ambient Corner Glow Pools (Atmospheric Light Aura) */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Red Glow Pool (Top-Left) */}
        <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-[#EA4335]/15 blur-[90px] sm:h-[420px] sm:w-[420px] sm:blur-[120px]" />
        {/* Blue Glow Pool (Bottom-Left) */}
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-[#4285F4]/18 blur-[90px] sm:h-[420px] sm:w-[420px] sm:blur-[120px]" />
        {/* Green Glow Pool (Top-Right) */}
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-[#34A853]/15 blur-[90px] sm:h-[420px] sm:w-[420px] sm:blur-[120px]" />
        {/* Yellow/Amber Glow Pool (Bottom-Right) */}
        <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-[#FBBC05]/20 blur-[90px] sm:h-[420px] sm:w-[420px] sm:blur-[120px]" />
        {/* Center Cyan/Blue Nexus Glow */}
        <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4285F4]/10 blur-[90px]" />
      </div>

      {/* 2. Tech Dot Matrix Grid Overlay */}
      <div className="absolute inset-0 bg-grid-dots opacity-45" />

      {/* 3. Massive End-to-End Glowing GDG Logo Container */}
      <motion.div
        style={{
          x: parallaxX,
          y: parallaxY,
          rotate: subtleRotate,
        }}
        animate={{
          scale: [1, 1.02, 1],
          opacity: [0.92, 1, 0.92],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className={`relative flex items-center justify-center ${
          variant === "mobile" ? "w-[130%] max-w-none" : "w-[125%] max-w-none sm:w-[135%] md:w-[145%] lg:w-[155%] xl:w-[165%]"
        }`}
      >
        <svg
          viewBox="0 0 450 225"
          className="h-auto w-full select-none overflow-visible"
          fill="none"
          role="img"
          aria-label="Glowing Google Developer Groups Emblem"
        >
          <defs>
            {/* Deep Ambient Glow Filter */}
            <filter id={`deep-glow-${uniqueId}`} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="34" result="blur1" />
            </filter>

            {/* Neon Mid Glow Filter */}
            <filter id={`neon-glow-${uniqueId}`} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="14" result="blur2" />
            </filter>

            {/* Crisp Rim Glow Filter */}
            <filter id={`rim-glow-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur3" />
            </filter>

            {/* Rich Solid Gradients for Capsule Bodies */}
            <linearGradient id={`grad-red-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EA4335" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#D93025" stopOpacity="0.88" />
            </linearGradient>

            <linearGradient id={`grad-blue-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4285F4" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#1A73E8" stopOpacity="0.88" />
            </linearGradient>

            <linearGradient id={`grad-yellow-${uniqueId}`} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FBBC05" stopOpacity="0.96" />
              <stop offset="100%" stopColor="#F9AB00" stopOpacity="0.90" />
            </linearGradient>

            <linearGradient id={`grad-green-${uniqueId}`} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#34A853" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#1E8E3E" stopOpacity="0.88" />
            </linearGradient>
          </defs>

          {/* LAYER 1: Deep Diffuse Glow Layer (Casts colored radiance across canvas) */}
          <g filter={`url(#deep-glow-${uniqueId})`} opacity="0.8">
            <path d={RED_PATH} fill="#EA4335" />
            <path d={BLUE_PATH} fill="#4285F4" />
            <path d={YELLOW_PATH} fill="#FBBC05" />
            <path d={GREEN_PATH} fill="#34A853" />
          </g>

          {/* LAYER 2: Vibrant Neon Aura Layer (Sharp energetic colored halo around capsules) */}
          <g filter={`url(#neon-glow-${uniqueId})`} opacity="0.7">
            <path d={RED_PATH} stroke="#EA4335" strokeWidth="14" fill="none" />
            <path d={BLUE_PATH} stroke="#4285F4" strokeWidth="14" fill="none" />
            <path d={YELLOW_PATH} stroke="#FBBC05" strokeWidth="14" fill="none" />
            <path d={GREEN_PATH} stroke="#34A853" strokeWidth="14" fill="none" />
          </g>

          {/* LAYER 3: Solid Vibrant Google Logo Bodies */}
          <g>
            <path d={RED_PATH} fill={`url(#grad-red-${uniqueId})`} stroke="#EA4335" strokeWidth="1" strokeOpacity="0.6" />
            <path d={BLUE_PATH} fill={`url(#grad-blue-${uniqueId})`} stroke="#4285F4" strokeWidth="1" strokeOpacity="0.6" />
            <path d={YELLOW_PATH} fill={`url(#grad-yellow-${uniqueId})`} stroke="#FBBC05" strokeWidth="1" strokeOpacity="0.6" />
            <path d={GREEN_PATH} fill={`url(#grad-green-${uniqueId})`} stroke="#34A853" strokeWidth="1" strokeOpacity="0.6" />
          </g>

          {/* LAYER 4: Fine Specular Glass Rims (Gives 3D depth and crystalline sheen) */}
          <g filter={`url(#rim-glow-${uniqueId})`} opacity="0.55">
            <path d={RED_PATH} stroke="white" strokeWidth="1.2" strokeDasharray="130 50" fill="none" />
            <path d={BLUE_PATH} stroke="white" strokeWidth="1.2" strokeDasharray="130 50" fill="none" />
            <path d={YELLOW_PATH} stroke="white" strokeWidth="1.2" strokeDasharray="130 50" fill="none" />
            <path d={GREEN_PATH} stroke="white" strokeWidth="1.2" strokeDasharray="130 50" fill="none" />
          </g>

          {/* LAYER 5: Creative Center Nexus - Futuristic Hackathon Tech Orbitals */}
          <g opacity="0.45">
            {/* Concentric Tech Rings Between < and > brackets */}
            <circle cx="225" cy="112.5" r="32" stroke="#4285F4" strokeWidth="1" strokeDasharray="3 5" fill="none" />
            <circle cx="225" cy="112.5" r="56" stroke="#FBBC05" strokeWidth="1" strokeDasharray="4 8" fill="none" opacity="0.75" />
            <circle cx="225" cy="112.5" r="84" stroke="#34A853" strokeWidth="0.75" strokeDasharray="3 9" fill="none" opacity="0.55" />
            <circle cx="225" cy="112.5" r="116" stroke="#EA4335" strokeWidth="0.75" strokeDasharray="6 12" fill="none" opacity="0.4" />

            {/* Center Core Node */}
            <circle cx="225" cy="112.5" r="4.5" fill="#4285F4" opacity="0.7" />
            <circle cx="225" cy="112.5" r="1.5" fill="white" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
};
