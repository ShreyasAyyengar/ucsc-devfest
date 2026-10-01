"use client";

import type { FC } from "react";
import { GdgLogoSvg } from "@/SVGs/gdg-logo-svg";

interface MobileHeaderProps {
  isAuthenticated?: boolean;
  onSignOut?: () => void;
  userEmail?: string;
}

export const MobileHeader: FC<MobileHeaderProps> = ({ isAuthenticated = false, onSignOut, userEmail = "student@ucsc.edu" }) => {
  return (
    <header className="flex w-full items-center justify-between border-white/10 border-b bg-[#0d1117]/80 px-4 py-3 backdrop-blur-md">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/10 shadow-xs">
          <GdgLogoSvg className="h-3 w-auto" />
        </div>
        <div>
          <h1 className="font-bold font-google text-sm text-white tracking-tight">GDG at UCSC</h1>
          <p className="font-mono text-[10px] text-gray-400">DevFest &apos;26</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <span className="max-w-[120px] truncate font-mono text-[11px] text-gray-300 xs:max-w-none">{userEmail}</span>
            <button
              type="button"
              onClick={onSignOut}
              className="rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 font-medium text-white text-xs transition-colors hover:bg-white/20 active:scale-95"
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#4285F4]/30 bg-[#4285F4]/15 px-2.5 py-0.5 font-semibold text-[#8ab4f8] text-[11px]">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#34A853]" />
            <span>Fall &apos;26</span>
          </div>
        )}
      </div>
    </header>
  );
};
