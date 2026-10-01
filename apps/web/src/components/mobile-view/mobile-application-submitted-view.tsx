"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@ucsc-devfest/shad-ui/components/alert-dialog";
import { motion } from "framer-motion";
import { AlertTriangle, Calendar, CheckCircle2, Mail, Users } from "lucide-react";
import type { FC } from "react";

type MobileApplicationSubmittedViewProps = {
  userEmail: string;
  isDeleting?: boolean;
  deleteError?: string | null;
  onWithdraw: () => void;
  onSignOut?: () => void;
  summaryData?: {
    identity?: {
      name?: string;
      major?: string;
    };
    skillLevel?: {
      teamRole?: string;
      codingComfort?: string;
      toolsUsed?: string[];
    };
  };
};

export const MobileApplicationSubmittedView: FC<MobileApplicationSubmittedViewProps> = ({
  userEmail,
  isDeleting = false,
  deleteError = null,
  onWithdraw,
  onSignOut,
  summaryData,
}) => {
  const hasSummary = Boolean(summaryData?.identity?.name && summaryData?.identity?.major);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className="w-full space-y-4"
    >
      {/* Confirmation Banner */}
      <div className="space-y-3 rounded-2xl border border-[#4285F4]/30 bg-[#E8F0FE] p-5 text-center">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#4285F4] text-white shadow-md">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-bold font-google text-gray-900 text-lg">Application Submitted!</h3>
          <p className="mt-1 text-gray-600 text-xs leading-relaxed">
            We’ve received your registration for DevFest 2026. Keep an eye on <span className="font-semibold text-gray-800">{userEmail}</span>{" "}
            for updates.
          </p>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              type="button"
              disabled={isDeleting}
              className="mx-auto flex cursor-pointer items-center justify-center gap-1.5 pt-1 font-semibold text-red-600 text-xs hover:text-red-700 active:underline disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDeleting ? (
                <>
                  <span className="h-3 w-3 animate-spin rounded-full border border-red-600 border-t-transparent" />
                  <span>Withdrawing application...</span>
                </>
              ) : (
                <span>Withdraw application</span>
              )}
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="fixed top-1/2 left-1/2 z-[101] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl sm:p-6">
            <AlertDialogHeader className="text-left sm:text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <AlertDialogTitle className="font-bold font-google text-gray-900 text-lg">Withdraw Application?</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600 text-xs leading-relaxed">
                Are you sure you want to withdraw your DevFest 2026 application? Your registration spot will be released, and you'll need to
                submit a new application if you change your mind.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <AlertDialogCancel className="cursor-pointer rounded-xl border border-gray-200 px-4 py-2.5 font-medium text-gray-700 text-xs hover:bg-gray-100">
                Keep Application
              </AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                onClick={onWithdraw}
                className="cursor-pointer rounded-xl bg-red-600 px-4 py-2.5 font-semibold text-white text-xs hover:bg-red-700"
              >
                Yes, Withdraw
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {onSignOut && (
          <button
            type="button"
            onClick={onSignOut}
            className="mx-auto flex cursor-pointer items-center justify-center gap-1.5 pt-1 font-medium text-gray-500 text-xs hover:text-gray-800 hover:underline"
          >
            Sign out
          </button>
        )}

        {deleteError && (
          <div className="mt-2 rounded-xl border border-red-200 bg-red-50 p-2.5 text-left text-red-700 text-xs">
            <span className="font-semibold">Withdraw failed:</span> {deleteError}
          </div>
        )}
      </div>

      {/* Application Overview Card */}
      {hasSummary && summaryData?.identity && (
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between border-gray-100 border-b pb-2">
            <span className="font-semibold text-gray-900 text-xs">Application Overview</span>
            <span className="rounded-full bg-[#E6F4EA] px-2 py-0.5 font-medium text-[#1E8E3E] text-[10px]">Active Application</span>
          </div>

          <div className="mt-2.5 grid grid-cols-2 gap-2.5 text-xs">
            <div>
              <span className="block text-[11px] text-gray-400">Applicant</span>
              <span className="block truncate font-medium text-gray-800">{summaryData.identity.name}</span>
            </div>
            <div>
              <span className="block text-[11px] text-gray-400">Major</span>
              <span className="block truncate font-medium text-gray-800">{summaryData.identity.major}</span>
            </div>
            {summaryData.skillLevel?.teamRole && (
              <div>
                <span className="block text-[11px] text-gray-400">Preferred Role</span>
                <span className="block truncate font-medium text-gray-800 capitalize">{summaryData.skillLevel.teamRole.replace("_", "/")}</span>
              </div>
            )}
            {summaryData.skillLevel?.codingComfort && (
              <div>
                <span className="block text-[11px] text-gray-400">Coding Comfort</span>
                <span className="block truncate font-medium text-gray-800 capitalize">{summaryData.skillLevel.codingComfort}</span>
              </div>
            )}

            {summaryData.skillLevel?.toolsUsed && summaryData.skillLevel.toolsUsed.length > 0 && (
              <div className="col-span-2 border-gray-100 border-t pt-2">
                <span className="mb-1.5 block text-[11px] text-gray-400">Tools &amp; Tech</span>
                <div className="flex flex-wrap gap-1">
                  {summaryData.skillLevel.toolsUsed.map((tool) => (
                    <span key={tool} className="rounded-md bg-gray-100 px-2 py-0.5 font-medium text-[10px] text-gray-700 capitalize">
                      {tool.replace("_", " ")}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* What to Expect Next */}
      <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
        <p className="font-mono font-semibold text-gray-400 text-xs uppercase tracking-wider">What to Expect Next</p>
        <div className="mt-3 space-y-3">
          <div className="flex items-start gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#4285F4]/10 text-[#1A73E8]">
              <Mail className="h-4 w-4" />
            </div>
            <div className="text-xs">
              <p className="font-semibold text-gray-800">Review &amp; Confirmation</p>
              <p className="mt-0.5 text-[11px] text-gray-500 leading-relaxed">Watch your inbox for your official pass and QR check-in code.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#34A853]/10 text-[#1E8E3E]">
              <Users className="h-4 w-4" />
            </div>
            <div className="text-xs">
              <p className="font-semibold text-gray-800">Team Matching</p>
              <p className="mt-0.5 text-[11px] text-gray-500 leading-relaxed">Join our Discord community to meet teammates and explore ideas.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#FBBC05]/15 text-[#B06000]">
              <Calendar className="h-4 w-4" />
            </div>
            <div className="text-xs">
              <p className="font-semibold text-gray-800">Event Kickoff (Nov 14-15)</p>
              <p className="mt-0.5 text-[11px] text-gray-500 leading-relaxed">
                24 hours of hacking, workshops, free food, and sponsor networking.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Google 4-Color Accent Strip */}
      <div className="mt-2 flex h-1 w-full overflow-hidden rounded-full opacity-80">
        <div className="w-1/4 bg-[#4285F4]" />
        <div className="w-1/4 bg-[#EA4335]" />
        <div className="w-1/4 bg-[#FBBC05]" />
        <div className="w-1/4 bg-[#34A853]" />
      </div>
    </motion.div>
  );
};
