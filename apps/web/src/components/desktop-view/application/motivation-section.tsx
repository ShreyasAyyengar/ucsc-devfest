"use client";

import { registrationSchema } from "../../../../../backend/convex/application/schemas";
import { createSchemaValidator, defaultApplicationFormValues, withForm } from "./application-form-hook";
import { ApplicationSection } from "./application-section";

export const MotivationSection = withForm({
  defaultValues: defaultApplicationFormValues,
  render({ form }) {
    return (
      <ApplicationSection number={4} title="Motivation" description="Why DevFest & projects you dream of">
        <form.AppField
          name="motivation.whyDevfest"
          validators={{
            onBlur: createSchemaValidator(registrationSchema.shape.motivation.shape.whyDevfest),
          }}
        >
          {(field) => (
            <field.TextAreaField
              label="Why do you want to be a part of the DevFest Hackathon?"
              placeholder="What excites you about DevFest, collaborating with teams, or building with Google technologies?"
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
              label="Tell us about something you built or tried to build. What went wrong?"
              placeholder="Share a project, a challenge, or a roadblock you encountered and how you handled it."
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
              label="If you had a weekend and the Gemini API, what problem would you want to solve?"
              placeholder="Tell us about a tool, app, or concept you'd love to prototype."
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
              label="What do you want to walk away knowing that you don't know now?"
              placeholder="A framework, an API, systems design, teamwork experience, etc."
              rows={3}
              required
            />
          )}
        </form.AppField>
      </ApplicationSection>
    );
  },
});
