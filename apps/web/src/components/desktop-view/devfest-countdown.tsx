"use client";

import { type MotionValue, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type FC, type MouseEvent, useEffect, useState } from "react";
import { GdgLogoSvg } from "@/SVGs/gdg-logo-svg";

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
};

type DigitCardProps = {
  label: string;
  value: number;
  accentColor: string;
  glowColor: string;
  textColor: string;
  badgeText?: string;
};

function DigitCard({ label, value, accentColor, glowColor, textColor, badgeText }: DigitCardProps) {
  const formattedValue = String(value).padStart(2, "0");

  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -3 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{ transformStyle: "preserve-3d" }}
      className="group relative flex min-w-0 flex-1 flex-col items-center justify-center"
    >
      {/* 3D Depth Card Box */}
      <div
        style={{
          transform: "translateZ(30px)",
          boxShadow: `0 10px 28px -6px ${glowColor}, 0 4px 12px rgba(0, 0, 0, 0.5)`,
        }}
        className="relative flex w-full min-w-0 flex-col items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-gradient-to-b from-[#181d29]/95 via-[#10141e]/98 to-[#0a0d14]/99 px-2 py-3 shadow-2xl backdrop-blur-xl sm:rounded-2xl sm:px-3 sm:py-3.5"
      >
        {/* Top Accent Rim Indicator */}
        <div
          style={{ backgroundColor: accentColor }}
          className="absolute top-0 right-0 left-0 h-1 opacity-90 shadow-sm transition-opacity group-hover:opacity-100"
        />

        {/* Ambient Top Glow Cone */}
        <div
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${glowColor} 0%, transparent 70%)`,
          }}
          className="pointer-events-none absolute inset-0 opacity-40 transition-opacity group-hover:opacity-75"
        />

        {/* Optional Sub-badge */}
        {badgeText && (
          <span style={{ color: accentColor }} className="mb-0.5 hidden font-mono text-[9px] uppercase tracking-wider opacity-80 sm:block">
            {badgeText}
          </span>
        )}

        {/* Digit Display with Center Split-Flap Line */}
        <div className="relative my-0.5 flex w-full items-center justify-center overflow-hidden">
          {/* Subtle Horizontal Slit */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-px bg-black/50 shadow-[0_1px_0_rgba(255,255,255,0.06)]" />

          <span
            suppressHydrationWarning
            style={{ color: textColor }}
            className="block w-full truncate text-center font-bold font-google tabular-nums text-2xl leading-none tracking-tight drop-shadow-md sm:text-3xl md:text-4xl"
          >
            {formattedValue}
          </span>
        </div>

        {/* Unit Label */}
        <span className="mt-1 font-bold font-mono text-[10px] text-gray-400 uppercase tracking-widest sm:text-[11px]">{label}</span>
      </div>
    </motion.div>
  );
}

export const DevFestCountdown: FC<DevFestCountdownProps> = ({ stageMouseX, stageMouseY }) => {
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
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);

  // Dynamic specular sheen following cursor across glass chassis
  const sheenLeft = useTransform(smoothX, [-0.5, 0.5], ["10%", "90%"]);
  const sheenTop = useTransform(smoothY, [-0.5, 0.5], ["10%", "90%"]);

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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
      className="relative flex w-full max-w-xl items-center justify-center p-2 sm:p-4"
    >
      {/* Main 3D Card Shell: Facing towards the mouse */}
      <motion.div
        style={{
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
          x: parallaxX,
          y: parallaxY,
        }}
        className="transform-style-3d relative w-full"
      >
        {/* ========================================================
             CENTRAL COUNTDOWN CONSOLE CHASSIS (Layer Z: 20px)
             ======================================================== */}
        <div
          style={{ transform: "translateZ(20px)" }}
          className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-b from-[#131824]/95 via-[#0e121c]/98 to-[#090b10]/98 p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:p-6"
        >
          {/* Dynamic Specular Sheen (Moves with Cursor) */}
          <motion.div
            style={{
              left: sheenLeft,
              top: sheenTop,
              transform: "translate(-50%, -50%)",
            }}
            className="pointer-events-none absolute h-72 w-72 rounded-full bg-radial from-white/12 via-white/4 to-transparent blur-xl"
          />

          {/* Background Subtle Tech Grid */}
          <div className="pointer-events-none absolute inset-0 bg-grid-dots-dark opacity-35" />

          {/* Console Header Bar */}
          <div
            style={{ transform: "translateZ(30px)" }}
            className="relative mb-5 flex items-center justify-between border-white/10 border-b pb-4"
          >
            {/* GDG Logo + Event Title */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/20 bg-white/10 p-1.5 shadow-xs">
                <GdgLogoSvg className="h-full w-auto" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold font-google text-sm text-white tracking-tight sm:text-base">GDG UCSC DevFest &apos;26</span>
                </div>
                <p className="font-mono text-[10px] text-gray-400">Mission Countdown • Launch Engine</p>
              </div>
            </div>

            {/* Live PST Badge with Pulsing LED */}
            <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-emerald-400 shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34A853] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#34A853]" />
              </span>
              <span className="font-bold font-mono text-[10px] uppercase tracking-wider">PST (UTC-8)</span>
            </div>
          </div>

          {/* ========================================================
               4-UNIT COUNTDOWN DISPLAY (Layer Z: 40px)
               Google Brand Palette: Blue (Days), Red (Hours), Yellow (Mins), Green (Secs)
               ======================================================== */}
          <div style={{ transform: "translateZ(40px)" }} className="relative flex w-full items-center justify-between gap-1 sm:gap-2">
            {/* Days Card */}
            <DigitCard
              label="Days"
              value={timeLeft.days}
              accentColor="#4285F4"
              glowColor="rgba(66, 133, 244, 0.35)"
              textColor="#E8F0FE"
              badgeText="Launch"
            />

            {/* Glowing Colon Separator */}
            <div className="flex shrink-0 flex-col items-center justify-center gap-1 sm:gap-1.5 opacity-60">
              <div className="h-1.5 w-1.5 rounded-full bg-[#FBBC05] shadow-[0_0_8px_#FBBC05]" />
              <div className="h-1.5 w-1.5 rounded-full bg-[#FBBC05] shadow-[0_0_8px_#FBBC05]" />
            </div>

            {/* Hours Card */}
            <DigitCard
              label="Hours"
              value={timeLeft.hours}
              accentColor="#EA4335"
              glowColor="rgba(234, 67, 53, 0.35)"
              textColor="#FCE8E6"
              badgeText="Cycle"
            />

            {/* Glowing Colon Separator */}
            <div className="flex shrink-0 flex-col items-center justify-center gap-1 sm:gap-1.5 opacity-60">
              <div className="h-1.5 w-1.5 rounded-full bg-[#FBBC05] shadow-[0_0_8px_#FBBC05]" />
              <div className="h-1.5 w-1.5 rounded-full bg-[#FBBC05] shadow-[0_0_8px_#FBBC05]" />
            </div>

            {/* Minutes Card */}
            <DigitCard
              label="Mins"
              value={timeLeft.minutes}
              accentColor="#FBBC05"
              glowColor="rgba(251, 188, 5, 0.35)"
              textColor="#FEF7E0"
              badgeText="Orbit"
            />

            {/* Glowing Colon Separator */}
            <div className="flex shrink-0 flex-col items-center justify-center gap-1 sm:gap-1.5 opacity-60">
              <div className="h-1.5 w-1.5 rounded-full bg-[#FBBC05] shadow-[0_0_8px_#FBBC05]" />
              <div className="h-1.5 w-1.5 rounded-full bg-[#FBBC05] shadow-[0_0_8px_#FBBC05]" />
            </div>

            {/* Seconds Card */}
            <DigitCard
              label="Secs"
              value={timeLeft.seconds}
              accentColor="#34A853"
              glowColor="rgba(52, 168, 83, 0.35)"
              textColor="#E6F4EA"
              badgeText="Pulse"
            />
          </div>

          {/* ========================================================
               TARGET DATE & EVENT METRICS FOOTER (Layer Z: 30px)
               ======================================================== */}
          <div style={{ transform: "translateZ(30px)" }} className="mt-6 border-white/10 border-t pt-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-[#4285F4]" />
                <span className="font-semibold text-white">Event Kickoff:</span>
                <span className="font-mono text-gray-400">Sat, Nov 14, 2026 • 9:00 AM PST</span>
              </div>
              <span className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-[10px] text-gray-300">24H Hackathon</span>
            </div>

            {/* Google 4-Color Accent Strip */}
            <div className="mt-3 flex h-1 w-full overflow-hidden rounded-full opacity-85 shadow-sm">
              <div className="w-1/4 bg-[#4285F4]" />
              <div className="w-1/4 bg-[#EA4335]" />
              <div className="w-1/4 bg-[#FBBC05]" />
              <div className="w-1/4 bg-[#34A853]" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
