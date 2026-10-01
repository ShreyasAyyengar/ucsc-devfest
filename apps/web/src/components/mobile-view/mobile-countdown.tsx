"use client";

import { type FC, useEffect, useState } from "react";

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
          boxShadow: `0 8px 20px -6px ${glowColor}, 0 2px 8px rgba(0, 0, 0, 0.4)`,
        }}
        className="relative flex w-full min-w-0 flex-col items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-gradient-to-b from-[#181d29]/95 via-[#10141e]/98 to-[#0a0d14]/99 px-1.5 xs:px-2.5 py-2.5 xs:py-3 shadow-lg backdrop-blur-md"
      >
        {/* Top Accent Rim */}
        <div style={{ backgroundColor: accentColor }} className="absolute top-0 right-0 left-0 h-0.5 opacity-90" />

        {/* Ambient Top Glow */}
        <div
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${glowColor} 0%, transparent 70%)`,
          }}
          className="pointer-events-none absolute inset-0 opacity-40"
        />

        {/* Digit Display with Center Split-Flap Line */}
        <div className="relative my-0.5 flex w-full items-center justify-center overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-px bg-black/50 shadow-[0_1px_0_rgba(255,255,255,0.06)]" />

          <span
            suppressHydrationWarning
            style={{ color: textColor }}
            className="block w-full truncate text-center font-bold font-google text-2xl xs:text-3xl tabular-nums leading-none tracking-tight drop-shadow-sm"
          >
            {formattedValue}
          </span>
        </div>

        {/* Unit Label */}
        <span className="mt-1 font-bold font-mono text-[9px] text-gray-400 xs:text-[10px] uppercase tracking-wider">{label}</span>
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
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-[#131824]/95 via-[#0e121c]/98 to-[#090b10]/98 p-4 shadow-xl backdrop-blur-xl">
      {/* Background Subtle Tech Dots */}
      <div className="pointer-events-none absolute inset-0 bg-grid-dots-dark opacity-30" />

      {/* Top Header Row */}
      <div className="relative mb-3 flex items-center justify-between border-white/10 border-b pb-2.5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34A853] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#34A853]" />
          </span>
          <span className="font-bold font-google text-white text-xs tracking-wide">Event Countdown</span>
        </div>

        <span className="rounded-full border border-emerald-500/30 bg-emerald-950/40 px-2 py-0.5 font-mono font-semibold text-[10px] text-emerald-400 uppercase">
          PST (UTC-8)
        </span>
      </div>

      {/* 4-Unit Countdown Row */}
      <div className="relative flex w-full items-center justify-between gap-1 xs:gap-1.5">
        <MobileDigitCard label="Days" value={timeLeft.days} accentColor="#4285F4" glowColor="rgba(66, 133, 244, 0.35)" textColor="#E8F0FE" />

        <div className="flex shrink-0 flex-col items-center justify-center gap-1 opacity-60">
          <div className="h-1 w-1 rounded-full bg-[#FBBC05] shadow-[0_0_6px_#FBBC05]" />
          <div className="h-1 w-1 rounded-full bg-[#FBBC05] shadow-[0_0_6px_#FBBC05]" />
        </div>

        <MobileDigitCard label="Hours" value={timeLeft.hours} accentColor="#EA4335" glowColor="rgba(234, 67, 53, 0.35)" textColor="#FCE8E6" />

        <div className="flex shrink-0 flex-col items-center justify-center gap-1 opacity-60">
          <div className="h-1 w-1 rounded-full bg-[#FBBC05] shadow-[0_0_6px_#FBBC05]" />
          <div className="h-1 w-1 rounded-full bg-[#FBBC05] shadow-[0_0_6px_#FBBC05]" />
        </div>

        <MobileDigitCard label="Mins" value={timeLeft.minutes} accentColor="#FBBC05" glowColor="rgba(251, 188, 5, 0.35)" textColor="#FEF7E0" />

        <div className="flex shrink-0 flex-col items-center justify-center gap-1 opacity-60">
          <div className="h-1 w-1 rounded-full bg-[#FBBC05] shadow-[0_0_6px_#FBBC05]" />
          <div className="h-1 w-1 rounded-full bg-[#FBBC05] shadow-[0_0_6px_#FBBC05]" />
        </div>

        <MobileDigitCard label="Secs" value={timeLeft.seconds} accentColor="#34A853" glowColor="rgba(52, 168, 83, 0.35)" textColor="#E6F4EA" />
      </div>

      {/* Footer Kickoff Row */}
      <div className="mt-3 flex items-center justify-between border-white/10 border-t pt-2.5 text-[11px]">
        <span className="font-mono text-gray-400">
          Kickoff: <span className="text-gray-200">Nov 14 • 9:00 AM PST</span>
        </span>
        <span className="font-medium text-[#4285F4]">24H Sprint</span>
      </div>

      {/* Google 4-Color Accent Strip */}
      <div className="mt-2 flex h-0.5 w-full overflow-hidden rounded-full opacity-80">
        <div className="w-1/4 bg-[#4285F4]" />
        <div className="w-1/4 bg-[#EA4335]" />
        <div className="w-1/4 bg-[#FBBC05]" />
        <div className="w-1/4 bg-[#34A853]" />
      </div>
    </div>
  );
};
