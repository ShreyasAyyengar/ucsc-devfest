"use client";

import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { Command, CommandGroup, CommandItem, CommandList } from "@ucsc-devfest/shad-ui/components/command";
import { Popover, PopoverContent, PopoverTrigger } from "@ucsc-devfest/shad-ui/components/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@ucsc-devfest/shad-ui/components/select";
import { motion } from "framer-motion";
import { Check, ChevronsUpDown, Send } from "lucide-react";
import { useState } from "react";

import type { Registration } from "../../../../../backend/convex/application/schemas";

export type ApplicationFormValues = Omit<Registration, "consent" | "skillLevel"> & {
  skillLevel: Omit<Registration["skillLevel"], "hackathonsAttended" | "codingComfort" | "teamRole"> & {
    hackathonsAttended: Registration["skillLevel"]["hackathonsAttended"] | "";
    codingComfort: Registration["skillLevel"]["codingComfort"] | "";
    teamRole: Registration["skillLevel"]["teamRole"] | "";
  };
  consent: {
    codeOfConduct: boolean;
    photoVideo: boolean;
    sponsorInfoSharing: boolean;
  };
};

export const defaultApplicationFormValues: ApplicationFormValues = {
  googleSub: "dummy-google-sub",

  identity: {
    name: "",
    year: "first_year",
    major: "",
  },

  logistics: {
    dietaryRestrictions: "",
    allergies: "",
    accessibilityNeeds: "",
    age: 18,
  },

  skillLevel: {
    hackathonsAttended: "",
    codingComfort: "",
    toolsUsed: [],
    teamRole: "",
  },

  motivation: {
    whyDevfest: "",
    projectAndWhatWentWrong: "",
    geminiWeekendIdea: "",
    learningGoals: "",
  },

  consent: {
    codeOfConduct: false,
    photoVideo: false,
    sponsorInfoSharing: false,
  },
};

export const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

export type SelectOption<T extends string = string> = {
  label: string;
  value: T;
};

const OPTION_LABELS: Record<string, string> = {
  // Roles
  frontend: "Frontend",
  backend: "Backend",
  ui_ux: "UI/UX",
  ml: "ML",
  // Comfort
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  // Hackathons attended
  "0": "0",
  "1-2": "1-2",
  "3+": "3+",
  // Academic years
  first_year: "1st Year / Freshman",
  second_year: "2nd Year / Sophomore",
  third_year: "3rd Year / Junior",
  fourth_year: "4th Year / Senior",
  fifth_year_or_later: "5th+ Year",
  graduate: "Graduate",
  other: "Other",
  // Tools
  gemini_api: "Gemini API",
  firebase: "Firebase",
  flutter: "Flutter",
  google_cloud: "Google Cloud",
  android: "Android",
  none: "None of these",
};

