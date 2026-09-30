"use client";

import { defaultApplicationFormValues, withForm } from "./application-form-hook";

export const SubmitSection = withForm({
  defaultValues: defaultApplicationFormValues,
  render({ form }) {
    return (
      <form.AppForm>
        <form.SubmitButton label="Submit Hackathon Application" />
      </form.AppForm>
    );
  },
});
