"use client";

import { motion } from "framer-motion";
import type { FC } from "react";
import { GoogleSvg } from "@/SVGs/google-svg";

type AuthSignInViewProps = {
  onSignIn: () => void;
};

export const AuthSignInView: FC<AuthSignInViewProps> = ({ onSignIn }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="w-full"
    >
      {/* 48-Hour Badge row */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gray-100/90 px-3 py-1 font-medium text-gray-700 text-xs">
        <span className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-[#4285F4]" />
          <span className="h-2 w-2 rounded-full bg-[#EA4335]" />
          <span className="h-2 w-2 rounded-full bg-[#FBBC05]" />
          <span className="h-2 w-2 rounded-full bg-[#34A853]" />
        </span>
        <span>24 Hours to Innovate, Build & Scale</span>
      </div>

      <h2 className="font-extrabold font-google text-3xl text-gray-900 leading-[1.12] tracking-tight sm:text-4xl md:text-5xl">
        Welcome to{" "}
        <span className="inline-block tracking-tight">
          <span className="text-[#4285F4]">G</span>
          <span className="text-[#EA4335]">D</span>
          <span className="text-[#FBBC05]">G</span>
          <span className="text-[#34A853]">C</span>
          <span className="text-[#4285F4]">&apos;s</span>
        </span>{" "}
        <br />
        <span className="bg-gradient-to-r from-[#4285F4] via-[#7c3aed] to-[#EA4335] bg-clip-text text-transparent">DevFest Hackathon</span>
      </h2>

      <p className="mt-4 font-normal text-base text-gray-600 leading-relaxed sm:text-lg">
        Join 5,000+ university students, engineers, and creators building solutions powered by Gemini, Android, Cloud, and Web technologies. Turn
        wild ideas into shipped prototypes.
      </p>

      {/* Google SSO Container */}
      <div className="mt-8 w-full space-y-3">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onSignIn}
          className="group relative flex w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-full border border-gray-300 px-6 py-4 font-google font-medium text-base text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:ring-offset-2 active:bg-gray-100"
        >
          {/* Google 4-Color 'G' Logo SVG */}
          <GoogleSvg className="h-5 w-5 shrink-0 transition-transform group-hover:scale-105" />
          <span className="font-semibold text-sm tracking-wide">Continue with Google Account</span>
        </motion.button>
        <p className="text-center text-gray-400 text-xs">
          Sign in using your student or personal Google account to proceed with your application.
        </p>
      </div>

      {/* Hackathon Essentials */}
      <div className="mt-10 w-full border-gray-100 border-t pt-6">
        <p className="mb-3 font-mono font-semibold text-gray-400 text-xs uppercase tracking-wider">Hackathon Essentials</p>
        <div className="grid w-full grid-cols-3 gap-3">
          <div className="rounded-xl border border-gray-100 border-t-2 border-t-[#4285F4] bg-gray-50/80 p-3 text-center transition-all hover:bg-white hover:shadow-xs">
            <span className="block font-medium text-gray-500 text-xs">Timeline</span>
            <span className="mt-0.5 block font-bold text-gray-900 text-sm">Nov 14-15</span>
            <span className="mt-1.5 inline-block rounded-md bg-[#4285F4]/10 px-2 py-0.5 font-semibold text-[#1A73E8] text-[10px]">
              24-Hour Sprint
            </span>
          </div>
          <div className="rounded-xl border border-gray-100 border-t-2 border-t-[#34A853] bg-gray-50/80 p-3 text-center transition-all hover:bg-white hover:shadow-xs">
            <span className="block font-medium text-gray-500 text-xs">Prize Pool</span>
            <span className="mt-0.5 block font-bold text-gray-900 text-sm">$2,000</span>
            <span className="mt-1.5 inline-block rounded-md bg-[#34A853]/10 px-2 py-0.5 font-semibold text-[#1E8E3E] text-[10px]">
              Prizes & Swag
            </span>
          </div>
          <div className="rounded-xl border border-gray-100 border-t-2 border-t-[#EA4335] bg-gray-50/80 p-3 text-center transition-all hover:bg-white hover:shadow-xs">
            <span className="block font-medium text-gray-500 text-xs">Tracks</span>
            <span className="mt-0.5 block font-bold text-gray-900 text-sm">4 Themes</span>
            <span className="mt-1.5 inline-block rounded-md bg-[#EA4335]/10 px-2 py-0.5 font-semibold text-[#D93025] text-[10px]">
              All Skill Levels
            </span>
          </div>
        </div>

        {/* Subtle Google 4-Color Accent Strip */}
        <div className="mt-6 flex h-1 w-full overflow-hidden rounded-full opacity-80">
          <div className="w-1/4 bg-[#4285F4]" />
          <div className="w-1/4 bg-[#EA4335]" />
          <div className="w-1/4 bg-[#FBBC05]" />
          <div className="w-1/4 bg-[#34A853]" />
        </div>
      </div>
    </motion.div>
  );
};
