"use client";

import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import { type FC, useState } from "react";
import { api } from "../../../../../backend/convex/_generated/api";
import { type Registration, registrationSchema } from "../../../../../backend/convex/application/schemas";
import { AgreementsSection } from "./agreements-section";
import { defaultApplicationFormValues, useAppForm } from "./application-form-hook";
import { IdentitySection } from "./identity-section";
import { LogisticsSection } from "./logistics-section";
import { MotivationSection } from "./motivation-section";
import { SkillLevelSection } from "./skill-level-section";
import { SubmitSection } from "./submit-section";

type ApplicationFormViewProps = {
  onSignOut: () => void;
  userEmail?: string;
  googleSub?: string;
};

export const ApplicationFormView: FC<ApplicationFormViewProps> = ({ userEmail = "student@ucsc.edu", googleSub = "dummy-google-sub" }) => {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const createRegistration = useMutation(api.application.service.createRegistration);

  const form = useAppForm({
    defaultValues: {
      ...defaultApplicationFormValues,
      googleSub,
    },
    validators: {
      onSubmit: ({ value }) => {
        const res = registrationSchema.safeParse(value);
        if (!res.success) {
          const [firstIssue] = res.error.issues;
          return firstIssue ? firstIssue.message : "Please complete all required fields correctly.";
        }
      },
    },
    onSubmit: async ({ value }) => {
      setSubmitError(null);
      const validPayload: Registration = registrationSchema.parse(value);
      // Remove googleSub as the backend derives it securely from the authenticated Google account session
      const { googleSub: _, ...registrationInput } = validPayload;

      try {
        await createRegistration(registrationInput);
        setSubmitted(true);
      } catch (err) {
        if (err instanceof ConvexError) {
          const data = err.data as { code?: string; message?: string };
          setSubmitError(data.message || err.message);
        } else if (err instanceof Error) {
          setSubmitError(err.message);
        } else {
          setSubmitError("Failed to submit registration. Please try again.");
        }
      }
    },
    onSubmitInvalid: ({ value, formApi }) => {
      // biome-ignore lint/suspicious/noConsole: intentionally logging form errors for submission verification
      console.warn("=== DEV FEST APPLICATION FORM SUBMIT BLOCKED (VALIDATION ERRORS) ===");
      // biome-ignore lint/suspicious/noConsole: intentionally logging form errors for submission verification
      console.warn("Form values at submission attempt:", value);
      // biome-ignore lint/suspicious/noConsole: intentionally logging form errors for submission verification
      console.warn("Field errors:", formApi.state.errorMap);
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="w-full"
    >
      {/* Authed Status Pill */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#34A853]/20 bg-[#E6F4EA] px-3 py-1 font-medium text-[#1E8E3E] text-xs">
        <span className="h-2 w-2 rounded-full bg-[#34A853]" />
        <span>Connected as {userEmail}</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-extrabold font-google text-2xl text-gray-900 tracking-tight sm:text-3xl">Hackathon Application</h2>
          <p className="mt-1 text-gray-500 text-sm">Complete your registration for Google DevFest 2026.</p>
        </div>
        <div className="hidden items-center gap-1.5 rounded-md bg-gray-100 px-2.5 py-1 font-mono text-gray-600 text-xs sm:flex">
          <Sparkles className="h-3.5 w-3.5 text-[#FBBC05]" />
          <span>Priority Review</span>
        </div>
      </div>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 space-y-3 rounded-2xl border border-[#4285F4]/30 bg-[#E8F0FE] p-6 text-center"
        >
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
            onClick={() => {
              setSubmitted(false);
              setSubmitError(null);
            }}
            className="mx-auto block cursor-pointer pt-2 font-semibold text-[#1A73E8] text-xs hover:underline"
          >
            Edit your application
          </button>
        </motion.div>
      ) : (
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="-mx-2 mt-6 max-h-[58vh] space-y-6 overflow-y-auto px-3 py-2"
        >
          <IdentitySection form={form} />
          <LogisticsSection form={form} />
          <SkillLevelSection form={form} />
          <MotivationSection form={form} />
          <AgreementsSection form={form} />

          {submitError && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-red-700 text-xs">
              <span className="font-semibold">Submission failed:</span> {submitError}
            </div>
          )}

          <SubmitSection form={form} />
        </form>
      )}
    </motion.div>
  );
};
