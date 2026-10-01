"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@ucsc-devfest/shad-ui/components/select";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { type FC, useState } from "react";
import { type Registration, registrationSchema } from "../../../../backend/convex/application/schemas";
import {
  createSchemaValidator,
  defaultApplicationFormValues,
  formatValidationErrorMessage,
  getFieldError,
  useAppForm,
  useFieldContext,
} from "../desktop-view/application/application-form-hook";

const YEAR_OPTIONS = [
  { value: "first_year", label: "1st Year / Freshman" },
  { value: "second_year", label: "2nd Year / Sophomore" },
  { value: "third_year", label: "3rd Year / Junior" },
  { value: "fourth_year", label: "4th Year / Senior" },
  { value: "fifth_year_or_later", label: "5th+ Year" },
  { value: "graduate", label: "Graduate / Master's / PhD" },
  { value: "other", label: "Other" },
] as const;

const DIETARY_OPTIONS = [
  { value: "none", label: "No Restrictions" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "halal", label: "Halal" },
  { value: "kosher", label: "Kosher" },
  { value: "gluten-free", label: "Gluten-Free" },
  { value: "other", label: "Other" },
] as const;

const HACKATHON_COUNT_OPTIONS = [
  { value: "0", label: "0" },
  { value: "1-2", label: "1-2" },
  { value: "3+", label: "3+" },
] as const;

const CODING_COMFORT_OPTIONS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
] as const;

const TOOLS_OPTIONS = [
  { value: "gemini_api", label: "Gemini API" },
  { value: "firebase", label: "Firebase" },
  { value: "flutter", label: "Flutter" },
  { value: "google_cloud", label: "Google Cloud" },
  { value: "android", label: "Android" },
  { value: "none", label: "None of these" },
] as const;

const ROLE_OPTIONS = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "ui_ux", label: "UI/UX" },
  { value: "ml", label: "ML" },
] as const;

function MobileDietaryRestrictionsField() {
  const field = useFieldContext<string | undefined>();
  const error = getFieldError(field);

  const initialVal = field.state.value ?? "";
  const isOther =
    initialVal === "other" || initialVal.startsWith("Other:") || (!DIETARY_OPTIONS.some((opt) => opt.value === initialVal) && initialVal !== "");

  const otherText = initialVal.startsWith("Other: ")
    ? initialVal.slice("Other: ".length)
    : initialVal.startsWith("Other:")
      ? initialVal.slice("Other:".length)
      : initialVal === "other" || DIETARY_OPTIONS.some((opt) => opt.value === initialVal)
        ? ""
        : initialVal;

  const selectValue = isOther ? "other" : (field.state.value ?? "none");

  return (
    <div className="space-y-2">
      <div>
        <label htmlFor="mobile-select-dietary" className="mb-1 block font-medium text-gray-700 text-xs">
          Dietary Restrictions
        </label>
        <Select
          value={selectValue}
          onValueChange={(val) => {
            if (val === "other") {
              const finalVal = otherText.trim() ? `Other: ${otherText.trim()}` : "other";
              field.handleChange(finalVal);
            } else {
              field.handleChange(val);
            }
            field.handleBlur();
          }}
        >
          <SelectTrigger
            id="mobile-select-dietary"
            className={`flex h-[42px] w-full cursor-pointer items-center justify-between rounded-xl border px-3.5 py-2.5 text-left text-sm transition-all focus:outline-none focus:ring-2 ${
              error
                ? "border-red-400 bg-red-50/40 text-gray-900 focus:border-red-500 focus:ring-red-500/20"
                : "border-gray-200 bg-gray-50 text-gray-900 hover:bg-gray-100 focus:bg-white focus:ring-[#4285F4]/40"
            }`}
          >
            <SelectValue placeholder="Select dietary preference..." />
          </SelectTrigger>
          <SelectContent
            position="popper"
            className="z-50 max-h-60 w-[var(--radix-select-trigger-width)] rounded-xl border border-gray-200 bg-white p-1 shadow-lg"
          >
            {DIETARY_OPTIONS.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-xs transition-colors hover:bg-gray-100"
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
      </div>

      {isOther && (
        <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          <label htmlFor="mobile-input-dietary-other" className="mb-1 block font-medium text-gray-700 text-xs">
            Specific Dietary Restrictions
          </label>
          <input
            id="mobile-input-dietary-other"
            type="text"
            placeholder="e.g. Pescatarian, Low FODMAP, No Dairy"
            value={otherText}
            onChange={(e) => {
              const text = e.target.value;
              const finalVal = text.trim() ? `Other: ${text.trim()}` : "other";
              field.handleChange(finalVal);
            }}
            onBlur={field.handleBlur}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-gray-900 text-sm placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]/40"
          />
        </motion.div>
      )}
    </div>
  );
}

