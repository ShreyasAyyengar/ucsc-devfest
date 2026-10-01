"use client";

import { Command, CommandGroup, CommandItem, CommandList } from "@ucsc-devfest/shad-ui/components/command";
import { Popover, PopoverContent, PopoverTrigger } from "@ucsc-devfest/shad-ui/components/popover";
import { motion } from "framer-motion";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { registrationSchema } from "../../../../../backend/convex/application/schemas";
import { createSchemaValidator, defaultApplicationFormValues, getFieldError, useFieldContext, withForm } from "./application-form-hook";
import { ApplicationSection } from "./application-section";

const DIETARY_OPTIONS = [
  { value: "none", label: "No Restrictions" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "halal", label: "Halal" },
  { value: "kosher", label: "Kosher" },
  { value: "gluten-free", label: "Gluten-Free" },
  { value: "other", label: "Other" },
] as const;

const OTHER_PREFIX_WITH_SPACE = "Other: ";
const OTHER_PREFIX = "Other:";

function isOtherValue(val: string): boolean {
  if (!val) return false;
  if (val === "other" || val.startsWith(OTHER_PREFIX)) return true;
  return !DIETARY_OPTIONS.some((opt) => opt.value === val);
}

function extractOtherText(val: string): string {
  if (!val) return "";
  if (val.startsWith(OTHER_PREFIX_WITH_SPACE)) return val.slice(OTHER_PREFIX_WITH_SPACE.length);
  if (val.startsWith(OTHER_PREFIX)) return val.slice(OTHER_PREFIX.length);
  if (val === "other") return "";
  if (DIETARY_OPTIONS.some((opt) => opt.value === val)) return "";
  return val;
}

function DietaryRestrictionsField() {
  const field = useFieldContext<string | undefined>();
  const error = getFieldError(field);
  const [open, setOpen] = useState(false);

  const initialVal = field.state.value ?? "";
  const [isOther, setIsOther] = useState(() => isOtherValue(initialVal));
  const [otherText, setOtherText] = useState(() => extractOtherText(initialVal));

  const selectedOption = isOther
    ? DIETARY_OPTIONS.find((opt) => opt.value === "other")
    : DIETARY_OPTIONS.find((opt) => opt.value === field.state.value);

  const handleSelectOption = (value: string) => {
    if (value === "other") {
      setIsOther(true);
      const finalVal = otherText.trim() ? `Other: ${otherText.trim()}` : "other";
      field.handleChange(finalVal);
    } else {
      setIsOther(false);
      field.handleChange(value);
    }
    field.handleBlur();
    setOpen(false);
  };

  const handleOtherTextChange = (text: string) => {
    setOtherText(text);
    const finalVal = text.trim() ? `Other: ${text.trim()}` : "other";
    field.handleChange(finalVal);
  };

  const handleOtherBlur = () => {
    const finalVal = otherText.trim() ? `Other: ${otherText.trim()}` : "other";
    field.handleChange(finalVal);
    field.handleBlur();
  };

  return (
    <div className="space-y-2">
      <div>
        <label htmlFor={field.name} className="mb-1 block font-medium text-gray-700 text-xs">
          Dietary Restrictions
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
              } w-full`}
            >
              <span className={selectedOption ? "truncate font-normal" : "text-gray-400"}>
                {selectedOption ? selectedOption.label : "Select dietary preference..."}
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
                  {DIETARY_OPTIONS.map((option) => {
                    const isSelected = selectedOption?.value === option.value;
                    return (
                      <CommandItem
                        key={option.value}
                        value={option.label}
                        onSelect={() => handleSelectOption(option.value)}
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

      {isOther && (
        <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}>
          <label htmlFor="dietary-other-input" className="mb-1 block font-medium text-gray-700 text-xs">
            Specific Dietary Restrictions
          </label>
          <input
            id="dietary-other-input"
            type="text"
            placeholder="e.g., Pescatarian, Low FODMAP, No Dairy"
            value={otherText}
            onChange={(e) => handleOtherTextChange(e.target.value)}
            onBlur={handleOtherBlur}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-gray-900 text-sm placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]/40"
          />
        </motion.div>
      )}
    </div>
  );
}

export const LogisticsSection = withForm({
  defaultValues: defaultApplicationFormValues,
  render({ form }) {
    return (
      <ApplicationSection number={2} title="Logistics" description="Dietary preferences, age & accessibility">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <form.AppField
            name="logistics.dietaryRestrictions"
            validators={{
              onBlur: createSchemaValidator(registrationSchema.shape.logistics.shape.dietaryRestrictions),
            }}
          >
            {() => <DietaryRestrictionsField />}
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
      </ApplicationSection>
    );
  },
});
