"use client";

import type { FC } from "react";
import { GdgLogoSvg } from "@/SVGs/gdg-logo-svg";

type MobileHeaderProps = {
  isAuthenticated?: boolean;
  onSignOut?: () => void;
  userEmail?: string;
};

export const MobileHeader: FC<MobileHeaderProps> = ({ isAuthenticated = false, onSignOut, userEmail = "student@ucsc.edu" }) => (
  <header className="flex w-full items-center justify-between border-gray-200/80 border-b bg-white/80 px-4 py-3 backdrop-blur-md">
    <div className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200/80 bg-white shadow-xs">
        <GdgLogoSvg className="h-3 w-auto" />
      </div>
      <div>
        <h1 className="font-bold font-google text-gray-900 text-sm tracking-tight">GDG at UCSC</h1>
        <p className="font-mono text-[10px] text-gray-500">DevFest &apos;26</p>
      </div>
    </div>

    <div className="flex items-center gap-2">
      {isAuthenticated ? (
        <div className="flex items-center gap-2">
          <span className="max-w-[120px] xs:max-w-none truncate font-mono text-[11px] text-gray-600">{userEmail}</span>
          <button
            type="button"
            onClick={onSignOut}
            className="rounded-lg border border-gray-200 bg-gray-100 px-2.5 py-1 font-medium text-gray-700 text-xs transition-colors hover:bg-gray-200 active:scale-95"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#4285F4]/30 bg-[#4285F4]/10 px-2.5 py-0.5 font-semibold text-[#1A73E8] text-[11px]">
          <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#34A853]" />
          <span>Fall &apos;26</span>
        </div>
      )}
    </div>
  </header>
);
