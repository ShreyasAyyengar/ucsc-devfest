"use client";

import { useMutation, useQuery } from "convex/react";
import { ConvexError } from "convex/values";
import { AnimatePresence, motion } from "framer-motion";
import { type FC, useEffect, useState } from "react";
import { api } from "../../../../backend/convex/_generated/api";
import { GdgGlowingBackdrop } from "../desktop-view/gdg-glowing-backdrop";
import { MobileApplicationFormView, type MobileFormData } from "./mobile-application-form-view";
import { MobileApplicationSubmittedView } from "./mobile-application-submitted-view";
import { MobileAuthSignInView } from "./mobile-auth-signin-view";
import { MobileCountdown } from "./mobile-countdown";

export type MobileViewProps = {
  isAuthenticated?: boolean;
  isLoading?: boolean;
  onSignIn?: () => void;
  onSignOut?: () => void;
  onToggleAuth?: () => void;
  userEmail?: string;
};

export const MobileView: FC<MobileViewProps> = ({
  isAuthenticated: propIsAuthenticated = false,
  isLoading = false,
  onSignIn: propOnSignIn,
  onSignOut: propOnSignOut,
  onToggleAuth: propOnToggleAuth,
  userEmail = "student@ucsc.edu",
}) => {
  // Local fallback state if used standalone
  const [localAuth, setLocalAuth] = useState<boolean | null>(null);
  const isAuthenticated = localAuth !== null ? localAuth : propIsAuthenticated;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<MobileFormData | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const deleteRegistration = useMutation(api.application.service.deleteRegistration);
  const existingRegistration = useQuery(api.application.service.getRegistration, isAuthenticated ? {} : "skip");
  const isCheckingRegistration = isAuthenticated && existingRegistration === undefined;

  useEffect(() => {
    if (!isAuthenticated) {
      setIsSubmitted(false);
      setSubmittedData(null);
      return;
    }
    if (existingRegistration) {
      setIsSubmitted(true);
      setSubmittedData(existingRegistration);
    } else if (existingRegistration === null) {
      setIsSubmitted(false);
      setSubmittedData(null);
    }
  }, [existingRegistration, isAuthenticated]);

  const handleSignIn = () => {
    if (propOnSignIn) {
      propOnSignIn();
    } else {
      setLocalAuth(true);
    }
  };

  const handleSignOut = () => {
    if (propOnSignOut) {
      propOnSignOut();
    } else {
      setLocalAuth(false);
    }
  };

  const handleToggleAuth = () => {
    if (propOnToggleAuth) {
      propOnToggleAuth();
    } else {
      setLocalAuth((prev) => (prev === null ? !propIsAuthenticated : !prev));
    }
  };

  const handleSubmitSuccess = (data: MobileFormData) => {
    setSubmittedData(data);
    setIsSubmitted(true);
  };

  const handleWithdraw = async () => {
    setDeleteError(null);
    setIsDeleting(true);
    try {
      await deleteRegistration({});
      setIsSubmitted(false);
      setSubmittedData(null);
    } catch (err) {
      if (err instanceof ConvexError) {
        const data = err.data as { code?: string; message?: string };
        setDeleteError(data.message || err.message);
      } else if (err instanceof Error) {
        setDeleteError(err.message);
      } else {
        setDeleteError("Failed to withdraw application. Please try again.");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F8F9FA] text-gray-900">
      {/* 1. Mobile Header */}
      {/* <MobileHeader isAuthenticated={isAuthenticated} userEmail={userEmail} onSignOut={handleSignOut} /> */}

      {/* 2. Top Hero Section: Ambient Glow & Mobile Countdown */}
      <section className="relative overflow-hidden px-4 pt-5 pb-6">
        {/* Background Huge Glowing GDG Logo */}
        <GdgGlowingBackdrop variant="mobile" />

        {/* Mobile Countdown */}
        <div className="relative z-10 mx-auto max-w-md">
          <MobileCountdown />
        </div>
      </section>

      {/* 3. Main Form / Auth Surface (Clean White Container) */}
      <main className="relative z-10 flex-1 rounded-t-3xl border-gray-200/80 border-t bg-white px-5 pt-7 pb-10 shadow-sm">
        <div className="mx-auto max-w-md">
          <AnimatePresence mode="wait">
            {isLoading || isCheckingRegistration ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center space-y-3 py-16 text-center"
              >
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-[#4285F4] border-t-transparent" />
                <p className="font-google text-gray-500 text-sm">{isLoading ? "Checking session..." : "Checking application status..."}</p>
              </motion.div>
            ) : !isAuthenticated ? (
              <MobileAuthSignInView key="signin" onSignIn={handleSignIn} />
            ) : isSubmitted ? (
              <MobileApplicationSubmittedView
                key="submitted"
                userEmail={userEmail}
                isDeleting={isDeleting}
                deleteError={deleteError}
                onWithdraw={handleWithdraw}
                onSignOut={handleSignOut}
                summaryData={
                  submittedData
                    ? {
                        identity: {
                          name: submittedData.identity.name,
                          major: submittedData.identity.major,
                        },
                        skillLevel: {
                          teamRole: submittedData.skillLevel.teamRole,
                          codingComfort: submittedData.skillLevel.codingComfort,
                          toolsUsed: submittedData.skillLevel.toolsUsed,
                        },
                      }
                    : undefined
                }
              />
            ) : (
              <MobileApplicationFormView
                key="form"
                userEmail={userEmail}
                initialValues={submittedData}
                onSubmitSuccess={handleSubmitSuccess}
                onSignOut={handleSignOut}
              />
            )}
          </AnimatePresence>

          {/* 4. Mobile Footer */}
          <footer className="mt-10 border-gray-100 border-t pt-6 text-center text-gray-500 text-xs">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-1.5">
                <span>Supported by</span>
                <span className="font-semibold text-gray-800">Google Developer Groups</span>
              </div>

              {isAuthenticated && (
                <div className="flex items-center gap-2 text-[11px] text-gray-400">
                  <span className="max-w-[180px] truncate font-medium text-gray-600">{userEmail}</span>
                  <span>•</span>
                  <button type="button" onClick={handleSignOut} className="font-medium text-gray-500 hover:text-gray-800 hover:underline">
                    Sign out
                  </button>
                </div>
              )}

              {/* State Toggle Helper for Testing */}
              <div className="mt-1 flex items-center gap-2 text-[11px] text-gray-400">
                <button type="button" onClick={handleToggleAuth} className="font-mono text-[#4285F4] hover:underline">
                  [Toggle Auth State: {isAuthenticated ? "Authed" : "Unauthed"}]
                </button>
              </div>

              <div className="mt-2 flex items-center justify-center gap-3 text-gray-400">
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
        </div>
      </main>
    </div>
  );
};
