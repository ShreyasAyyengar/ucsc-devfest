"use client";

import { type MotionValue, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type MouseEvent, useEffect, useState } from "react";
import { GdgLogoSvg } from "@/SVGs/gdg-logo-svg";
import { DevFestTimeline } from "./devfest-timeline";

export { DevFestTimeline, TIMELINE_MILESTONES, type TimelineMilestone } from "./devfest-timeline";

// Official Target Date: November 14, 2026, 09:00:00 PST (Pacific Standard Time = UTC-8)
const TARGET_PST_DATE = "2026-11-14T09:00:00-08:00";

type TimeUnits = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
};

function calculateTimeRemaining(targetIso: string): TimeUnits {
  const targetMs = Date.parse(targetIso);
  const nowMs = Date.now();
  const diff = Math.max(0, targetMs - nowMs);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isComplete: diff <= 0,
  };
}

type DevFestCountdownProps = {
  stageMouseX?: MotionValue<number>;
  stageMouseY?: MotionValue<number>;
  interactive?: boolean;
};

type DigitCardProps = {
  label: string;
  value: number;
  accentColor: string;
  glowColor: string;
  textColor: string;
  interactive: boolean;
};

function DigitCard({ label, value, accentColor, glowColor, textColor, interactive }: DigitCardProps) {
  const formattedValue = String(value).padStart(2, "0");

  return (
    <motion.div
      whileHover={interactive ? { scale: 1.05, y: -4 } : undefined}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{ transformStyle: "preserve-3d" }}
      className="group relative flex min-w-0 flex-1 flex-col items-center justify-center"
    >
      {/* 3D Depth Card Box */}
      <div
        style={{
          boxShadow: `0 10px 25px -4px ${glowColor}, 0 2px 8px rgba(0, 0, 0, 0.04)`,
        }}
        className="relative flex w-full min-w-0 flex-col items-center justify-center overflow-hidden rounded-xl border border-gray-200/90 bg-white/95 px-1.5 xs:px-2.5 py-2.5 xs:py-3 shadow-xs backdrop-blur-xl transition-shadow group-hover:shadow-md sm:rounded-3xl sm:px-3 sm:py-5"
      >
        {/* Top Accent Rim Indicator */}
        <div
          style={{ backgroundColor: accentColor }}
          className="absolute top-0 right-0 left-0 h-1 opacity-90 shadow-xs transition-opacity group-hover:opacity-100 sm:h-1.5"
        />

        {/* Ambient Top Glow Cone */}
        <div
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${glowColor} 0%, transparent 70%)`,
          }}
          className="pointer-events-none absolute inset-0 opacity-30 transition-opacity group-hover:opacity-50"
        />

        {/* Digit Display */}
        <div className="relative my-1 flex w-full items-center justify-center overflow-hidden">
          <span
            suppressHydrationWarning
            style={{ color: textColor }}
            className="block w-full truncate text-center font-bold font-sans text-2xl xs:text-3xl tabular-nums leading-none tracking-tight sm:text-4xl md:text-5xl"
          >
            {formattedValue}
          </span>
        </div>

        {/* Unit Label */}
        <span className="mt-1 font-sans font-semibold text-[9px] text-gray-500 xs:text-[10px] uppercase tracking-wider sm:mt-1.5 sm:text-xs">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

export function DevFestCountdown({ stageMouseX, stageMouseY, interactive = true }: DevFestCountdownProps) {
  // Live ticking countdown state
  const [timeLeft, setTimeLeft] = useState<TimeUnits>(() => calculateTimeRemaining(TARGET_PST_DATE));

  useEffect(() => {
    // Sync immediate calculation
    setTimeLeft(calculateTimeRemaining(TARGET_PST_DATE));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(TARGET_PST_DATE));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Dedicated spring physics for mouse-facing 3D tilt
  const localX = useMotionValue(0);
  const localY = useMotionValue(0);

  // If stage mouse values are provided, blend them; otherwise use local values
  const activeX = stageMouseX ?? localX;
  const activeY = stageMouseY ?? localY;

  const springConfig = { damping: 22, stiffness: 150, mass: 0.7 };
  const smoothX = useSpring(activeX, springConfig);
  const smoothY = useSpring(activeY, springConfig);

  // Rotate towards the mouse cursor
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);

  // Subtle floating parallax offsets
  const parallaxX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const parallaxY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    localX.set(x);
    localY.set(y);
  };

  const handleMouseLeave = () => {
    localX.set(0);
    localY.set(0);
  };

  return (
    <div
      onMouseMove={interactive ? handleMouseMove : undefined}
      onMouseLeave={interactive ? handleMouseLeave : undefined}
      style={{ perspective: 1200 }}
      className="relative flex w-full max-w-xl items-center justify-center p-2 sm:p-4"
    >
      {/* Main 3D Presentation: Floating freely without an enclosing box */}
      <motion.div
        style={{
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
          x: parallaxX,
          y: parallaxY,
        }}
        className="transform-style-3d relative flex w-full flex-col items-center gap-2.5 xs:gap-3 sm:gap-5"
      >
        {/* ========================================================
             1. TIMELINE PROGRESS BAR (Layer Z: 40px)
             ======================================================== */}
        <DevFestTimeline style={{ transform: "translateZ(40px)" }} />

        {/* ========================================================
             2. EVENT TITLE (Layer Z: 35px)
             ======================================================== */}
        <div style={{ transform: "translateZ(35px)" }} className="flex select-none items-center justify-center gap-2 sm:gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl border border-gray-200/80 bg-white/95 p-1.5 shadow-xs backdrop-blur-md transition-transform hover:scale-105 sm:h-10 sm:w-10 sm:rounded-2xl sm:p-2">
            <GdgLogoSvg className="h-full w-auto" />
          </div>
          <h2 className="font-sans font-semibold text-base text-gray-700 xs:text-lg tracking-tight sm:text-3xl">GDG UCSC DevFest &apos;26</h2>
        </div>

        {/* ========================================================
             3. 4-UNIT COUNTDOWN DISPLAY (Layer Z: 45px)
             ======================================================== */}
        <div style={{ transform: "translateZ(45px)" }} className="relative flex w-full items-center justify-between gap-1 xs:gap-1.5 sm:gap-3">
          {/* Days Card */}
          <DigitCard
            label="Days"
            value={timeLeft.days}
            accentColor="#4285F4"
            glowColor="rgba(66, 133, 244, 0.22)"
            textColor="#1A73E8"
            interactive={interactive}
          />

          {/* Colon Separator */}
          <div className="flex shrink-0 flex-col items-center justify-center gap-1.5 opacity-50">
            <div className="h-1.5 w-1.5 rounded-full bg-[#D98200]" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#D98200]" />
          </div>

          {/* Hours Card */}
          <DigitCard
            label="Hours"
            value={timeLeft.hours}
            accentColor="#EA4335"
            glowColor="rgba(234, 67, 53, 0.22)"
            textColor="#D93025"
            interactive={interactive}
          />

          {/* Colon Separator */}
          <div className="flex shrink-0 flex-col items-center justify-center gap-1.5 opacity-50">
            <div className="h-1.5 w-1.5 rounded-full bg-[#D98200]" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#D98200]" />
          </div>

          {/* Minutes Card */}
          <DigitCard
            label="Mins"
            value={timeLeft.minutes}
            accentColor="#FBBC05"
            glowColor="rgba(251, 188, 5, 0.25)"
            textColor="#B06000"
            interactive={interactive}
          />

          {/* Colon Separator */}
          <div className="flex shrink-0 flex-col items-center justify-center gap-1.5 opacity-50">
            <div className="h-1.5 w-1.5 rounded-full bg-[#D98200]" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#D98200]" />
          </div>

          {/* Seconds Card */}
          <DigitCard
            label="Secs"
            value={timeLeft.seconds}
            accentColor="#34A853"
            glowColor="rgba(52, 168, 83, 0.22)"
            textColor="#1E8E3E"
            interactive={interactive}
          />
        </div>

        {/* ========================================================
             3. EVENT KICKOFF INFORMATION (Layer Z: 30px)
             ======================================================== */}
        <div
          style={{ transform: "translateZ(30px)" }}
          className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/90 px-3 py-1 text-[11px] shadow-xs backdrop-blur-md sm:px-4 sm:py-1.5 sm:text-xs"
        >
          <span className="flex h-2 w-2 rounded-full bg-[#4285F4]" />
          <span className="font-medium font-sans text-gray-700">Event Kickoff:</span>
          <span className="font-sans text-gray-500">Sat, Nov 14, 2026 • 9:00 AM PST</span>
        </div>
      </motion.div>
    </div>
  );
}
