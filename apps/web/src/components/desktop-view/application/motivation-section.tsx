"use client";

import { defaultApplicationFormValues, withForm } from "./application-form-hook";

const MIN_MOTIVATION_LENGTH = 10;

export const MotivationSection = withForm({
  defaultValues: defaultApplicationFormValues,
  render({ form }) {
    return (
      <div className="space-y-3">
        <div className="border-gray-100 border-b pb-1">
          <h3 className="font-semibold text-gray-900 text-sm">Motivation</h3>
          <p className="text-gray-500 text-xs">Help us get to know you and what you want to achieve.</p>
        </div>

        <form.AppField
          name="whyDevFest"
          validators={{
            onChange: ({ value }) =>
              value.trim().length < MIN_MOTIVATION_LENGTH
                ? `Please share why you want to attend (at least ${MIN_MOTIVATION_LENGTH} characters)`
                : undefined,
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
          name="somethingBuilt"
          validators={{
            onChange: ({ value }) =>
              value.trim().length < MIN_MOTIVATION_LENGTH
                ? `Please share something you built or attempted to build (at least ${MIN_MOTIVATION_LENGTH} characters)`
                : undefined,
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
          name="weekendGeminiIdea"
          validators={{
            onChange: ({ value }) =>
              value.trim().length < MIN_MOTIVATION_LENGTH
                ? `Please share your weekend project idea (at least ${MIN_MOTIVATION_LENGTH} characters)`
                : undefined,
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
          name="walkAwayGoal"
          validators={{
            onChange: ({ value }) =>
              value.trim().length < MIN_MOTIVATION_LENGTH
                ? `Please share what you hope to learn (at least ${MIN_MOTIVATION_LENGTH} characters)`
                : undefined,
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
      </div>
    );
  },
});
