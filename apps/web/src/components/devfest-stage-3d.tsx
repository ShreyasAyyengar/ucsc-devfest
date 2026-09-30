"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { FC, MouseEvent, ReactNode } from "react";
import { CodeFileSvg } from "@/SVGs/code-file-svg";
import { HackerPassSvg } from "@/SVGs/hacker-pass-svg";

type TiltWidgetProps = {
  baseRotateZ?: number;
  children: ReactNode;
  className?: string;
  depth?: number;
  maxTilt?: number;
};

/**
 * Reusable 3D Tilt Widget that angles dynamically towards the cursor
 * and returns smoothly to its resting position on mouse leave.
 */
function TiltWidget({ children, className = "", baseRotateZ = 0, depth = 30, maxTilt = 5 }: TiltWidgetProps) {
  const localX = useMotionValue(0);
  const localY = useMotionValue(0);

  const springConfig = { damping: 26, stiffness: 180, mass: 0.6 };
  const smoothX = useSpring(localX, springConfig);
  const smoothY = useSpring(localY, springConfig);

  // Gentle dynamic tilt: subtly angles the widget towards the cursor
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxTilt, maxTilt]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxTilt, -maxTilt]);

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
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        z: depth,
        rotateX,
        rotateY,
        rotateZ: baseRotateZ,
      }}
      whileHover={{ scale: 1.02, z: depth + 10 }}
      transition={{ duration: 0.2 }}
      className={`transform-style-3d cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
}

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
        {/* ==========================================
             CENTRAL COMPONENT: Glow Glass Code Terminal
             ========================================== */}
        <div className="absolute z-20 w-[86%] sm:w-[420px]">
          <TiltWidget baseRotateZ={-1} depth={35} maxTilt={3}>
            <div className="code-editor-gradient rounded-2xl border border-white/15 p-5 shadow-2xl backdrop-blur-md">
              {/* Terminal header dots */}
              <div className="mb-3 flex items-center justify-between border-white/10 border-b pb-3">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[#EA4335] shadow-xs" />
                  <div className="h-3 w-3 rounded-full bg-[#FBBC05] shadow-xs" />
                  <div className="h-3 w-3 rounded-full bg-[#34A853] shadow-xs" />
                </div>
                <div className="flex items-center gap-1 font-mono text-[11px] text-gray-400">
                  <CodeFileSvg />
                  <span>devfest_agent.py</span>
                </div>
                <span className="rounded bg-[#4285F4]/20 px-2 py-0.5 font-mono text-[#E8F0FE] text-[9px]">ONLINE</span>
              </div>

              {/* Code content snippet */}
              <div className="space-y-1 font-mono text-xs leading-relaxed">
                <p className="text-gray-500"># Google DevFest 2026</p>
                <p>
                  <span className="text-purple-400">from</span> <span className="text-white">google.genai</span>{" "}
                  <span className="text-purple-400">import</span> <span className="text-yellow-300">DevFestStudent</span>
                </p>
                <p className="pt-1">
                  <span className="text-blue-400">async def</span> <span className="text-[#34A853]">build_future</span>(innovator):
                </p>
                <p className="pl-4 text-gray-300">
                  idea = <span className="text-purple-400">await</span> innovator.brainstorm()
                </p>
                <p className="pl-4 text-gray-300">
                  app = DevFest.deploy(idea, stack=[
                  <span className="text-[#FBBC05]">&quot;Gemini&quot;</span>, <span className="text-[#4285F4]">&quot;Cloud&quot;</span>])
                </p>
                <p className="pl-4">
                  <span className="text-purple-400">return</span> app.impact_world()
                </p>
              </div>

              {/* Terminal Live Metrics Bar */}
              <div className="mt-4 flex items-center justify-between border-white/10 border-t pt-3 text-[11px] text-gray-400">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#34A853]" />
                  Gemini Pro 2.5 Active
                </span>
                <span className="font-mono text-[#FBBC05]">Latency: 18ms</span>
              </div>
            </div>
          </TiltWidget>
        </div>

        {/* ==========================================
             FLOATING BADGE 1: GDG Developer Badge (Top Left)
             ========================================== */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 6, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
          className="absolute -top-4 left-4 z-30 sm:left-2"
        >
          <TiltWidget baseRotateZ={-6} depth={65} maxTilt={5}>
            <div className="backdrop-glass flex items-center gap-3 rounded-2xl border border-white/80 p-3.5 shadow-vibrant-glow">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4285F4] text-white shadow-md">
                <HackerPassSvg />
              </div>
              <div>
                <p className="font-bold text-[11px] text-gray-400 uppercase tracking-wider">Hacker Pass</p>
                <p className="font-bold font-google text-gray-900 text-xs">Verified Attendee</p>
              </div>
              <span className="ml-2 text-lg">⚡</span>
            </div>
          </TiltWidget>
        </motion.div>

        {/* ==========================================
             FLOATING BADGE 2: Multi-color Google Pill (Top Right)
             ========================================== */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4.8, ease: "easeInOut", delay: 0.5 }}
          style={{ transformStyle: "preserve-3d" }}
          className="absolute top-6 -right-2 z-30 sm:right-2"
        >
          <TiltWidget baseRotateZ={6} depth={55} maxTilt={4}>
            <div className="flex items-center gap-2.5 rounded-full border border-white/20 bg-gray-900/90 px-4 py-2.5 shadow-xl backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34A853] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#34A853]" />
              </span>
              <span className="font-bold text-white text-xs tracking-wide">#DevFest2026</span>
              <div className="flex -space-x-1 pl-1">
                <div className="h-3.5 w-3.5 rounded-full border border-gray-900 bg-[#4285F4]" />
                <div className="h-3.5 w-3.5 rounded-full border border-gray-900 bg-[#EA4335]" />
                <div className="h-3.5 w-3.5 rounded-full border border-gray-900 bg-[#FBBC05]" />
                <div className="h-3.5 w-3.5 rounded-full border border-gray-900 bg-[#34A853]" />
              </div>
            </div>
          </TiltWidget>
        </motion.div>

        {/* ==========================================
             FLOATING STICKER 3: 3D Code Bracket Sticker (Bottom Left)
             ========================================== */}
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3.5, ease: "easeInOut", delay: 0.2 }}
          style={{ transformStyle: "preserve-3d" }}
          className="absolute -bottom-8 left-2 z-30 sm:left-6"
        >
          <TiltWidget baseRotateZ={12} depth={75} maxTilt={5}>
            <div className="flex items-center gap-2 rounded-2xl border-2 border-white bg-gradient-to-br from-[#FBBC05] to-amber-500 px-4 py-3 font-black text-gray-950 shadow-2xl">
              <span className="font-mono text-xl tracking-tighter">&lt;ship /&gt;</span>
              <div className="font-extrabold font-sans text-[10px] uppercase leading-tight">
                Build
                <br />
                In Public
              </div>
            </div>
          </TiltWidget>
        </motion.div>

        {/* ==========================================
             FLOATING BADGE 4: Mentor / AI Track Card (Bottom Right)
             ========================================== */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5.2, ease: "easeInOut", delay: 1 }}
          style={{ transformStyle: "preserve-3d" }}
          className="absolute right-2 -bottom-6 z-30 sm:right-4"
        >
          <TiltWidget baseRotateZ={-3} depth={60} maxTilt={4}>
            <div className="dark-glass flex items-center gap-3 rounded-2xl border border-white/20 p-3.5 shadow-2xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#EA4335] to-pink-500 font-bold text-sm text-white shadow">
                AI
              </div>
              <div>
                <p className="font-bold font-google text-white text-xs">Google Cloud Lab</p>
                <p className="text-[11px] text-gray-300">Free $300 Credits</p>
              </div>
              <div className="ml-1 h-2 w-2 rounded-full bg-[#34A853]" />
            </div>
          </TiltWidget>
        </motion.div>

        {/* ==========================================
             DECORATIVE 3D GEOMETRIC SHAPES
             ========================================== */}
        {/* Floating Google Blue Cube */}
        <div
          style={{ transform: "translateZ(30px)" }}
          className="absolute top-1/4 -left-6 h-12 w-12 -rotate-45 animate-spin-slow rounded-xl border border-white/20 bg-gradient-to-br from-[#4285F4] to-blue-700 opacity-85 shadow-lg"
        />

        {/* Floating Yellow Ring */}
        <div
          style={{ transform: "translateZ(25px)" }}
          className="absolute top-12 right-28 h-14 w-14 animate-spin-slow rounded-full border-4 border-[#FBBC05] border-dashed opacity-60"
        />

        {/* Floating Green Diamond */}
        <div
          style={{ transform: "translateZ(35px)" }}
          className="absolute -right-4 bottom-28 h-10 w-10 rotate-45 animate-pulse-subtle rounded-lg border border-white/20 bg-[#34A853] opacity-80 shadow-lg"
        />

        {/* Stylized Glow Cross / Star */}
        <div
          style={{ transform: "translateZ(20px)" }}
          className="absolute bottom-16 left-32 animate-pulse select-none font-mono text-2xl text-[#EA4335]/70"
        >
          ✦
        </div>
        <div
          style={{ transform: "translateZ(20px)" }}
          className="absolute top-24 left-1/3 animate-pulse select-none font-mono text-[#4285F4]/60 text-xl"
        >
          ✦
        </div>
      </motion.div>

      <div className="pointer-events-none absolute right-6 bottom-4 left-6 flex items-center justify-between text-[11px] text-gray-500">
        <span className="flex items-center gap-1 font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4285F4]" />
          Interactive 3D Festival Space
        </span>
        <span className="hidden sm:inline">Widgets dynamically angle towards your cursor</span>
      </div>
    </aside>
  );
};
