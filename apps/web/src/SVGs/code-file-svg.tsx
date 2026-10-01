import type { SVGProps } from "react";

export function CodeFileSvg({ className = "h-3 w-3 text-[#4285F4]", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" role="img" aria-label="Code file icon" {...props}>
      <title>Code file icon</title>
      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633z" clipRule="evenodd" />
    </svg>
  );
}