const SNAKE_CASE_REGEX = /_/g;
const WORD_START_REGEX = /\b\w/g;
const EXPECTED_ONE_OF_REGEX = /expected one of (.+)$/i;
const EXPECTED_OPTIONS_REGEX = /expected (.+?)(?:, received|$)/i;
const QUOTE_WRAP_REGEX = /^["']|["']$/g;

function humanizeOption(opt: string): string {
  if (OPTION_LABELS[opt]) return OPTION_LABELS[opt];
  return opt.replace(SNAKE_CASE_REGEX, " ").replace(WORD_START_REGEX, (c) => c.toUpperCase());
}

export function formatOptionsList(options: string[]): string {
  const formatted = options.map(humanizeOption);
  const [first] = formatted;
  if (formatted.length === 0 || !first) return "";
  if (formatted.length === 1) return first;
  const last = formatted.at(-1);
  if (formatted.length === 2 && last) return `${first} or ${last}`;
  if (last) {
    return `${formatted.slice(0, -1).join(", ")}, or ${last}`;
  }
  return formatted.join(", ");
}

export function formatValidationErrorMessage(message: string, values?: unknown[]): string {
  if (Array.isArray(values) && values.length > 0) {
    if (values.some((v) => typeof v === "boolean" || v === "true" || v === "false")) {
      return "Please select an option";
    }
    const stringValues = values.map(String);
    return `Please select an option: ${formatOptionsList(stringValues)}`;
  }

  const match1 = message.match(EXPECTED_ONE_OF_REGEX);
  if (match1?.[1]) {
    const rawOptions = match1[1].split("|").map((s) => s.trim().replace(QUOTE_WRAP_REGEX, ""));
    if (rawOptions.some((v) => v === "true" || v === "false")) {
      return "Please select an option";
    }
    return `Please select an option: ${formatOptionsList(rawOptions)}`;
  }

  const match2 = message.match(EXPECTED_OPTIONS_REGEX);
  if (match2?.[1]) {
    const rawOptions = match2[1].split("|").map((s) => s.trim().replace(QUOTE_WRAP_REGEX, ""));
    if (rawOptions.some((v) => v === "true" || v === "false")) {
      return "Please select an option";
    }
    return `Please select an option: ${formatOptionsList(rawOptions)}`;
  }

  if (message.includes("expected true") || message === "Please select an option: True") {
    return "Please select an option";
  }

  return message;
}

export function createSchemaValidator<T>(schema: {
  safeParse: (val: unknown) => { success: boolean; error?: { issues: { message: string; values?: unknown[] }[] } };
}) {
  return ({ value }: { value: T }): string | undefined => {
    const res = schema.safeParse(value);
    const [firstIssue] = res.error?.issues ?? [];
    if (!res.success && firstIssue) {
      return formatValidationErrorMessage(firstIssue.message, firstIssue.values);
    }
    return undefined;
  };
}

export function getFieldError(field: {
  state: { meta: { isTouched: boolean; errors: unknown[] } };
  form: { state: { submissionAttempts: number } };
}): string | undefined {
  const shouldShow =
    (field.state.meta.isTouched || field.form.state.submissionAttempts > 0) && field.state.meta.errors && field.state.meta.errors.length > 0;

  if (!shouldShow) return undefined;
  const [firstError] = field.state.meta.errors;
  if (!firstError) return undefined;
  if (typeof firstError === "string") return formatValidationErrorMessage(firstError);
  if (
    typeof firstError === "object" &&
    firstError !== null &&
    "message" in firstError &&
    typeof (firstError as { message?: unknown }).message === "string"
  ) {
    const values =
      "values" in firstError && Array.isArray((firstError as { values?: unknown[] }).values)
        ? (firstError as { values?: unknown[] }).values
        : undefined;
    return formatValidationErrorMessage((firstError as { message: string }).message, values);
  }
  return formatValidationErrorMessage(String(firstError));
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
  const field = useFieldContext<string | number | undefined>();
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
        value={field.state.value ?? ""}
        onBlur={field.handleBlur}
        onChange={(e) => {
          if (type === "number") {
            const val = e.target.value === "" ? 0 : Number.parseInt(e.target.value, 10);
            field.handleChange(Number.isNaN(val) ? 0 : (val as unknown as string));
          } else {
            field.handleChange(e.target.value);
          }
        }}
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

export function NumberField({
  label,
  placeholder,
  required,
  min,
  max,
  className,
}: {
  label: string;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  className?: string;
}) {
  const field = useFieldContext<number>();
  const error = getFieldError(field);

  return (
    <div>
      <label htmlFor={field.name} className="mb-1 block font-medium text-gray-700 text-xs">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={field.name}
        name={field.name}
        type="number"
        min={min}
        max={max}
        placeholder={placeholder}
        value={Number.isNaN(field.state.value) || field.state.value === 0 ? "" : field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => {
          const val = e.target.value === "" ? 0 : Number.parseInt(e.target.value, 10);
          field.handleChange(Number.isNaN(val) ? 0 : val);
        }}
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
  const field = useFieldContext<string | undefined>();
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
        value={field.state.value ?? ""}
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

export function ComboboxField<T extends string = string>({
  label,
  options,
  placeholder = "Select an option...",
  required,
  className,
}: {
  label: string;
  options: readonly SelectOption<T>[] | SelectOption<T>[];
  placeholder?: string;
  required?: boolean;
  className?: string;
}) {
  const field = useFieldContext<T>();
  const error = getFieldError(field);
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === field.state.value);

  return (
    <div>
      <label htmlFor={field.name} className="mb-1 block font-medium text-gray-700 text-xs">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <Popover
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            field.handleBlur();
          }
        }}
      >
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
                        field.handleBlur();
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

export function ShadcnSelectField<T extends string = string>({
  label,
  options,
  placeholder = "Select an option...",
  required,
  className,
}: {
  label: string;
  options: readonly SelectOption<T>[] | SelectOption<T>[];
  placeholder?: string;
  required?: boolean;
  className?: string;
}) {
  const field = useFieldContext<T>();
  const error = getFieldError(field);

  return (
    <div>
      <label htmlFor={field.name} className="mb-1 block font-medium text-gray-700 text-xs">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Select
        value={field.state.value}
        onValueChange={(val) => {
          field.handleChange(val as T);
          field.handleBlur();
        }}
      >
        <SelectTrigger
          id={field.name}
          className={`flex h-[42px] w-full cursor-pointer items-center justify-between rounded-xl border px-3.5 py-2.5 text-left text-sm transition-all focus:outline-none focus:ring-2 ${
            error
              ? "border-red-400 bg-red-50/40 text-gray-900 focus:border-red-500 focus:ring-red-500/20"
              : "border-gray-200 bg-gray-50 text-gray-900 hover:bg-gray-100 focus:bg-white focus:ring-[#4285F4]/40"
          } ${className ?? ""}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent
          position="popper"
          className="z-50 max-h-60 w-[var(--radix-select-trigger-width)] rounded-xl border border-gray-200 bg-white p-1 shadow-lg"
        >
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-xs transition-colors hover:bg-gray-100"
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
    </div>
  );
}

export function RadioGroupField<T extends string = string>({
  label,
  options,
  required,
}: {
  label: string;
  options: readonly SelectOption<T>[] | SelectOption<T>[];
  required?: boolean;
}) {
  const field = useFieldContext<T>();
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

export function MultiCheckboxField<T extends string = string>({
  label,
  options,
}: {
  label: string;
  options: readonly SelectOption<T>[] | SelectOption<T>[];
}) {
  const field = useFieldContext<T[]>();
  const error = getFieldError(field);
  const selectedValues = (field.state.value || []) as string[];

  const handleToggle = (value: T) => {
    const strVal = String(value);
    if (strVal === "none") {
      if (selectedValues.includes("none")) {
        field.handleChange([]);
      } else {
        field.handleChange([value]);
      }
      field.handleBlur();
      return;
    }

    const withoutNone = selectedValues.filter((v) => v !== "none") as T[];
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
  const rawError = getFieldError(field);
  const error = rawError === "Please select an option: True" ? "Please select an option" : rawError;

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
          onChange={(e) => {
            field.handleChange(e.target.checked);
            field.handleBlur();
          }}
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

export function SubmitButton({ label = "Submit Hackathon Application", disabled }: { label?: string; disabled?: boolean }) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state: { isSubmitting?: boolean }) => [state.isSubmitting ?? false] as const}>
      {([isSubmitting]) => (
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={disabled !== undefined ? disabled : isSubmitting}
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
    NumberField,
    TextAreaField,
    SelectField,
    ComboboxField,
    ShadcnSelectField,
    RadioGroupField,
    MultiCheckboxField,
    CheckboxField,
  },
  formComponents: {
    SubmitButton,
  },
});
