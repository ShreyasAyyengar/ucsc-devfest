"use client";

import { registrationSchema } from "../../../../../backend/convex/application/schemas";
import { createSchemaValidator, defaultApplicationFormValues, withForm } from "./application-form-hook";

export const AgreementsSection = withForm({
  defaultValues: defaultApplicationFormValues,
  render({ form }) {
    return (
      <div className="space-y-3">
        <div className="border-gray-100 border-b pb-1">
          <h3 className="font-semibold text-gray-900 text-sm">Agreements & Consents</h3>
          <p className="text-gray-500 text-xs">Please review and complete the event acknowledgments.</p>
        </div>

        <div className="space-y-2.5">
          <form.AppField
            name="consent.codeOfConduct"
            validators={{
              onBlur: createSchemaValidator(registrationSchema.shape.consent.shape.codeOfConduct),
            }}
          >
            {(field) => (
              <field.CheckboxField
                label="Agree to the code of conduct"
                description="I agree to treat all attendees, mentors, and organizers with respect and follow the official Hackathon Code of Conduct."
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
                label="Consent to photos/video at the event"
                description="I grant permission to Google Developer Groups at UCSC to capture and share photography and videography from the hackathon."
                required
              />
            )}
          </form.AppField>
        </div>

        {/* Separate optional sponsor consent */}
        <div className="mt-4 rounded-xl border border-gray-200 border-dashed bg-gray-50/50 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-medium text-gray-700 text-xs">Sponsor Sharing</span>
            <span className="rounded bg-gray-200/70 px-2 py-0.5 font-medium text-[10px] text-gray-600">Optional</span>
          </div>

          <form.AppField
            name="consent.sponsorInfoSharing"
            validators={{
              onBlur: createSchemaValidator(registrationSchema.shape.consent.shape.sponsorInfoSharing),
            }}
          >
            {(field) => (
              <field.CheckboxField
                label="Consent to share your info with sponsors"
                description="Allow partnering sponsors and recruiters to review your application and resume for internship or job opportunities."
              />
            )}
          </form.AppField>
        </div>
      </div>
    );
  },
});
