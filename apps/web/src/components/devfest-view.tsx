"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ApplicationFormView } from "./desktop-view/application/application-form-view";
import { AuthSignInView } from "./desktop-view/auth/auth-signin-view";
import { DevFestHeader } from "./desktop-view/devfest-header";
import { DevFestStage3D } from "./desktop-view/devfest-stage-3d";

type DevFestViewProps = {
  isAuthenticated: boolean;
  isLoading?: boolean;
  userEmail?: string;
};

export function DevFestView({ isAuthenticated, isLoading = false, userEmail = "hacker@ucsc.edu" }: DevFestViewProps) {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-[#F8F9FA] lg:h-screen lg:flex-row lg:overflow-hidden">
      <main className="relative z-10 order-2 flex min-h-0 w-full flex-1 flex-col rounded-t-3xl border-gray-200/80 border-t bg-white px-5 pt-7 pb-10 shadow-sm lg:order-1 lg:h-screen lg:w-1/2 lg:rounded-none lg:border-0 lg:px-12 lg:py-8 lg:shadow-none xl:px-14">
        <div className="hidden lg:block">
          <DevFestHeader isAuthenticated={isAuthenticated} userEmail={userEmail} />
        </div>

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
            <ApplicationFormView key="authed-form" userEmail={userEmail} />
          ) : (
            <AuthSignInView key="unauthed-signin" />
          )}
        </AnimatePresence>

        <footer className="mt-10 flex w-full flex-col items-center justify-between gap-2 border-gray-100 border-t pt-6 text-center text-gray-500 text-xs lg:mt-auto lg:flex-row lg:pt-4 lg:text-left">
          <div className="flex items-center gap-1.5 lg:gap-2">
            <span>Supported by</span>
            <span className="font-semibold text-gray-800">Google Developer Groups</span>
          </div>

          <div className="flex flex-col items-center gap-2 border border-red-500 text-[11px] text-gray-400 lg:flex-row lg:gap-4 lg:text-xs">
            <div className="flex items-center gap-3 lg:gap-4">
              <a href="#rules" className="transition-colors hover:text-[#4285F4]">
                Code of Conduct
              </a>
              <span>•</span>
              <a href="#faq" className="transition-colors hover:text-[#4285F4]">
                FAQ
              </a>
            </div>
          </div>
        </footer>
      </main>

      <DevFestStage3D />
    </div>
  );
}
