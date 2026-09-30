"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ApplicationFormView } from "@/components/application-form-view";
import { AuthSignInView } from "@/components/auth-signin-view";
import { DevFestHeader } from "@/components/devfest-header";
import { DevFestStage3D } from "@/components/devfest-stage-3d";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [demoEmail] = useState("hacker@ucsc.edu");

  return (
    <>
      {/* ==========================================
           MOBILE VIEW PLACEHOLDER (< lg)
           ========================================== */}
      <div className="flex min-h-screen w-full items-center justify-center bg-white p-6 lg:hidden">
        <div className="rounded-2xl border border-gray-200 bg-gray-50/90 px-6 py-3.5 font-google font-medium text-gray-600 text-sm shadow-xs">
          mobile view
        </div>
      </div>

      {/* ==========================================
           DESKTOP VIEW: TWO-COLUMN LAYOUT (>= lg)
           ========================================== */}
      <div className="hidden min-h-screen w-full flex-col overflow-x-hidden lg:flex lg:flex-row">
        {/* ==========================================
             LEFT COLUMN: INTERACTIVE REGISTRATION PANEL
             ========================================== */}
        <main className="relative z-10 flex min-h-screen w-full flex-col bg-white px-6 py-8 sm:px-12 md:px-16 lg:w-1/2 lg:py-10 xl:px-24">
          <DevFestHeader isAuthenticated={isAuthenticated} userEmail={demoEmail} onSignOut={() => setIsAuthenticated(false)} />

          <AnimatePresence mode="wait">
            {isAuthenticated ? (
              <ApplicationFormView key="authed-form" userEmail={demoEmail} onSignOut={() => setIsAuthenticated(false)} />
            ) : (
              <AuthSignInView key="unauthed-signin" onSignIn={() => setIsAuthenticated(true)} />
            )}
          </AnimatePresence>

          <footer className="mt-auto flex w-full flex-col items-center justify-between gap-2 border-gray-100 border-t pt-8 text-gray-500 text-xs sm:flex-row">
            <div className="flex items-center gap-2">
              <span>Supported by</span>
              <span className="font-semibold text-gray-800">Google Developer Groups</span>
            </div>

            <div className="flex items-center gap-4 text-gray-400">
              <button
                type="button"
                onClick={() => setIsAuthenticated(!isAuthenticated)}
                className="font-mono text-[#4285F4] text-[11px] hover:underline"
              >
                [Toggle State: {isAuthenticated ? "Authed" : "Unauthed"}]
              </button>
              <span>•</span>
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
    </>
  );
}
