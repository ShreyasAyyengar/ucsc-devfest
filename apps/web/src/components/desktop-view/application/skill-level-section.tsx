"use client";

import { registrationSchema } from "../../../../../backend/convex/application/schemas";
import { createSchemaValidator, defaultApplicationFormValues, withForm } from "./application-form-hook";

const skillLevelShape = registrationSchema.shape.skillLevel.shape;

type CodingComfort = (typeof skillLevelShape.codingComfort.options)[number];
type Tool = (typeof skillLevelShape.toolsUsed.element.options)[number];
type Role = (typeof skillLevelShape.teamRole.options)[number];

const HACKATHON_COUNT_OPTIONS = skillLevelShape.hackathonsAttended.options.map((value) => ({
  value,
  label: value,
}));

const CODING_COMFORT_LABELS: Record<CodingComfort, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

const CODING_COMFORT_OPTIONS = skillLevelShape.codingComfort.options.map((value) => ({
  value,
  label: CODING_COMFORT_LABELS[value],
}));

const TOOL_LABELS: Record<Tool, string> = {
  gemini_api: "Gemini API",
  firebase: "Firebase",
  flutter: "Flutter",
  google_cloud: "Google Cloud",
  android: "Android",
  none: "None of these",
};

const TOOLS_OPTIONS = skillLevelShape.toolsUsed.element.options.map((value) => ({
  value,
  label: TOOL_LABELS[value],
}));

const ROLE_LABELS: Record<Role, string> = {
  frontend: "Frontend",
  backend: "Backend",
  ui_ux: "UI/UX",
  ml: "ML",
};

const ROLE_OPTIONS = skillLevelShape.teamRole.options.map((value) => ({
  value,
  label: ROLE_LABELS[value],
}));

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
