"use client";

import { useState } from "react";
import { DesktopView } from "@/components/desktop-view/desktop-view";
import { MobileView } from "@/components/mobile-view/mobile-view";
import { authClientWeb } from "@/lib/auth-client-web";

export default function Home() {
  const { data: session, isPending } = authClientWeb.useSession();
  const [manualAuthOverride, setManualAuthOverride] = useState<boolean | null>(null);

  const isAuthenticated = manualAuthOverride !== null ? manualAuthOverride : Boolean(session?.user);
  const userEmail = session?.user?.email ?? (isAuthenticated ? "student@ucsc.edu" : "");

  const handleSignIn = async () => {
    await authClientWeb.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  const handleSignOut = async () => {
    if (manualAuthOverride !== null) {
      setManualAuthOverride(false);
    }
    await authClientWeb.signOut();
  };

  return (
    <>
      {/* Mobile View Wrapper */}
      <div className="w-full lg:hidden">
        <MobileView />
      </div>

      {/* Desktop View Wrapper */}
      <div className="hidden w-full lg:block">
        <DesktopView
          isAuthenticated={isAuthenticated}
          userEmail={userEmail}
          isLoading={isPending && manualAuthOverride === null}
          onSignIn={handleSignIn}
          onSignOut={handleSignOut}
          onToggleAuth={() => setManualAuthOverride((prev) => (prev === null ? !isAuthenticated : !prev))}
        />
      </div>
    </>
  );
}
