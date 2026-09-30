"use client";

import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { Command, CommandGroup, CommandItem, CommandList } from "@ucsc-devfest/shad-ui/components/command";
import { Popover, PopoverContent, PopoverTrigger } from "@ucsc-devfest/shad-ui/components/popover";
import { motion } from "framer-motion";
import { Check, ChevronsUpDown, Send } from "lucide-react";
import { useState } from "react";

export type ApplicationFormValues = {
  // Identity
  fullName: string;
  email: string;
  year: string;
  major: string;

  // Logistics
  dietary: string;
  allergies: string;
  accessibilityNeeds: string;
  age: string;

  // Skill level
  hackathonsAttended: string;
  codingComfort: string;
  toolsUsed: string[];
  teamRole: string;

  // Motivation (Q/A)
  whyDevFest: string;
  somethingBuilt: string;
  weekendGeminiIdea: string;
  walkAwayGoal: string;

  // Required checkboxes & consents
  agreeCodeOfConduct: boolean;
  consentPhotoVideo: boolean;
  consentShareSponsors: boolean;
};

export const defaultApplicationFormValues: ApplicationFormValues = {
  fullName: "",
  email: "",
  year: "1st Year / Freshman",
  major: "",

  dietary: "none",
  allergies: "",
  accessibilityNeeds: "",
  age: "",

  hackathonsAttended: "0",
  codingComfort: "intermediate",
  toolsUsed: [],
  teamRole: "frontend",

  whyDevFest: "",
  somethingBuilt: "",
  weekendGeminiIdea: "",
  walkAwayGoal: "",

  agreeCodeOfConduct: false,
  consentPhotoVideo: false,
  consentShareSponsors: false,
};

export const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

export type SelectOption = {
  label: string;
  value: string;
};

function getFieldError(field: {
  state: { meta: { isTouched: boolean; errors: unknown[] } };
  form: { state: { submissionAttempts: number } };
}): string | undefined {
  const shouldShow =
    (field.state.meta.isTouched || field.form.state.submissionAttempts > 0) && field.state.meta.errors && field.state.meta.errors.length > 0;

  if (!shouldShow) return undefined;
  const [firstError] = field.state.meta.errors;
  if (!firstError) return undefined;
  if (typeof firstError === "string") return firstError;
  if (
    typeof firstError === "object" &&
    firstError !== null &&
    "message" in firstError &&
    typeof (firstError as { message?: unknown }).message === "string"
  ) {
    return (firstError as { message: string }).message;
  }
  return String(firstError);
}

export function TextField({
  label,
  type = "text",
  placeholder,
  required,
  className,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}) {
  const field = useFieldContext<string>();
  const error = getFieldError(field);

  return (
    <div>
      <label htmlFor={field.name} className="mb-1 block font-medium text-gray-700 text-xs">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={field.name}
        name={field.name}
        type={type}
        placeholder={placeholder}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        className={`w-full rounded-xl border px-3.5 py-2.5 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
          error
            ? "border-red-400 bg-red-50/40 focus:border-red-500 focus:ring-red-500/20"
            : "border-gray-200 bg-gray-50 focus:bg-white focus:ring-[#4285F4]/40"
        } ${className ?? ""}`}
      />
      {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
    </div>
  );
}

export function TextAreaField({
  label,
  placeholder,
  required,
  rows = 3,
  className,
}: {
  label: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  className?: string;
}) {
  const field = useFieldContext<string>();
  const error = getFieldError(field);

  return (
    <div>
      <label htmlFor={field.name} className="mb-1 block font-medium text-gray-700 text-xs">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={field.name}
        name={field.name}
        rows={rows}
        placeholder={placeholder}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        className={`w-full resize-none rounded-xl border px-3.5 py-2.5 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
          error
            ? "border-red-400 bg-red-50/40 focus:border-red-500 focus:ring-red-500/20"
            : "border-gray-200 bg-gray-50 focus:bg-white focus:ring-[#4285F4]/40"
        } ${className ?? ""}`}
      />
      {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
    </div>
  );
}

export function ComboboxField({
  label,
  options,
  placeholder = "Select an option...",
  required,
  className,
}: {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  className?: string;
}) {
  const field = useFieldContext<string>();
  const error = getFieldError(field);
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === field.state.value);

  return (
    <div>
      <label htmlFor={field.name} className="mb-1 block font-medium text-gray-700 text-xs">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            id={field.name}
            type="button"
            role="combobox"
            aria-expanded={open}
            onBlur={field.handleBlur}
            className={`flex h-[42px] w-full cursor-pointer items-center justify-between rounded-xl border px-3.5 py-2.5 text-left text-sm transition-all focus:outline-none focus:ring-2 ${
              error
                ? "border-red-400 bg-red-50/40 text-gray-900 focus:border-red-500 focus:ring-red-500/20"
                : "border-gray-200 bg-gray-50 text-gray-900 hover:bg-gray-100 focus:bg-white focus:ring-[#4285F4]/40"
            } ${className ?? ""}`}
          >
            <span className={selectedOption ? "truncate font-normal" : "text-gray-400"}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-gray-400" />
          </button>
        </PopoverTrigger>

        <PopoverContent
          className="z-50 w-[var(--radix-popover-trigger-width)] min-w-[220px] rounded-xl border border-gray-200 bg-white p-1 shadow-lg"
          align="start"
        >
          <Command className="rounded-xl">
            <CommandList className="max-h-60 overflow-y-auto p-1">
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = field.state.value === option.value;
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => {
                        field.handleChange(option.value);
                        setOpen(false);
                      }}
                      className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-xs transition-colors hover:bg-gray-100"
                    >
                      <span className={isSelected ? "font-semibold text-[#1A73E8]" : "text-gray-700"}>{option.label}</span>
                      {isSelected && <Check className="h-4 w-4 text-[#4285F4]" />}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
    </div>
  );
}

