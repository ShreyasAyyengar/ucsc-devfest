"use client";

import { registrationSchema } from "../../../../../backend/convex/application/schemas";
import { createSchemaValidator, defaultApplicationFormValues, withForm } from "./application-form-hook";

const DIETARY_OPTIONS = [
  { value: "none", label: "No Restrictions" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "halal", label: "Halal" },
  { value: "kosher", label: "Kosher" },
  { value: "gluten-free", label: "Gluten-Free" },
  { value: "other", label: "Other" },
] as const;

export const LogisticsSection = withForm({
  defaultValues: defaultApplicationFormValues,
  render({ form }) {
    return (
      <div className="space-y-3">
        <div className="border-gray-100 border-b pb-1">
          <h3 className="font-semibold text-gray-900 text-sm">Logistics</h3>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <form.AppField
            name="logistics.dietaryRestrictions"
            validators={{
              onBlur: createSchemaValidator(registrationSchema.shape.logistics.shape.dietaryRestrictions),
            }}
          >
            {(field) => (
              <field.ComboboxField label="Dietary Restrictions" options={DIETARY_OPTIONS} placeholder="Select dietary preference..." />
            )}
          </form.AppField>
          <form.AppField
            name="logistics.age"
            validators={{
              onBlur: createSchemaValidator(registrationSchema.shape.logistics.shape.age),
            }}
          >
            {(field) => <field.NumberField label="Age" placeholder="e.g. 20" min={1} max={120} required />}
          </form.AppField>
        </div>

        <form.AppField
          name="logistics.allergies"
          validators={{
            onBlur: createSchemaValidator(registrationSchema.shape.logistics.shape.allergies),
          }}
        >
          {(field) => <field.TextField label="Allergies" placeholder="e.g., Peanuts, Shellfish, Dairy, or None" />}
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
              placeholder="Is there anything we can do to make the event work better for you?"
              rows={2}
            />
          )}
        </form.AppField>
      </div>
    );
  },
});
