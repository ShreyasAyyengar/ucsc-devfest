import { authClientWeb } from "@/lib/auth-client-web.ts";
import { GdgLogoSvg } from "@/SVGs/gdg-logo-svg";

type DevFestHeaderProps = {
  isAuthenticated?: boolean;
  userEmail?: string;
};

export function DevFestHeader({ isAuthenticated = false, userEmail = "student@ucsc.edu" }: DevFestHeaderProps) {
  const handleSignOut = async () => {
    await authClientWeb.signOut();
  };

  return (
    <header className="mb-6 flex w-full items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        {/* Google Developer Groups Logo */}
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200/90 bg-gray-50 shadow-xs">
          <GdgLogoSvg className="h-3.5 w-auto" />
        </div>
        <h1 className="font-bold font-google text-gray-900 text-sm tracking-tight sm:text-base">Google Developer Groups at UCSC</h1>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        {isAuthenticated && (
          <div className="flex items-center gap-2">
            <span className="hidden text-black text-xs sm:inline-block">{userEmail}</span>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-lg border border-gray-200 px-2.5 py-1 text-black text-xs transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
