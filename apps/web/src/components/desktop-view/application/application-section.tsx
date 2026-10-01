"use client";

import { ChevronDown } from "lucide-react";
import { type PropsWithChildren, useState } from "react";

type ApplicationSectionProps = PropsWithChildren<{
  defaultOpen?: boolean;
  description: string;
  number: number;
  title: string;
}>;

export function ApplicationSection({ children, defaultOpen = false, description, number, title }: ApplicationSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <details
      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none"
      open={isOpen}
      onToggle={(event) => setIsOpen(event.currentTarget.open)}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between p-4 text-left transition-colors hover:bg-gray-50 lg:hidden [&::-webkit-details-marker]:hidden">
        <span>
          <span className="block font-bold text-gray-900 text-sm">
            {number}. {title}
          </span>
          <span className="block text-[11px] text-gray-500">{description}</span>
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180 group-open:text-[#4285F4]" />
      </summary>

      <div className="hidden space-y-3 border-gray-100 border-t p-4 pt-3.5 group-open:block lg:block lg:border-0 lg:p-0">
        <div className="hidden border-gray-100 border-b pb-1 lg:block">
          <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
          <p className="text-gray-500 text-xs">{description}</p>
        </div>
        {children}
      </div>
    </details>
  );
}