export const SelectField = ComboboxField;

export function RadioGroupField({ label, options, required }: { label: string; options: SelectOption[]; required?: boolean }) {
  const field = useFieldContext<string>();
  const error = getFieldError(field);

  return (
    <div>
      <span className="mb-1.5 block font-medium text-gray-700 text-xs">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = field.state.value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                field.handleChange(opt.value);
                field.handleBlur();
              }}
              className={`cursor-pointer rounded-xl border px-3.5 py-2 font-medium text-xs transition-all ${
                isSelected
                  ? "border-[#4285F4] bg-[#4285F4]/10 font-semibold text-[#1A73E8] shadow-sm ring-1 ring-[#4285F4]"
                  : error
                    ? "border-red-300 bg-red-50/30 text-gray-600 hover:bg-red-50/60"
                    : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
    </div>
  );
}

export function MultiCheckboxField({ label, options }: { label: string; options: SelectOption[] }) {
  const field = useFieldContext<string[]>();
  const error = getFieldError(field);
  const selectedValues = field.state.value || [];

  const handleToggle = (value: string) => {
    if (value === "none") {
      if (selectedValues.includes("none")) {
        field.handleChange([]);
      } else {
        field.handleChange(["none"]);
      }
      field.handleBlur();
      return;
    }

    const withoutNone = selectedValues.filter((v) => v !== "none");
    if (withoutNone.includes(value)) {
      field.handleChange(withoutNone.filter((v) => v !== value));
    } else {
      field.handleChange([...withoutNone, value]);
    }
    field.handleBlur();
  };

  return (
    <div>
      <span className="mb-1.5 block font-medium text-gray-700 text-xs">{label}</span>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {options.map((opt) => {
          const isChecked = selectedValues.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleToggle(opt.value)}
              className={`flex cursor-pointer items-center gap-2 rounded-xl border p-2.5 text-left text-xs transition-all ${
                isChecked
                  ? "border-[#4285F4] bg-[#4285F4]/10 text-[#1A73E8] ring-1 ring-[#4285F4]"
                  : error
                    ? "border-red-300 bg-red-50/30 text-gray-600"
                    : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <div
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                  isChecked ? "border-[#4285F4] bg-[#4285F4] text-white" : "border-gray-300 bg-white"
                }`}
              >
                {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
              </div>
              <span className="truncate font-medium">{opt.label}</span>
            </button>
          );
        })}
      </div>
      {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
    </div>
  );
}

export function CheckboxField({ label, description, required }: { label: string; description?: string; required?: boolean }) {
  const field = useFieldContext<boolean>();
  const error = getFieldError(field);

  return (
    <div>
      <label
        className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${
          error ? "border-red-400 bg-red-50/30 hover:bg-red-50/50" : "border-gray-200 bg-gray-50 hover:bg-gray-100"
        }`}
      >
        <input
          type="checkbox"
          name={field.name}
          checked={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 cursor-pointer rounded border-gray-300 text-[#4285F4] focus:ring-[#4285F4]"
        />
        <div className="flex-1 text-xs">
          <div className="font-medium text-gray-800">
            {label} {required && <span className="text-red-500">*</span>}
          </div>
          {description && <p className="mt-0.5 text-[11px] text-gray-500">{description}</p>}
        </div>
      </label>
      {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
    </div>
  );
}

export function SubmitButton({ label = "Submit Hackathon Application" }: { label?: string }) {
  const form = useFormContext();
  return (
    <form.Subscribe
      selector={(state: { canSubmit?: boolean; isSubmitting?: boolean }) => [state.canSubmit ?? false, state.isSubmitting ?? false] as const}
    >
      {([canSubmit, isSubmitting]) => (
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={!canSubmit || isSubmitting}
          className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#4285F4] px-4 py-3 font-semibold text-sm text-white shadow-md transition-all hover:bg-[#1a73e8] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>{isSubmitting ? "Submitting..." : label}</span>
          <Send className="h-4 w-4" />
        </motion.button>
      )}
    </form.Subscribe>
  );
}

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    TextAreaField,
    SelectField,
    ComboboxField,
    RadioGroupField,
    MultiCheckboxField,
    CheckboxField,
  },
  formComponents: {
    SubmitButton,
  },
});
