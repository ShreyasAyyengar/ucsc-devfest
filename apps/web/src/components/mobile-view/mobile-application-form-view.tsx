"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@ucsc-devfest/shad-ui/components/select";
import { motion } from "framer-motion";
import { Check, ChevronDown, Send, Sparkles } from "lucide-react";
import { type FC, type FormEvent, useState } from "react";

const YEAR_OPTIONS = [
  { value: "first_year", label: "1st Year / Freshman" },
  { value: "second_year", label: "2nd Year / Sophomore" },
  { value: "third_year", label: "3rd Year / Junior" },
  { value: "fourth_year", label: "4th Year / Senior" },
  { value: "fifth_year_or_later", label: "5th+ Year" },
  { value: "graduate", label: "Graduate / Master's / PhD" },
  { value: "other", label: "Other" },
];

const DIETARY_OPTIONS = [
  { value: "none", label: "No Restrictions" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "halal", label: "Halal" },
  { value: "kosher", label: "Kosher" },
  { value: "gluten-free", label: "Gluten-Free" },
  { value: "other", label: "Other" },
];

const HACKATHON_OPTIONS = ["0", "1-2", "3+"];

const COMFORT_OPTIONS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const TOOL_OPTIONS = [
  { value: "gemini_api", label: "Gemini API" },
  { value: "firebase", label: "Firebase" },
  { value: "flutter", label: "Flutter" },
  { value: "google_cloud", label: "Google Cloud" },
  { value: "android", label: "Android" },
  { value: "none", label: "None of these" },
];

const ROLE_OPTIONS = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "ui_ux", label: "UI / UX" },
  { value: "ml", label: "Machine Learning" },
];

export type MobileFormData = {
  identity: {
    name: string;
    major: string;
    year: string;
  };
  logistics: {
    dietaryRestrictions: string;
    dietaryOther: string;
    age: number;
    allergies: string;
    accessibilityNeeds: string;
  };
  skillLevel: {
    hackathonsAttended: string;
    codingComfort: string;
    toolsUsed: string[];
    teamRole: string;
  };
  motivation: {
    whyDevfest: string;
    projectAndWhatWentWrong: string;
    geminiWeekendIdea: string;
    learningGoals: string;
  };
  consent: {
    codeOfConduct: boolean;
    photoVideo: boolean;
    sponsorInfoSharing: boolean;
  };
};

type MobileApplicationFormViewProps = {
  userEmail?: string;
  onSubmitSuccess: (data: MobileFormData) => void;
};

