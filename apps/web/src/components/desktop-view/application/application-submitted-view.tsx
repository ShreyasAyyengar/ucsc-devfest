"use client";

import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Mail, Users } from "lucide-react";
import type { FC } from "react";
import { formatOptionsList } from "./application-form-hook";

type ApplicationSubmittedViewProps = {
  userEmail: string;
  isDeleting: boolean;
  deleteError: string | null;
  onWithdraw: () => void;
  summaryData: {
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

export const ApplicationSubmittedView: FC<ApplicationSubmittedViewProps> = ({ userEmail, isDeleting, deleteError, onWithdraw, summaryData }) => {
  const hasSummary = Boolean(summaryData?.identity?.name && summaryData?.identity?.major);

  return (
    <motion.div
      key="submitted"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="-mx-2 mt-6 max-h-[58vh] space-y-4 overflow-y-auto px-3 py-2"
    >
      {/* Confirmation Banner */}
      <div className="space-y-3 rounded-2xl border border-[#4285F4]/30 bg-[#E8F0FE] p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#4285F4] text-white shadow-md">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="font-bold font-google text-gray-900 text-lg">Application Submitted!</h3>
        <p className="mx-auto max-w-sm text-gray-600 text-xs">
          We’ve received your registration for Google DevFest 2026. Keep an eye on{" "}
          <span className="font-semibold text-gray-800">{userEmail}</span> for team matching and workshop access.
        </p>
        <button
          type="button"
          disabled={isDeleting}
          onClick={onWithdraw}
          className="mx-auto flex cursor-pointer items-center justify-center gap-1.5 pt-2 font-semibold text-red-600 text-xs hover:text-red-700 hover:underline disabled:cursor-not-allowed disabled:opacity-60"
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

        {deleteError && (
          <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-2.5 text-left text-red-700 text-xs">
            <span className="font-semibold">Withdraw failed:</span> {deleteError}
          </div>
        )}
      </div>

      {/* Application Overview Card */}
      {hasSummary && summaryData.identity && (
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between border-gray-100 border-b pb-2.5">
            <span className="font-semibold text-gray-900 text-xs">Submission Overview</span>
            <span className="rounded-full bg-[#E6F4EA] px-2 py-0.5 font-medium text-[#1E8E3E] text-[10px]">Active Application</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="block text-[11px] text-gray-400">Applicant</span>
              <span className="block truncate font-medium text-gray-800">{summaryData.identity.name}</span>
            </div>
            <div>
              <span className="block text-[11px] text-gray-400">Major</span>
              <span className="block truncate font-medium text-gray-800">{summaryData.identity.major}</span>
            </div>
            {summaryData.skillLevel?.teamRole ? (
              <div>
                <span className="block text-[11px] text-gray-400">Preferred Role</span>
                <span className="block truncate font-medium text-gray-800">{formatOptionsList([summaryData.skillLevel.teamRole])}</span>
              </div>
            ) : null}
            {summaryData.skillLevel?.codingComfort ? (
              <div>
                <span className="block text-[11px] text-gray-400">Coding Comfort</span>
                <span className="block truncate font-medium text-gray-800">{formatOptionsList([summaryData.skillLevel.codingComfort])}</span>
              </div>
            ) : null}
            {summaryData.skillLevel?.toolsUsed && summaryData.skillLevel.toolsUsed.length > 0 ? (
              <div className="col-span-2 border-gray-100 border-t pt-2">
                <span className="mb-1.5 block text-[11px] text-gray-400">Tools & Technologies</span>
                <div className="flex flex-wrap gap-1.5">
                  {summaryData.skillLevel.toolsUsed.map((tool) => (
                    <span key={tool} className="rounded-md bg-gray-100 px-2 py-0.5 font-medium text-[10px] text-gray-700">
                      {formatOptionsList([tool])}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* What to Expect Next */}
      <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4 sm:p-5">
        <p className="font-mono font-semibold text-gray-400 text-xs uppercase tracking-wider">What to Expect Next</p>
        <div className="mt-3.5 space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#4285F4]/10 text-[#1A73E8]">
              <Mail className="h-4 w-4" />
            </div>
            <div className="text-xs">
              <p className="font-semibold text-gray-800">Review & Confirmation</p>
              <p className="mt-0.5 text-[11px] text-gray-500 leading-relaxed">
                Applications are reviewed continuously. Watch your inbox for your official confirmation pass and check-in QR code.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#34A853]/10 text-[#1E8E3E]">
              <Users className="h-4 w-4" />
            </div>
            <div className="text-xs">
              <p className="font-semibold text-gray-800">Team Matching</p>
              <p className="mt-0.5 text-[11px] text-gray-500 leading-relaxed">
                After you're accepted, you'll get access to team matching with fellow hackers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#FBBC05]/15 text-[#B06000]">
              <Calendar className="h-4 w-4" />
            </div>
            <div className="text-xs">
              <p className="font-semibold text-gray-800">Event Kickoff (Nov 14-15)</p>
              <p className="mt-0.5 text-[11px] text-gray-500 leading-relaxed">
                {/* TODO: make sure these details are accurate */}
                24 hours of hacking, hands-on Google tech workshops, free food, mentor office hours, and sponsor networking.
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
