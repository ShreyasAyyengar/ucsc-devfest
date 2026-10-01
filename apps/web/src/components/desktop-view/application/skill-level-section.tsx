"use client";

import { registrationSchema } from "../../../../../backend/convex/application/schemas";
import { createSchemaValidator, defaultApplicationFormValues, withForm } from "./application-form-hook";

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

export const SkillLevelSection = withForm({
  defaultValues: defaultApplicationFormValues,
  render({ form }) {
    return (
      <div className="space-y-4">
        <div className="border-gray-100 border-b pb-1">
          <h3 className="font-semibold text-gray-900 text-sm">Skill Level</h3>
        </div>

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
          {(field) => <field.RadioGroupField label="Rate your comfort with coding" options={CODING_COMFORT_OPTIONS} required />}
        </form.AppField>

        <form.AppField
          name="skillLevel.toolsUsed"
          validators={{
            onBlur: createSchemaValidator(registrationSchema.shape.skillLevel.shape.toolsUsed),
          }}
        >
          {(field) => <field.MultiCheckboxField label="Which have you used before?" options={TOOLS_OPTIONS} />}
        </form.AppField>

        <form.AppField
          name="skillLevel.teamRole"
          validators={{
            onBlur: createSchemaValidator(registrationSchema.shape.skillLevel.shape.teamRole),
          }}
        >
          {(field) => <field.RadioGroupField label="What role do you usually play on a team?" options={ROLE_OPTIONS} required />}
        </form.AppField>
      </div>
    );
  },
});