export const MobileApplicationFormView: FC<MobileApplicationFormViewProps> = ({ userEmail = "student@ucsc.edu", onSubmitSuccess }) => {
  const [formData, setFormData] = useState<MobileFormData>({
    identity: {
      name: "",
      major: "",
      year: "first_year",
    },
    logistics: {
      dietaryRestrictions: "none",
      dietaryOther: "",
      age: 18,
      allergies: "",
      accessibilityNeeds: "",
    },
    skillLevel: {
      hackathonsAttended: "",
      codingComfort: "",
      toolsUsed: [],
      teamRole: "",
    },
    motivation: {
      whyDevfest: "",
      projectAndWhatWentWrong: "",
      geminiWeekendIdea: "",
      learningGoals: "",
    },
    consent: {
      codeOfConduct: false,
      photoVideo: false,
      sponsorInfoSharing: false,
    },
  });

  const [activeSection, setActiveSection] = useState<number>(0);
  const [validationError, setValidationError] = useState<string | null>(null);


  const handleToolToggle = (toolValue: string) => {
    setFormData((prev) => {
      const current = prev.skillLevel.toolsUsed;
      if (toolValue === "none") {
        return {
          ...prev,
          skillLevel: {
            ...prev.skillLevel,
            toolsUsed: current.includes("none") ? [] : ["none"],
          },
        };
      }
      const withoutNone = current.filter((t) => t !== "none");
      const next = withoutNone.includes(toolValue) ? withoutNone.filter((t) => t !== toolValue) : [...withoutNone, toolValue];

      return {
        ...prev,
        skillLevel: {
          ...prev.skillLevel,
          toolsUsed: next,
        },
      };
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Basic UI validation
    if (!formData.identity.name.trim()) {
      setValidationError("Please enter your full name.");
      setActiveSection(0);
      return;
    }
    if (!formData.identity.major.trim()) {
      setValidationError("Please enter your major.");
      setActiveSection(0);
      return;
    }
    if (!formData.skillLevel.hackathonsAttended) {
      setValidationError("Please select how many hackathons you've attended.");
      setActiveSection(2);
      return;
    }
    if (!formData.skillLevel.codingComfort) {
      setValidationError("Please select your coding comfort level.");
      setActiveSection(2);
      return;
    }
    if (!formData.skillLevel.teamRole) {
      setValidationError("Please choose your preferred team role.");
      setActiveSection(2);
      return;
    }
    if (!formData.motivation.whyDevfest.trim()) {
      setValidationError("Please tell us why you want to attend DevFest.");
      setActiveSection(3);
      return;
    }
    if (!formData.consent.codeOfConduct || !formData.consent.photoVideo) {
      setValidationError("Please agree to the required Code of Conduct and Photo/Video consent.");
      setActiveSection(4);
      return;
    }

    // Call UI submit success callback
    onSubmitSuccess(formData);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full space-y-4">
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

      {validationError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-red-700 text-xs">
          <span className="font-semibold">Notice:</span> {validationError}
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
              <div>
                <label htmlFor="mobile-input-name" className="mb-1 block font-medium text-gray-700 text-xs">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="mobile-input-name"
                  type="text"
                  placeholder="e.g. Alex Rivera"
                  value={formData.identity.name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      identity: { ...prev.identity, name: e.target.value },
                    }))
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-gray-900 text-sm placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]/40"
                />
              </div>

              <div>
                <label htmlFor="mobile-input-major" className="mb-1 block font-medium text-gray-700 text-xs">
                  Major <span className="text-red-500">*</span>
                </label>
                <input
                  id="mobile-input-major"
                  type="text"
                  placeholder="e.g. Computer Science, CE, Biomolecular"
                  value={formData.identity.major}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      identity: { ...prev.identity, major: e.target.value },
                    }))
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-gray-900 text-sm placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]/40"
                />
              </div>

              <div>
                <label htmlFor="mobile-select-year" className="mb-1 block font-medium text-gray-700 text-xs">
                  Academic Year <span className="text-red-500">*</span>
                </label>
                <Select
                  value={formData.identity.year}
                  onValueChange={(val) =>
                    setFormData((prev) => ({
                      ...prev,
                      identity: { ...prev.identity, year: val },
                    }))
                  }
                >
                  <SelectTrigger
                    id="mobile-select-year"
                    className="flex h-[42px] w-full cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-left text-gray-900 text-sm transition-all hover:bg-gray-100 focus:bg-white focus:ring-2 focus:ring-[#4285F4]/40"
                  >
                    <SelectValue placeholder="Select academic year..." />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    className="z-50 max-h-60 w-[var(--radix-select-trigger-width)] rounded-xl border border-gray-200 bg-white p-1 shadow-lg"
                  >
                    {YEAR_OPTIONS.map((opt) => (
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
              </div>
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
              <div>
                <label htmlFor="mobile-select-dietary" className="mb-1 block font-medium text-gray-700 text-xs">
                  Dietary Restrictions
                </label>
                <Select
                  value={formData.logistics.dietaryRestrictions}
                  onValueChange={(val) =>
                    setFormData((prev) => ({
                      ...prev,
                      logistics: { ...prev.logistics, dietaryRestrictions: val },
                    }))
                  }
                >
                  <SelectTrigger
                    id="mobile-select-dietary"
                    className="flex h-[42px] w-full cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-left text-gray-900 text-sm transition-all hover:bg-gray-100 focus:bg-white focus:ring-2 focus:ring-[#4285F4]/40"
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
              </div>

              {formData.logistics.dietaryRestrictions === "other" && (
                <div>
                  <label htmlFor="mobile-input-dietary-other" className="mb-1 block font-medium text-gray-700 text-xs">
                    Please specify dietary restriction
                  </label>
                  <input
                    id="mobile-input-dietary-other"
                    type="text"
                    placeholder="e.g. Pescatarian, Low FODMAP"
                    value={formData.logistics.dietaryOther}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        logistics: { ...prev.logistics, dietaryOther: e.target.value },
                      }))
                    }
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]/40"
                  />
                </div>
              )}

              <div>
                <label htmlFor="mobile-input-age" className="mb-1 block font-medium text-gray-700 text-xs">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  id="mobile-input-age"
                  type="number"
                  min={1}
                  max={120}
                  value={formData.logistics.age || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      logistics: {
                        ...prev.logistics,
                        age: Number.parseInt(e.target.value, 10) || 0,
                      },
                    }))
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]/40"
                />
              </div>

              <div>
                <label htmlFor="mobile-input-allergies" className="mb-1 block font-medium text-gray-700 text-xs">
                  Allergies
                </label>
                <input
                  id="mobile-input-allergies"
                  type="text"
                  placeholder="e.g. Peanuts, Shellfish, Dairy, or None"
                  value={formData.logistics.allergies}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      logistics: { ...prev.logistics, allergies: e.target.value },
                    }))
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]/40"
                />
              </div>

              <div>
                <label htmlFor="mobile-input-accessibility" className="mb-1 block font-medium text-gray-700 text-xs">
                  Accessibility Needs
                </label>
                <textarea
                  id="mobile-input-accessibility"
                  rows={2}
                  placeholder="Anything we can do to make the event accessible for you?"
                  value={formData.logistics.accessibilityNeeds}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      logistics: { ...prev.logistics, accessibilityNeeds: e.target.value },
                    }))
                  }
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]/40"
                />
              </div>
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
              <div>
                <span className="mb-1.5 block font-medium text-gray-700 text-xs">
                  How many hackathons have you attended? <span className="text-red-500">*</span>
                </span>
                <div className="flex gap-2">
                  {HACKATHON_OPTIONS.map((val) => {
                    const isSelected = formData.skillLevel.hackathonsAttended === val;
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            skillLevel: { ...prev.skillLevel, hackathonsAttended: val },
                          }))
                        }
                        className={`flex-1 rounded-xl border py-2.5 font-medium text-xs transition-all ${
                          isSelected
                            ? "border-[#4285F4] bg-[#4285F4]/10 font-bold text-[#1A73E8] ring-1 ring-[#4285F4]"
                            : "border-gray-200 bg-gray-50 text-gray-700 active:bg-gray-100"
                        }`}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <span className="mb-1.5 block font-medium text-gray-700 text-xs">
                  Rate your coding comfort <span className="text-red-500">*</span>
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {COMFORT_OPTIONS.map((opt) => {
                    const isSelected = formData.skillLevel.codingComfort === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            skillLevel: { ...prev.skillLevel, codingComfort: opt.value },
                          }))
                        }
                        className={`rounded-xl border py-2.5 font-medium text-xs transition-all ${
                          isSelected
                            ? "border-[#4285F4] bg-[#4285F4]/10 font-bold text-[#1A73E8] ring-1 ring-[#4285F4]"
                            : "border-gray-200 bg-gray-50 text-gray-700 active:bg-gray-100"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <span className="mb-1.5 block font-medium text-gray-700 text-xs">Which tools have you used before?</span>
                <div className="grid grid-cols-2 gap-2">
                  {TOOL_OPTIONS.map((opt) => {
                    const isChecked = formData.skillLevel.toolsUsed.includes(opt.value);
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleToolToggle(opt.value)}
                        className={`flex items-center gap-2 rounded-xl border p-2.5 text-left text-xs transition-all ${
                          isChecked
                            ? "border-[#4285F4] bg-[#4285F4]/10 text-[#1A73E8] ring-1 ring-[#4285F4]"
                            : "border-gray-200 bg-gray-50 text-gray-700 active:bg-gray-100"
                        }`}
                      >
                        <div
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                            isChecked ? "border-[#4285F4] bg-[#4285F4] text-white" : "border-gray-300 bg-white"
                          }`}
                        >
                          {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                        </div>
                        <span className="truncate font-medium">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <span className="mb-1.5 block font-medium text-gray-700 text-xs">
                  Preferred Team Role <span className="text-red-500">*</span>
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {ROLE_OPTIONS.map((opt) => {
                    const isSelected = formData.skillLevel.teamRole === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            skillLevel: { ...prev.skillLevel, teamRole: opt.value },
                          }))
                        }
                        className={`rounded-xl border p-2.5 text-center font-medium text-xs transition-all ${
                          isSelected
                            ? "border-[#4285F4] bg-[#4285F4]/10 font-bold text-[#1A73E8] ring-1 ring-[#4285F4]"
                            : "border-gray-200 bg-gray-50 text-gray-700 active:bg-gray-100"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
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
              <div>
                <label htmlFor="mobile-input-why-devfest" className="mb-1 block font-medium text-gray-700 text-xs">
                  Why do you want to attend DevFest? <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="mobile-input-why-devfest"
                  rows={3}
                  placeholder="What excites you about DevFest, teaming up, or building with Google tools?"
                  value={formData.motivation.whyDevfest}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      motivation: { ...prev.motivation, whyDevfest: e.target.value },
                    }))
                  }
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]/40"
                />
              </div>

              <div>
                <label htmlFor="mobile-input-what-went-wrong" className="mb-1 block font-medium text-gray-700 text-xs">
                  Tell us about something you built. What went wrong? <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="mobile-input-what-went-wrong"
                  rows={3}
                  placeholder="Share a project challenge or bug you faced and how you overcame it."
                  value={formData.motivation.projectAndWhatWentWrong}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      motivation: { ...prev.motivation, projectAndWhatWentWrong: e.target.value },
                    }))
                  }
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]/40"
                />
              </div>

              <div>
                <label htmlFor="mobile-input-gemini-idea" className="mb-1 block font-medium text-gray-700 text-xs">
                  If you had a weekend and the Gemini API, what would you build? <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="mobile-input-gemini-idea"
                  rows={3}
                  placeholder="Tell us about a creative tool, app, or prototype you'd love to make."
                  value={formData.motivation.geminiWeekendIdea}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      motivation: { ...prev.motivation, geminiWeekendIdea: e.target.value },
                    }))
                  }
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]/40"
                />
              </div>

              <div>
                <label htmlFor="mobile-input-learning-goals" className="mb-1 block font-medium text-gray-700 text-xs">
                  What do you want to learn? <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="mobile-input-learning-goals"
                  rows={3}
                  placeholder="A library, cloud tool, systems design, or teamwork skills."
                  value={formData.motivation.learningGoals}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      motivation: { ...prev.motivation, learningGoals: e.target.value },
                    }))
                  }
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]/40"
                />
              </div>
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
              <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-gray-200 bg-gray-50 p-3 hover:bg-gray-100">
                <input
                  type="checkbox"
                  checked={formData.consent.codeOfConduct}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      consent: { ...prev.consent, codeOfConduct: e.target.checked },
                    }))
                  }
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#4285F4] focus:ring-[#4285F4]"
                />
                <div className="text-xs">
                  <span className="font-semibold text-gray-800">
                    Agree to Code of Conduct <span className="text-red-500">*</span>
                  </span>
                  <p className="mt-0.5 text-[11px] text-gray-500">I agree to treat all attendees, mentors, and organizers with respect.</p>
                </div>
              </label>

              <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-gray-200 bg-gray-50 p-3 hover:bg-gray-100">
                <input
                  type="checkbox"
                  checked={formData.consent.photoVideo}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      consent: { ...prev.consent, photoVideo: e.target.checked },
                    }))
                  }
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#4285F4] focus:ring-[#4285F4]"
                />
                <div className="text-xs">
                  <span className="font-semibold text-gray-800">
                    Photo &amp; Video Consent <span className="text-red-500">*</span>
                  </span>
                  <p className="mt-0.5 text-[11px] text-gray-500">Permission to capture and share event photography &amp; footage.</p>
                </div>
              </label>

              <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-gray-200 border-dashed bg-gray-50/50 p-3 hover:bg-gray-100/60">
                <input
                  type="checkbox"
                  checked={formData.consent.sponsorInfoSharing}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      consent: { ...prev.consent, sponsorInfoSharing: e.target.checked },
                    }))
                  }
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#4285F4] focus:ring-[#4285F4]"
                />
                <div className="text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-gray-800">Sponsor Info Sharing</span>
                    <span className="rounded bg-gray-200/70 px-1.5 py-0.2 font-medium text-[9px] text-gray-600">Optional</span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-gray-500">Allow sponsors to review your info for internship or job opportunities.</p>
                </div>
              </label>
            </motion.div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#4285F4] px-4 py-3.5 font-semibold text-sm text-white shadow-md transition-colors hover:bg-[#1a73e8] active:bg-[#1967d2]"
      >
        <span>Submit Hackathon Application</span>
        <Send className="h-4 w-4" />
      </motion.button>
    </form>
  );
};
