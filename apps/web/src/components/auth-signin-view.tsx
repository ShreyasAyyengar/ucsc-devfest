"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { type FC, type FormEvent, useState } from "react";

interface AuthSignInViewProps {
  onSignIn: () => void;
}

export const AuthSignInView: FC<AuthSignInViewProps> = ({ onSignIn }) => {
  const [email, setEmail] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCampusSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setToastMessage("Verification link sent! Check your student inbox to complete your application.");
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="my-auto w-full max-w-lg"
    >
      {/* 48-Hour Badge row */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gray-100/90 px-3 py-1 font-medium text-gray-700 text-xs">
        <span className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-[#4285F4]" />
          <span className="h-2 w-2 rounded-full bg-[#EA4335]" />
          <span className="h-2 w-2 rounded-full bg-[#FBBC05]" />
          <span className="h-2 w-2 rounded-full bg-[#34A853]" />
        </span>
        <span>48 Hours to Innovate, Build & Scale</span>
      </div>

      <h2 className="font-extrabold font-google text-3xl text-gray-900 leading-[1.12] tracking-tight sm:text-4xl md:text-5xl">
        Welcome to <br />
        <span className="bg-gradient-to-r from-[#4285F4] via-[#7c3aed] to-[#EA4335] bg-clip-text text-transparent">DevFest Hackathon</span>
      </h2>

      <p className="mt-4 font-normal text-base text-gray-600 leading-relaxed sm:text-lg">
        Join 5,000+ university students, engineers, and creators building solutions powered by Gemini, Android, Cloud, and Web technologies. Turn
        wild ideas into shipped prototypes.
      </p>

      <div className="mt-8 space-y-4">
        {/* Authentic 'Sign in with Google' Pill Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onSignIn}
          className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full border border-gray-300 px-6 py-3.5 font-google font-medium text-base text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:ring-offset-2 active:bg-gray-100"
        >
          {/* Google 4-Color 'G' Logo SVG */}
          <svg className="h-5 w-5 shrink-0 transition-transform group-hover:scale-105" viewBox="0 0 24 24" role="img" aria-label="Google logo">
            <title>Google Logo</title>
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span className="font-semibold text-sm tracking-wide">Continue with Google Account</span>
        </motion.button>

        {/* Divider */}
        <div className="relative my-4 flex items-center justify-center">
          <div className="w-full border-gray-200 border-t" />
          <span className="bg-white px-3 font-mono text-gray-400 text-xs uppercase tracking-widest">or register with campus SSO</span>
          <div className="w-full border-gray-200 border-t" />
        </div>

        {/* Secondary Quick Form */}
        <form onSubmit={handleCampusSubmit} className="space-y-3">
          <div className="relative">
            <label htmlFor="campusEmail" className="sr-only">
              University / Student Email
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
              <Mail className="h-4 w-4" />
            </div>
            <input
              type="email"
              id="campusEmail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@university.edu"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pr-4 pl-10 text-gray-800 text-sm placeholder-gray-400 transition-all focus:border-[#4285F4] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]/50"
            />
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 font-semibold text-sm text-white shadow-sm transition-all hover:bg-black hover:shadow active:scale-[0.99]"
          >
            <span>Apply with University Email</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Notification feedback */}
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded-xl border border-[#34A853]/30 bg-[#E6F4EA] p-3 text-[#1E8E3E] text-xs"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0 text-[#34A853]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </div>

      <div className="mt-10 border-gray-100 border-t pt-6">
        <p className="mb-3 font-mono font-semibold text-gray-400 text-xs uppercase tracking-wider">Hackathon Essentials</p>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-3 text-center">
            <span className="block font-medium text-gray-500 text-xs">Timeline</span>
            <span className="mt-0.5 block font-bold text-gray-900 text-sm">Oct 16-18</span>
            <span className="inline-block font-semibold text-[#4285F4] text-[10px]">Virtual & Hybrid</span>
          </div>
          <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-3 text-center">
            <span className="block font-medium text-gray-500 text-xs">Prize Pool</span>
            <span className="mt-0.5 block font-bold text-gray-900 text-sm">$75,000</span>
            <span className="inline-block font-semibold text-[#34A853] text-[10px]">+ Mentorship</span>
          </div>
          <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-3 text-center">
            <span className="block font-medium text-gray-500 text-xs">Tracks</span>
            <span className="mt-0.5 block font-bold text-gray-900 text-sm">4 Themes</span>
            <span className="inline-block font-semibold text-[#EA4335] text-[10px]">AI & Cloud</span>
          </div>
        </div>
      </div>

      {/* Hackathon Track Pills */}
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <span className="rounded-md bg-[#4285F4]/10 px-2.5 py-1 font-medium font-mono text-[#1A73E8]">#GeminiAPI</span>
        <span className="rounded-md bg-[#34A853]/10 px-2.5 py-1 font-medium font-mono text-[#1E8E3E]">#FirebaseCloud</span>
        <span className="rounded-md bg-[#FBBC05]/15 px-2.5 py-1 font-medium font-mono text-[#F9AB00]">#FlutterMultiplatform</span>
        <span className="rounded-md bg-[#EA4335]/10 px-2.5 py-1 font-medium font-mono text-[#D93025]">#ResponsibleAI</span>
      </div>
    </motion.div>
  );
};