export type MobileFormData = Registration;

export type MobileApplicationFormViewProps = {
  userEmail?: string;
  googleSub?: string;
  onSubmitSuccess: (data: Registration) => void;
};

export const MobileApplicationFormView: FC<MobileApplicationFormViewProps> = ({
  userEmail = "student@ucsc.edu",
  googleSub = "dummy-google-sub",
  onSubmitSuccess,
}) => {
  const [activeSection, setActiveSection] = useState<number>(0);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

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
      try {
        const validPayload: Registration = registrationSchema.parse(value);
        onSubmitSuccess(validPayload);
      } catch (err) {
        if (err instanceof Error) {
          setSubmitError(err.message);
        } else {
          setSubmitError("Failed to validate registration.");
        }
      }
    },
    onSubmitInvalid: ({ value, formApi }) => {
      // biome-ignore lint/suspicious/noConsole: intentional error logging for debugging
      console.warn("Mobile form validation errors:", formApi.state.errorMap);

      setValidationError("We're missing some details. Please review the highlighted fields above.");

      // Automatically open the first section with an error
      const res = registrationSchema.safeParse(value);
      if (!res.success) {
        const [firstIssue] = res.error.issues;
        const [sectionKey] = firstIssue?.path ?? [];
        if (sectionKey === "identity") {
          setActiveSection(0);
        } else if (sectionKey === "logistics") {
          setActiveSection(1);
        } else if (sectionKey === "skillLevel") {
          setActiveSection(2);
        } else if (sectionKey === "motivation") {
          setActiveSection(3);
        } else if (sectionKey === "consent") {
          setActiveSection(4);
        }
      }
    },
  });

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="w-full space-y-4"
    >
      {/* Connected User Badge */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#34A853]/20 bg-[#E6F4EA] px-3 py-1 font-medium text-[#1E8E3E] text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[#34A853]" />
          <span className="max-w-[200px] truncate">{userEmail}</span>
        </div>

        <div className="flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 font-medium text-[11px] text-amber-700">
          <Sparkles className="h-3 w-3 text-[#FBBC05]" />
          <span>Priority Review</span>
        </div>
      </div>

      <div>
        <h2 className="font-extrabold font-google text-2xl text-gray-900 tracking-tight">Application Form</h2>
        <p className="mt-0.5 text-gray-500 text-xs">Fill out all sections below to complete your registration.</p>
      </div>

      {submitError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-red-700 text-xs">
          <span className="font-semibold">Notice:</span> {submitError}
        </div>
      )}

      {/* Accordion-Style Mobile Sections */}
      <div className="space-y-2.5">
        {/* ==========================================
             SECTION 1: IDENTITY
             ========================================== */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs">
          <button
            type="button"
            onClick={() => setActiveSection(activeSection === 0 ? -1 : 0)}
            className="flex w-full cursor-pointer items-center justify-between p-4 text-left transition-colors hover:bg-gray-50"
          >
            <div>
              <span className="font-bold text-gray-900 text-sm">1. Identity</span>
              <p className="text-[11px] text-gray-500">Name, major &amp; academic standing</p>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${activeSection === 0 ? "rotate-180 text-[#4285F4]" : ""}`}
            />
          </button>

          {activeSection === 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3.5 border-gray-100 border-t p-4 pt-3.5"
            >
              <form.AppField
                name="identity.name"
                validators={{
                  onBlur: createSchemaValidator(registrationSchema.shape.identity.shape.name),
                }}
              >
                {(field) => <field.TextField label="Full Name" placeholder="e.g. Alex Rivera" required />}
              </form.AppField>

              <form.AppField
                name="identity.major"
                validators={{
                  onBlur: createSchemaValidator(registrationSchema.shape.identity.shape.major),
                }}
              >
                {(field) => <field.TextField label="Major" placeholder="e.g. Computer Science, CE" required />}
              </form.AppField>

              <form.AppField
                name="identity.year"
                validators={{
                  onBlur: createSchemaValidator(registrationSchema.shape.identity.shape.year),
                }}
              >
                {(field) => (
                  <field.ShadcnSelectField label="Academic Year" options={YEAR_OPTIONS} placeholder="Select academic year..." required />
                )}
              </form.AppField>
            </motion.div>
          )}
        </div>

        {/* ==========================================
             SECTION 2: LOGISTICS
             ========================================== */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs">
          <button
            type="button"
            onClick={() => setActiveSection(activeSection === 1 ? -1 : 1)}
            className="flex w-full cursor-pointer items-center justify-between p-4 text-left transition-colors hover:bg-gray-50"
          >
            <div>
              <span className="font-bold text-gray-900 text-sm">2. Logistics</span>
              <p className="text-[11px] text-gray-500">Dietary preferences, age &amp; accessibility</p>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${activeSection === 1 ? "rotate-180 text-[#4285F4]" : ""}`}
            />
          </button>

          {activeSection === 1 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3.5 border-gray-100 border-t p-4 pt-3.5"
            >
              <form.AppField
                name="logistics.dietaryRestrictions"
                validators={{
                  onBlur: createSchemaValidator(registrationSchema.shape.logistics.shape.dietaryRestrictions),
                }}
              >
                {() => <MobileDietaryRestrictionsField />}
              </form.AppField>

              <form.AppField
                name="logistics.age"
                validators={{
                  onBlur: createSchemaValidator(registrationSchema.shape.logistics.shape.age),
                }}
              >
                {(field) => <field.NumberField label="Age" placeholder="e.g. 20" min={1} max={120} required />}
              </form.AppField>

              <form.AppField
                name="logistics.allergies"
                validators={{
                  onBlur: createSchemaValidator(registrationSchema.shape.logistics.shape.allergies),
                }}
              >
                {(field) => <field.TextField label="Allergies" placeholder="e.g. Peanuts, Shellfish, Dairy, or None" />}
              </form.AppField>

              <form.AppField
                name="logistics.accessibilityNeeds"
                validators={{
                  onBlur: createSchemaValidator(registrationSchema.shape.logistics.shape.accessibilityNeeds),
                }}
              >
                {(field) => (
                  <field.TextAreaField
                    label="Accessibility Needs"
                    placeholder="Anything we can do to make the event accessible for you?"
                    rows={2}
                  />
                )}
              </form.AppField>
            </motion.div>
          )}
        </div>

        {/* ==========================================
             SECTION 3: SKILL LEVEL
             ========================================== */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs">
          <button
            type="button"
            onClick={() => setActiveSection(activeSection === 2 ? -1 : 2)}
            className="flex w-full cursor-pointer items-center justify-between p-4 text-left transition-colors hover:bg-gray-50"
          >
            <div>
              <span className="font-bold text-gray-900 text-sm">3. Skill Level</span>
              <p className="text-[11px] text-gray-500">Hackathon experience &amp; team roles</p>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${activeSection === 2 ? "rotate-180 text-[#4285F4]" : ""}`}
            />
          </button>

          {activeSection === 2 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 border-gray-100 border-t p-4 pt-3.5"
            >
              <form.AppField
                name="skillLevel.hackathonsAttended"
                validators={{
                  onBlur: createSchemaValidator(registrationSchema.shape.skillLevel.shape.hackathonsAttended),
                }}
              >
                {(field) => <field.RadioGroupField label="How many hackathons have you attended?" options={HACKATHON_COUNT_OPTIONS} required />}
              </form.AppField>

              <form.AppField
                name="skillLevel.codingComfort"
                validators={{
                  onBlur: createSchemaValidator(registrationSchema.shape.skillLevel.shape.codingComfort),
                }}
              >
                {(field) => <field.RadioGroupField label="Rate your coding comfort" options={CODING_COMFORT_OPTIONS} required />}
              </form.AppField>

              <form.AppField
                name="skillLevel.toolsUsed"
                validators={{
                  onBlur: createSchemaValidator(registrationSchema.shape.skillLevel.shape.toolsUsed),
                }}
              >
                {(field) => <field.MultiCheckboxField label="Which tools have you used before?" options={TOOLS_OPTIONS} />}
              </form.AppField>

              <form.AppField
                name="skillLevel.teamRole"
                validators={{
                  onBlur: createSchemaValidator(registrationSchema.shape.skillLevel.shape.teamRole),
                }}
              >
                {(field) => <field.RadioGroupField label="Preferred Team Role" options={ROLE_OPTIONS} required />}
              </form.AppField>
            </motion.div>
          )}
        </div>

        {/* ==========================================
             SECTION 4: MOTIVATION
             ========================================== */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs">
          <button
            type="button"
            onClick={() => setActiveSection(activeSection === 3 ? -1 : 3)}
            className="flex w-full cursor-pointer items-center justify-between p-4 text-left transition-colors hover:bg-gray-50"
          >
            <div>
              <span className="font-bold text-gray-900 text-sm">4. Motivation</span>
              <p className="text-[11px] text-gray-500">Why DevFest &amp; projects you dream of</p>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${activeSection === 3 ? "rotate-180 text-[#4285F4]" : ""}`}
            />
          </button>

          {activeSection === 3 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3.5 border-gray-100 border-t p-4 pt-3.5"
            >
              <form.AppField
                name="motivation.whyDevfest"
                validators={{
                  onBlur: createSchemaValidator(registrationSchema.shape.motivation.shape.whyDevfest),
                }}
              >
                {(field) => (
                  <field.TextAreaField
                    label="Why do you want to attend DevFest?"
                    placeholder="What excites you about DevFest, teaming up, or building with Google tools?"
                    rows={3}
                    required
                  />
                )}
              </form.AppField>

              <form.AppField
                name="motivation.projectAndWhatWentWrong"
                validators={{
                  onBlur: createSchemaValidator(registrationSchema.shape.motivation.shape.projectAndWhatWentWrong),
                }}
              >
                {(field) => (
                  <field.TextAreaField
                    label="Tell us about something you built. What went wrong?"
                    placeholder="Share a project challenge or bug you faced and how you overcame it."
                    rows={3}
                    required
                  />
                )}
              </form.AppField>

              <form.AppField
                name="motivation.geminiWeekendIdea"
                validators={{
                  onBlur: createSchemaValidator(registrationSchema.shape.motivation.shape.geminiWeekendIdea),
                }}
              >
                {(field) => (
                  <field.TextAreaField
                    label="If you had a weekend and the Gemini API, what would you build?"
                    placeholder="Tell us about a creative tool, app, or prototype you'd love to make."
                    rows={3}
                    required
                  />
                )}
              </form.AppField>

              <form.AppField
                name="motivation.learningGoals"
                validators={{
                  onBlur: createSchemaValidator(registrationSchema.shape.motivation.shape.learningGoals),
                }}
              >
                {(field) => (
                  <field.TextAreaField
                    label="What do you want to learn?"
                    placeholder="A library, cloud tool, systems design, or teamwork skills."
                    rows={3}
                    required
                  />
                )}
              </form.AppField>
            </motion.div>
          )}
        </div>

        {/* ==========================================
             SECTION 5: AGREEMENTS & CONSENT
             ========================================== */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs">
          <button
            type="button"
            onClick={() => setActiveSection(activeSection === 4 ? -1 : 4)}
            className="flex w-full cursor-pointer items-center justify-between p-4 text-left transition-colors hover:bg-gray-50"
          >
            <div>
              <span className="font-bold text-gray-900 text-sm">5. Agreements &amp; Consents</span>
              <p className="text-[11px] text-gray-500">Code of conduct &amp; media permissions</p>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${activeSection === 4 ? "rotate-180 text-[#4285F4]" : ""}`}
            />
          </button>

          {activeSection === 4 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 border-gray-100 border-t p-4 pt-3.5"
            >
              <form.AppField
                name="consent.codeOfConduct"
                validators={{
                  onBlur: createSchemaValidator(registrationSchema.shape.consent.shape.codeOfConduct),
                }}
              >
                {(field) => (
                  <field.CheckboxField
                    label="Agree to Code of Conduct"
                    description="I agree to treat all attendees, mentors, and organizers with respect."
                    required
                  />
                )}
              </form.AppField>

              <form.AppField
                name="consent.photoVideo"
                validators={{
                  onBlur: createSchemaValidator(registrationSchema.shape.consent.shape.photoVideo),
                }}
              >
                {(field) => (
                  <field.CheckboxField
                    label="Photo & Video Consent"
                    description="Permission to capture and share event photography & footage."
                    required
                  />
                )}
              </form.AppField>

              <form.AppField
                name="consent.sponsorInfoSharing"
                validators={{
                  onBlur: createSchemaValidator(registrationSchema.shape.consent.shape.sponsorInfoSharing),
                }}
              >
                {(field) => (
                  <field.CheckboxField
                    label="Sponsor Info Sharing (Optional)"
                    description="Allow partnering sponsors and recruiters to review your application."
                  />
                )}
              </form.AppField>
            </motion.div>
          )}
        </div>
      </div>

      {/* Submit Button & Validation Error */}
      <div className="space-y-2 pt-1">
        <form.AppForm>
          <form.SubmitButton label="Submit Hackathon Application" />
        </form.AppForm>

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
    </form>
  );
};
