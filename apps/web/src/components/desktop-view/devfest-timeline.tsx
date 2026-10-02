"use client";

import { Check } from "lucide-react";
import { type CSSProperties, useEffect, useMemo, useState } from "react";

export type TimelineMilestone = {
  id: string;
  dateLabel: string;
  shortTitle: string;
  fullTitle: string;
  timestamp: number;
};

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    id: "launch",
    dateLabel: "Oct 1",
    shortTitle: "Launch",
    fullTitle: "Launch",
    timestamp: new Date("2026-10-01T00:00:00-07:00").getTime(),
  },
  {
    id: "prio-open",
    dateLabel: "Oct 2",
    shortTitle: "Priority Open",
    fullTitle: "Priority Apps Open",
    timestamp: new Date("2026-10-02T00:00:00-07:00").getTime(),
  },
  {
    id: "prio-close",
    dateLabel: "Oct 11",
    shortTitle: "Priority Close",
    fullTitle: "Priority Apps Close",
    timestamp: new Date("2026-10-11T23:59:59-07:00").getTime(),
  },
  {
    id: "regular-open",
    dateLabel: "Oct 12",
    shortTitle: "Regular Open",
    fullTitle: "Regular Apps Open",
    timestamp: new Date("2026-10-12T00:00:00-07:00").getTime(),
  },
  {
    id: "regular-close",
    dateLabel: "Oct 28",
    shortTitle: "Regular Close",
    fullTitle: "Regular Apps Close",
    timestamp: new Date("2026-10-28T23:59:59-07:00").getTime(),
  },
  {
    id: "decisions",
    dateLabel: "Nov 2",
    shortTitle: "Decisions",
    fullTitle: "App Decisions",
    timestamp: new Date("2026-11-02T12:00:00-07:00").getTime(),
  },
  {
    id: "event-day",
    dateLabel: "Nov 14",
    shortTitle: "DevFest",
    fullTitle: "DevFest!",
    timestamp: new Date("2026-11-14T09:00:00-08:00").getTime(),
  },
];

export function calculateTimelineProgress(now: number, milestones: TimelineMilestone[]): number {
  if (milestones.length < 2) return 0;
  const [first] = milestones;
  const last = milestones.at(-1);

  if (!first || !last) return 0;
  if (now <= first.timestamp) return 0;
  if (now >= last.timestamp) return 100;

  const totalSegments = milestones.length - 1;
  const stepPercent = 100 / totalSegments;

  for (let i = 0; i < totalSegments; i += 1) {
    const current = milestones[i];
    const next = milestones[i + 1];
    if (current && next && now >= current.timestamp && now <= next.timestamp) {
      const ratio = (now - current.timestamp) / (next.timestamp - current.timestamp);
      return i * stepPercent + ratio * stepPercent;
    }
  }
  return 0;
}

export function getActiveMilestoneIndex(now: number, milestones: TimelineMilestone[]): number {
  const lastIndex = milestones.length - 1;
  const [first] = milestones;
  const last = milestones.at(-1);

  if (!first || !last) return 0;
  if (now < first.timestamp) return 0;
  if (now >= last.timestamp) return lastIndex;

  for (let i = 0; i < lastIndex; i += 1) {
    const current = milestones[i];
    const next = milestones[i + 1];
    if (current && next && now >= current.timestamp && now < next.timestamp) {
      return i;
    }
  }
  return 0;
}

export type DevFestTimelineProps = {
  className?: string;
  style?: CSSProperties;
  milestones?: TimelineMilestone[];
  nowMs?: number;
};

