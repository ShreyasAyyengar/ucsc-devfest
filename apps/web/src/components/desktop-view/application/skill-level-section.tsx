"use client";

import { defaultApplicationFormValues, withForm } from "./application-form-hook";

const HACKATHON_COUNT_OPTIONS = [
  { value: "0", label: "0" },
  { value: "1-2", label: "1-2" },
  { value: "3+", label: "3+" },
];

const CODING_COMFORT_OPTIONS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const TOOLS_OPTIONS = [
  { value: "gemini-api", label: "Gemini API" },
  { value: "firebase", label: "Firebase" },
  { value: "flutter", label: "Flutter" },
  { value: "google-cloud", label: "Google Cloud" },
  { value: "android", label: "Android" },
  { value: "none", label: "None of these" },
];

const ROLE_OPTIONS = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "ui-ux", label: "UI/UX" },
  { value: "ml", label: "ML" },
];

export const SkillLevelSection = withForm({
  defaultValues: defaultApplicationFormValues,
  render({ form }) {
    return (
      <div className="space-y-4">
        <div className="border-gray-100 border-b pb-1">
          <h3 className="font-semibold text-gray-900 text-sm">Skill Level</h3>
        </div>

        <form.AppField name="hackathonsAttended">
          {(field) => <field.RadioGroupField label="How many hackathons have you attended?" options={HACKATHON_COUNT_OPTIONS} required />}
        </form.AppField>

        <form.AppField name="codingComfort">
          {(field) => <field.RadioGroupField label="Rate your comfort with coding" options={CODING_COMFORT_OPTIONS} required />}
        </form.AppField>

        <form.AppField name="toolsUsed">
          {(field) => <field.MultiCheckboxField label="Which have you used before?" options={TOOLS_OPTIONS} />}
        </form.AppField>

        <form.AppField name="teamRole">
          {(field) => <field.RadioGroupField label="What role do you usually play on a team?" options={ROLE_OPTIONS} required />}
        </form.AppField>
      </div>
    );
  },
});
