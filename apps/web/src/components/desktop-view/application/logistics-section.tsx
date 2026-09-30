"use client";

import { defaultApplicationFormValues, withForm } from "./application-form-hook";

const MIN_AGE = 13;
const MAX_AGE = 120;

const DIETARY_OPTIONS = [
  { value: "none", label: "No Restrictions" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "halal", label: "Halal" },
  { value: "kosher", label: "Kosher" },
  { value: "gluten-free", label: "Gluten-Free" },
  { value: "other", label: "Other" },
];

export const LogisticsSection = withForm({
  defaultValues: defaultApplicationFormValues,
  render({ form }) {
    return (
      <div className="space-y-3">
        <div className="border-gray-100 border-b pb-1">
          <h3 className="font-semibold text-gray-900 text-sm">Logistics</h3>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <form.AppField name="dietary">
            {(field) => (
              <field.ComboboxField label="Dietary Restrictions" options={DIETARY_OPTIONS} placeholder="Select dietary preference..." />
            )}
          </form.AppField>
          <form.AppField
            name="age"
            validators={{
              onChange: ({ value }) => {
                if (!value.trim()) return "Age is required";
                const num = Number(value);
                if (Number.isNaN(num) || num < MIN_AGE || num > MAX_AGE) {
                  return `Please enter a valid age (${MIN_AGE}+)`;
                }
              },
            }}
          >
            {(field) => <field.TextField label="Age" type="number" placeholder="e.g. 20" required />}
          </form.AppField>
        </div>

        <form.AppField name="allergies">
          {(field) => <field.TextField label="Allergies" placeholder="e.g., Peanuts, Shellfish, Dairy, or None" />}
        </form.AppField>

        <form.AppField name="accessibilityNeeds">
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
