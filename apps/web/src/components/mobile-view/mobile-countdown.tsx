"use client";

import { type FC, useEffect, useState } from "react";
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

type MobileDigitCardProps = {
  label: string;
  value: number;
  accentColor: string;
  glowColor: string;
  textColor: string;
};

function MobileDigitCard({ label, value, accentColor, glowColor, textColor }: MobileDigitCardProps) {
  const formattedValue = String(value).padStart(2, "0");

  return (
    <div className="relative flex min-w-0 flex-1 flex-col items-center justify-center">
      <div
        style={{
          boxShadow: `0 6px 18px -4px ${glowColor}, 0 2px 6px rgba(0, 0, 0, 0.04)`,
        }}
        className="relative flex w-full min-w-0 flex-col items-center justify-center overflow-hidden rounded-xl border border-gray-200/90 bg-white/95 px-1.5 xs:px-2.5 py-2.5 xs:py-3 shadow-xs backdrop-blur-md"
      >
        {/* Top Accent Rim */}
        <div style={{ backgroundColor: accentColor }} className="absolute top-0 right-0 left-0 h-0.5 opacity-90" />

        {/* Ambient Top Glow */}
        <div
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${glowColor} 0%, transparent 70%)`,
          }}
          className="pointer-events-none absolute inset-0 opacity-25"
        />

        {/* Digit Display */}
        <div className="relative my-0.5 flex w-full items-center justify-center overflow-hidden">
          <span
            suppressHydrationWarning
            style={{ color: textColor }}
            className="block w-full truncate text-center font-bold font-sans text-2xl xs:text-3xl tabular-nums leading-none tracking-tight"
          >
            {formattedValue}
          </span>
        </div>

        {/* Unit Label */}
        <span className="mt-1 font-sans font-semibold text-[9px] text-gray-500 xs:text-[10px] uppercase tracking-wider">{label}</span>
      </div>
    </div>
  );
}

export const MobileCountdown: FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeUnits>(() => calculateTimeRemaining(TARGET_PST_DATE));

  useEffect(() => {
    setTimeLeft(calculateTimeRemaining(TARGET_PST_DATE));
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(TARGET_PST_DATE));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex w-full flex-col items-center gap-3.5">
      {/* 1. Title */}
      <div className="flex select-none items-center justify-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-xl border border-gray-200/80 bg-white/95 p-1.5 shadow-xs backdrop-blur-md">
          <GdgLogoSvg className="h-full w-auto" />
        </div>
        <h2 className="font-sans font-semibold text-base text-gray-700 xs:text-lg tracking-tight">GDG UCSC DevFest &apos;26</h2>
      </div>

      {/* 2. 4-Unit Countdown Row */}
      <div className="relative flex w-full items-center justify-between gap-1 xs:gap-1.5">
        <MobileDigitCard label="Days" value={timeLeft.days} accentColor="#4285F4" glowColor="rgba(66, 133, 244, 0.22)" textColor="#1A73E8" />

        <div className="flex shrink-0 flex-col items-center justify-center gap-1 opacity-50">
          <div className="h-1 w-1 rounded-full bg-[#D98200]" />
          <div className="h-1 w-1 rounded-full bg-[#D98200]" />
        </div>

        <MobileDigitCard label="Hours" value={timeLeft.hours} accentColor="#EA4335" glowColor="rgba(234, 67, 53, 0.22)" textColor="#D93025" />

        <div className="flex shrink-0 flex-col items-center justify-center gap-1 opacity-50">
          <div className="h-1 w-1 rounded-full bg-[#D98200]" />
          <div className="h-1 w-1 rounded-full bg-[#D98200]" />
        </div>

        <MobileDigitCard label="Mins" value={timeLeft.minutes} accentColor="#FBBC05" glowColor="rgba(251, 188, 5, 0.25)" textColor="#B06000" />

        <div className="flex shrink-0 flex-col items-center justify-center gap-1 opacity-50">
          <div className="h-1 w-1 rounded-full bg-[#D98200]" />
          <div className="h-1 w-1 rounded-full bg-[#D98200]" />
        </div>

        <MobileDigitCard label="Secs" value={timeLeft.seconds} accentColor="#34A853" glowColor="rgba(52, 168, 83, 0.22)" textColor="#1E8E3E" />
      </div>

      {/* 3. Event Kickoff Information Pill */}
      <div className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/90 px-3 py-1 text-[11px] shadow-xs backdrop-blur-md">
        <span className="flex h-1.5 w-1.5 rounded-full bg-[#4285F4]" />
        <span className="font-medium font-sans text-gray-700">Event Kickoff:</span>
        <span className="font-sans text-gray-500">Nov 14, 2026 • 9:00 AM PST</span>
      </div>
    </div>
  );
};
