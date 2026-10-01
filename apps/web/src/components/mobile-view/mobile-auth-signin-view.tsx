"use client";

import { motion } from "framer-motion";
import type { FC } from "react";
import { GoogleSvg } from "@/SVGs/google-svg";

type MobileAuthSignInViewProps = {
  onSignIn: () => void;
};

export const MobileAuthSignInView: FC<MobileAuthSignInViewProps> = ({ onSignIn }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-full space-y-5"
    >
      {/* 24-Hour Badge row */}
      <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700 text-xs">
        <span className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4285F4]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#EA4335]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#FBBC05]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#34A853]" />
        </span>
        <span>24-Hour Innovation Sprint</span>
      </div>

      <div>
        <h2 className="font-extrabold font-google text-2xl text-gray-900 leading-tight tracking-tight sm:text-3xl">
          Welcome to{" "}
          <span className="inline-block tracking-tight">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">D</span>
            <span className="text-[#FBBC05]">G</span>
            <span className="text-[#34A853]">C</span>
            <span className="text-[#4285F4]">&apos;s</span>
          </span>{" "}
          <span className="mt-1 block bg-gradient-to-r from-[#4285F4] via-[#7c3aed] to-[#EA4335] bg-clip-text font-google font-thin text-3xl text-transparent tracking-tight sm:text-4xl">
            DevFest Hackathon
          </span>
        </h2>

        <p className="mt-2.5 text-gray-600 text-sm leading-relaxed">
          Join 5,000+ university students, engineers, and creators building solutions powered by Gemini, Android, Cloud, and Web technologies.
        </p>
      </div>

      {/* Google SSO Container */}
      <div className="w-full space-y-2.5 pt-1">
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onSignIn}
          className="relative flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-gray-300 bg-white px-5 py-3.5 font-google font-medium text-gray-700 text-sm shadow-sm transition-all hover:bg-gray-50 active:bg-gray-100"
        >
          <GoogleSvg className="h-5 w-5 shrink-0" />
          <span className="font-semibold">Continue with Google</span>
        </motion.button>
        <p className="text-center text-gray-400 text-xs">Sign in using your student or Google account to apply.</p>
      </div>

      {/* Hackathon Essentials Mobile Grid */}
      <div className="w-full border-gray-100 border-t pt-4">
        <p className="mb-2.5 font-mono font-semibold text-gray-400 text-xs uppercase tracking-wider">Hackathon Essentials</p>
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl border border-gray-100 border-t-2 border-t-[#4285F4] bg-gray-50/80 p-2.5 text-center">
            <span className="block font-medium text-[11px] text-gray-500">Timeline</span>
            <span className="mt-0.5 block font-bold text-gray-900 text-xs">Nov 14-15</span>
            <span className="mt-1 inline-block rounded bg-[#4285F4]/10 px-1.5 py-0.5 font-semibold text-[#1A73E8] text-[9px]">24 Hours</span>
          </div>

          <div className="rounded-xl border border-gray-100 border-t-2 border-t-[#34A853] bg-gray-50/80 p-2.5 text-center">
            <span className="block font-medium text-[11px] text-gray-500">Prize Pool</span>
            <span className="mt-0.5 block font-bold text-gray-900 text-xs">$2,000</span>
            <span className="mt-1 inline-block rounded bg-[#34A853]/10 px-1.5 py-0.5 font-semibold text-[#1E8E3E] text-[9px]">
              Prizes, Swag &amp; Credits
            </span>
          </div>

          <div className="rounded-xl border border-gray-100 border-t-2 border-t-[#EA4335] bg-gray-50/80 p-2.5 text-center">
            <span className="block font-medium text-[11px] text-gray-500">Tracks</span>
            <span className="mt-0.5 block font-bold text-gray-900 text-xs">4 Themes</span>
            <span className="mt-1 inline-block rounded bg-[#EA4335]/10 px-1.5 py-0.5 font-semibold text-[#D93025] text-[9px]">All Levels</span>
          </div>
        </div>

        {/* Subtle Google 4-Color Accent Strip */}
        <div className="mt-4 flex h-1 w-full overflow-hidden rounded-full opacity-80">
          <div className="w-1/4 bg-[#4285F4]" />
          <div className="w-1/4 bg-[#EA4335]" />
          <div className="w-1/4 bg-[#FBBC05]" />
          <div className="w-1/4 bg-[#34A853]" />
        </div>
      </div>
    </motion.div>
  );
};
