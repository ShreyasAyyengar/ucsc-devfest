"use client";

import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { ConvexError } from "convex/values";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { authClientWeb } from "@/lib/auth-client-web.ts";
import { api } from "../../../../../backend/convex/_generated/api";
import { type Registration, registrationSchema } from "../../../../../backend/convex/application/schemas";
import { isPriority } from "../../../../../backend/convex/priority.ts";
import { AgreementsSection } from "./agreements-section";
import { defaultApplicationFormValues, formatValidationErrorMessage, useAppForm } from "./application-form-hook";
import { ApplicationSubmittedView } from "./application-submitted-view";
import { IdentitySection } from "./identity-section";
import { LogisticsSection } from "./logistics-section";
import { MotivationSection } from "./motivation-section";
import { SkillLevelSection } from "./skill-level-section";
import { SubmitSection } from "./submit-section";

type ApplicationFormViewProps = {
  userEmail?: string;
  googleSub?: string;
};

export function ApplicationFormView({ userEmail = "student@ucsc.edu", googleSub = "dummy-google-sub" }: ApplicationFormViewProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [hasInitializedFromQuery, setHasInitializedFromQuery] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const { isAuthenticated: isConvexAuthenticated, isLoading: isConvexAuthLoading } = useConvexAuth();

  const createRegistration = useMutation(api.application.service.createRegistration);
  const deleteRegistration = useMutation(api.application.service.deleteRegistration);
  const existingRegistration = useQuery(api.application.service.getRegistration, isConvexAuthenticated ? {} : "skip");
  const isLoading = isConvexAuthLoading || (isConvexAuthenticated && existingRegistration === undefined);
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
          return firstIssue
            ? formatValidationErrorMessage(firstIssue.message, (firstIssue as { values?: unknown[] }).values)
            : "Please complete all required fields correctly.";
        }
      },
    },
    onSubmit: async ({ value }) => {
      setSubmitError(null);
      setValidationError(null);
      setDeleteError(null);
      const validPayload: Registration = registrationSchema.parse(value);
      // Remove googleSub as the backend derives it securely from the authenticated Google account session
      const { googleSub: _, ...registrationInput } = validPayload;

      try {
        await createRegistration(registrationInput);
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
      setValidationError("We're missing some details. Please review the highlighted fields above.");
    },
  });

  const handleDelete = async () => {
    setDeleteError(null);
    setIsDeleting(true);
    try {
      await deleteRegistration({});
      setHasInitializedFromQuery(false);
      form.reset({
        ...defaultApplicationFormValues,
        googleSub,
      });
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

  useEffect(() => {
    if (existingRegistration && !hasInitializedFromQuery) {
      setHasInitializedFromQuery(true);
      form.reset({
        ...defaultApplicationFormValues,
        identity: existingRegistration.identity,
        logistics: existingRegistration.logistics,
        skillLevel: existingRegistration.skillLevel,
        motivation: existingRegistration.motivation,
        consent: existingRegistration.consent,
        googleSub: existingRegistration.googleSub ?? googleSub,
      });
    } else if (existingRegistration === null && hasInitializedFromQuery) {
      setHasInitializedFromQuery(false);
      form.reset({
        ...defaultApplicationFormValues,
        googleSub,
      });
    }
  }, [existingRegistration, hasInitializedFromQuery, form, googleSub]);

  const handleSignOut = async () => {
    await authClientWeb.signOut();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="flex min-h-0 w-full flex-1 flex-col"
    >
      {/* Authed Status Pill */}

      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <h2 className="font-extrabold font-google text-2xl text-gray-900 tracking-tight sm:text-3xl">Hackathon Application</h2>
          {isPriority === true && (
            <div className="inline-flex items-center gap-1.5 font-medium text-gray-800 text-xs sm:rounded-md sm:border sm:border-black/10 sm:bg-yellow-100 sm:px-2.5 sm:py-1 sm:text-sm">
              {/* TODO: Create boolean to toggle priority review */}
              <Sparkles className="size-4 text-[#FBBC05] sm:size-5" />
              <span>Priority Application</span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="shrink-0 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 font-medium text-gray-600 text-xs transition-colors hover:bg-gray-100 hover:text-gray-900 active:scale-95 lg:hidden"
        >
          Sign out
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-12 flex flex-col items-center justify-center space-y-3 py-16 text-center"
          >
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-[#4285F4] border-t-transparent" />
            <p className="font-google text-gray-500 text-sm">Loading application status...</p>
          </motion.div>
        ) : existingRegistration ? (
          <ApplicationSubmittedView
            userEmail={userEmail}
            isDeleting={isDeleting}
            deleteError={deleteError}
            onWithdraw={handleDelete}
            onSignOut={handleSignOut}
            registration={existingRegistration}
          />
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="mt-4 min-h-0 flex-1 space-y-2.5 lg:-mx-2 lg:mt-6 lg:space-y-6 lg:overflow-y-auto lg:px-3 lg:py-2"
          >
            <span className="block text-gray-500 text-xs leading-relaxed">
              * Disclaimer: We do not accommodate overnight stays. The venue is open Saturday, Nov 14th from 9:00 AM – 7:00 PM and Sunday, Nov
              15th from 9:00 AM – 4:00 PM.
            </span>
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

            <div className="space-y-2">
              <SubmitSection form={form} />
              <AnimatePresence>
                {validationError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-center font-medium text-red-500 text-xs"
                  >
                    {validationError}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
