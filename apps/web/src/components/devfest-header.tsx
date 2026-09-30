import type { FC } from "react";
import { GdgLogoSvg } from "@/SVGs/gdg-logo-svg";

interface DevFestHeaderProps {
  isAuthenticated?: boolean;
  onSignOut?: () => void;
  userEmail?: string;
}

export const DevFestHeader: FC<DevFestHeaderProps> = ({ isAuthenticated = false, onSignOut, userEmail = "student@ucsc.edu" }) => {
  return (
    <header className="mb-6 flex w-full items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        {/* Google Developer Groups Logo */}
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200/90 bg-gray-50 shadow-xs">
          <GdgLogoSvg className="h-3.5 w-auto" />
        </div>
        <h1 className="font-bold font-google text-gray-900 text-sm tracking-tight sm:text-base">Google Developer Groups at UCSC</h1>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <span className="hidden font-mono text-gray-500 text-xs sm:inline-block">{userEmail}</span>
            <button
              type="button"
              onClick={onSignOut}
              className="rounded-lg border border-gray-200 px-2.5 py-1 text-gray-600 text-xs transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#4285F4]/15 bg-[#E8F0FE] px-3 py-1 font-semibold text-[#1A73E8] text-xs">
            <span className="h-2 w-2 animate-ping rounded-full bg-[#34A853]" />
            <span>Fall 2026 Edition</span>
          </div>
        )}
      </div>
    </header>
  );
};
