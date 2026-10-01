"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ApplicationFormView } from "./application/application-form-view";
import { AuthSignInView } from "./auth/auth-signin-view";
import { DevFestHeader } from "./devfest-header";
import { DevFestStage3D } from "./devfest-stage-3d";

type DesktopViewProps = {
  isAuthenticated: boolean;
  isLoading?: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
  onToggleAuth?: () => void;
  userEmail?: string;
};

export function DesktopView({
  isAuthenticated,
  isLoading = false,
  onSignIn,
  onSignOut,
  onToggleAuth,
  userEmail = "hacker@ucsc.edu",
}: DesktopViewProps) {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden lg:h-screen lg:flex-row lg:overflow-hidden">
      {/* ==========================================
           LEFT COLUMN: INTERACTIVE REGISTRATION PANEL
           ========================================== */}
      <main className="relative z-10 flex min-h-screen w-full flex-col bg-white px-6 py-8 sm:px-10 md:px-12 lg:h-screen lg:w-1/2 lg:py-8 xl:px-14">
        <DevFestHeader isAuthenticated={isAuthenticated} userEmail={userEmail} onSignOut={onSignOut} />

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-1 items-center justify-center py-20"
            >
              <div className="flex items-center gap-2.5 font-google text-gray-500 text-sm">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#4285F4] border-t-transparent" />
                <span>Checking session...</span>
              </div>
            </motion.div>
          ) : isAuthenticated ? (
            <ApplicationFormView key="authed-form" userEmail={userEmail} onSignOut={onSignOut} />
          ) : (
            <AuthSignInView key="unauthed-signin" onSignIn={onSignIn} />
          )}
        </AnimatePresence>

        <footer className="mt-auto flex w-full flex-col items-center justify-between gap-2 border-gray-100 border-t pt-4 text-gray-500 text-xs sm:flex-row sm:pt-6">
          <div className="flex items-center gap-2">
            <span>Supported by</span>
            <span className="font-semibold text-gray-800">Google Developer Groups</span>
          </div>

          <div className="flex items-center gap-4 text-gray-400">
            {onToggleAuth ? (
              <>
                {/* TODO: REMOVE THIS SHIT */}
                <button type="button" onClick={onToggleAuth} className="font-mono text-[#4285F4] text-[11px] hover:underline">
                  [Toggle State: {isAuthenticated ? "Authed" : "Unauthed"}]
                </button>
                <span>•</span>
              </>
            ) : null}
            <a href="#rules" className="transition-colors hover:text-[#4285F4]">
              Code of Conduct
            </a>
            <span>•</span>
            <a href="#faq" className="transition-colors hover:text-[#4285F4]">
              FAQ
            </a>
          </div>
        </footer>
      </main>

      {/* ==========================================
           RIGHT COLUMN: VIBRANT 3D GOOGLE TECH ARTWORK
           ========================================== */}
      <DevFestStage3D />
    </div>
  );
}
