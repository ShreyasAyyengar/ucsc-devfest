import type { FC } from "react";

interface DevFestHeaderProps {
  isAuthenticated?: boolean;
  onSignOut?: () => void;
  userEmail?: string;
}

export const DevFestHeader: FC<DevFestHeaderProps> = ({ isAuthenticated = false, onSignOut, userEmail = "student@ucsc.edu" }) => {
  return (
    <header className="mb-8 flex w-full items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Stylized Google Developer Brackets icon */}
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200/90 bg-gray-50 shadow-xs">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" role="img" aria-label="DevFest Logo">
            <title>DevFest Logo</title>
            <path d="M8 7L3 12L8 17" stroke="#4285F4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 7L21 12L16 17" stroke="#EA4335" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="14" y1="5" x2="10" y2="19" stroke="#34A853" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <h1 className="font-black font-google text-gray-900 text-xl leading-none tracking-tight">GOOGLE DEV FEST</h1>
          <span className="font-semibold text-[10px] text-gray-400 uppercase tracking-wider">Global Student Hackathon</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
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
