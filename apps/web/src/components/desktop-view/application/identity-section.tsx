"use client";

import { defaultApplicationFormValues, withForm } from "./application-form-hook";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const YEAR_OPTIONS = [
  { value: "1st Year / Freshman", label: "1st Year / Freshman" },
  { value: "2nd Year / Sophomore", label: "2nd Year / Sophomore" },
  { value: "3rd Year / Junior", label: "3rd Year / Junior" },
  { value: "4th Year / Senior", label: "4th Year / Senior" },
  { value: "5th+ Year", label: "5th+ Year" },
  { value: "Graduate / Master's / PhD", label: "Graduate / Master's / PhD" },
  { value: "High School / Other", label: "High School / Other" },
];

export const IdentitySection = withForm({
  defaultValues: defaultApplicationFormValues,
  render({ form }) {
    return (
      <div className="space-y-3">
        <div className="border-gray-100 border-b pb-1">
          <h3 className="font-semibold text-gray-900 text-sm">Identity</h3>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <form.AppField
            name="fullName"
            validators={{
              onChange: ({ value }) => (!value.trim() ? "Full name is required" : undefined),
            }}
          >
            {(field) => <field.TextField label="Name" placeholder="Full name" required />}
          </form.AppField>
          <form.AppField
            name="email"
            validators={{
              onChange: ({ value }) => {
                if (!value.trim()) return "Email address is required";
                if (!EMAIL_REGEX.test(value.trim())) {
                  return "Please enter a valid email address";
                }
              },
            }}
          >
            {(field) => <field.TextField label="Email" type="email" placeholder="student@ucsc.edu" required />}
          </form.AppField>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <form.AppField
            name="year"
            validators={{
              onChange: ({ value }) => (!value ? "Academic year is required" : undefined),
            }}
          >
            {(field) => <field.ComboboxField label="Year" options={YEAR_OPTIONS} placeholder="Select academic year..." required />}
          </form.AppField>
          <form.AppField
            name="major"
            validators={{
              onChange: ({ value }) => (!value.trim() ? "Major is required" : undefined),
            }}
          >
            {(field) => <field.TextField label="Major" placeholder="e.g. Computer Science" required />}
          </form.AppField>
        </div>
      </div>
    );
  },
});