export function DevFestTimeline({ className = "", style, milestones = TIMELINE_MILESTONES, nowMs: externalNowMs }: DevFestTimelineProps) {
  const [internalNowMs, setInternalNowMs] = useState<number | null>(null);

  useEffect(() => {
    if (externalNowMs !== undefined) return;
    setInternalNowMs(Date.now());

    const timer = setInterval(() => {
      setInternalNowMs(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, [externalNowMs]);

  // Use a stable value for the server render and the client's first render.
  // The effect above replaces it with the current time after hydration.
  const effectiveNowMs = externalNowMs ?? internalNowMs ?? milestones[0]?.timestamp ?? 0;

  const timelineProgress = useMemo(() => calculateTimelineProgress(effectiveNowMs, milestones), [effectiveNowMs, milestones]);

  const currentMilestoneIndex = useMemo(() => getActiveMilestoneIndex(effectiveNowMs, milestones), [effectiveNowMs, milestones]);

  return (
    <div style={style} className={`relative w-full px-1 antialiased [text-rendering:optimizeLegibility] sm:px-2 ${className}`}>
      {/* Progress Bar & Circles */}
      <div className="relative w-full py-0.5">
        {/* Background Line */}
        <div className="absolute top-[34px] xs:top-[40px] right-[10px] left-[10px] h-1.5 -translate-y-1/2 rounded-full bg-gray-200/90 shadow-2xs ring-2 ring-white/90 sm:top-[46px] sm:right-[14px] sm:left-[14px] sm:h-2" />

        {/* Filled Progress Bar Line */}
        <div
          className="absolute top-[34px] xs:top-[40px] left-[10px] h-1.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#4285F4] via-[#7c3aed] to-[#34A853] shadow-xs transition-all duration-700 ease-out sm:top-[46px] sm:left-[14px] sm:h-2"
          style={{
            width: `calc((100% - 20px) * ${Math.min(100, Math.max(0, timelineProgress)) / 100})`,
          }}
        />

        {/* The 6 Circles and labels */}
        <div className="relative z-10 flex w-full justify-between">
          {milestones.map((milestone, idx) => {
            const isCompleted = idx < currentMilestoneIndex;
            const isCurrent = idx === currentMilestoneIndex;

            return (
              <div key={milestone.id} className="flex flex-col items-center">
                {/* Date on top */}
                <div className="flex h-5 xs:h-6 items-center justify-center sm:h-7">
                  <span
                    className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 font-bold font-google text-[8.5px] xs:text-[9.5px] tracking-tight antialiased shadow-2xs transition-all sm:text-[10px] ${
                      isCurrent
                        ? "border border-[#4285F4]/40 bg-white font-extrabold text-[#1A73E8] ring-2 ring-[#4285F4]/20 sm:bg-white/95 sm:backdrop-blur-md"
                        : isCompleted
                          ? "border border-gray-200/90 bg-white text-gray-900 sm:bg-white/90 sm:backdrop-blur-md"
                          : "border border-gray-200/80 bg-white text-gray-700 sm:bg-white/85 sm:backdrop-blur-md"
                    }`}
                  >
                    {milestone.dateLabel}
                  </span>
                </div>

                {/* Circle O */}
                <div
                  className={`mt-1 flex h-5 xs:h-6 w-5 xs:w-6 items-center justify-center rounded-full transition-all duration-200 sm:h-7 sm:w-7 ${
                    isCompleted
                      ? "border-2 border-white bg-[#4285F4] text-white shadow-xs ring-2 ring-white/90"
                      : isCurrent
                        ? "border-2 border-[#4285F4] bg-white text-[#4285F4] shadow-md ring-3 ring-[#4285F4]/30 sm:border-[2.5px] sm:ring-4"
                        : "border border-gray-300 bg-white text-gray-400 shadow-2xs ring-2 ring-white/90 sm:border-2"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-2.5 w-2.5 stroke-[3] sm:h-3 sm:w-3" />
                  ) : isCurrent ? (
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4285F4] sm:h-2 sm:w-2" />
                  ) : (
                    <span className="h-1 w-1 rounded-full bg-gray-300 sm:h-1.5 sm:w-1.5" />
                  )}
                </div>

                {/* Title on bottom */}
                <span
                  className={`mt-1 inline-flex max-w-[50px] xs:max-w-[60px] items-center justify-center rounded-lg px-1.5 py-0.5 text-center font-semibold text-[8.5px] xs:text-[9px] leading-tight antialiased shadow-2xs transition-all sm:max-w-[74px] sm:rounded-xl sm:px-2 sm:py-1 sm:text-[9.5px] ${
                    isCurrent
                      ? "border border-blue-200/90 bg-white font-bold text-gray-950 shadow-xs ring-1 ring-blue-400/25 sm:bg-white/95 sm:backdrop-blur-md"
                      : isCompleted
                        ? "border border-gray-200/90 bg-white text-gray-900 sm:bg-white/90 sm:backdrop-blur-md"
                        : "border border-gray-200/80 bg-white text-gray-800 sm:bg-white/85 sm:backdrop-blur-md"
                  }`}
                >
                  <span className="sm:hidden">{milestone.shortTitle}</span>
                  <span className="hidden sm:inline">{milestone.fullTitle}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
