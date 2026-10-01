"use client";

import { registrationSchema } from "../../../../../backend/convex/application/schemas";
import { createSchemaValidator, defaultApplicationFormValues, withForm } from "./application-form-hook";
import { ApplicationSection } from "./application-section";

const YEAR_OPTIONS = [
  { value: "first_year", label: "1st Year / Freshman" },
  { value: "second_year", label: "2nd Year / Sophomore" },
  { value: "third_year", label: "3rd Year / Junior" },
  { value: "fourth_year", label: "4th Year / Senior" },
  { value: "fifth_year_or_later", label: "5th+ Year" },
  { value: "graduate", label: "Graduate / Master's / PhD" },
  { value: "other", label: "Other" },
] as const;

export const IdentitySection = withForm({
  defaultValues: defaultApplicationFormValues,
  render({ form }) {
    return (
      <ApplicationSection defaultOpen number={1} title="Identity" description="Name, major & academic standing">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <form.AppField
            name="identity.name"
            validators={{
              onBlur: createSchemaValidator(registrationSchema.shape.identity.shape.name),
            }}
          >
            {(field) => <field.TextField label="Full Name" placeholder="Your name" required />}
          </form.AppField>
          <form.AppField
            name="identity.major"
            validators={{
              onBlur: createSchemaValidator(registrationSchema.shape.identity.shape.major),
            }}
          >
            {(field) => <field.TextField label="Major" placeholder="e.g. Computer Science" required />}
          </form.AppField>
        </div>

        <form.AppField
          name="identity.year"
          validators={{
            onBlur: createSchemaValidator(registrationSchema.shape.identity.shape.year),
          }}
        >
          {(field) => <field.ShadcnSelectField label="Academic Year" options={YEAR_OPTIONS} placeholder="Select academic year..." required />}
        </form.AppField>
      </ApplicationSection>
    );
  },
});
