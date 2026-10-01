"use client";

import { useState } from "react";
import { DevFestView } from "@/components/devfest-view";
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
    <DevFestView
      isAuthenticated={isAuthenticated}
      userEmail={userEmail}
      isLoading={isPending && manualAuthOverride === null}
      onSignIn={handleSignIn}
      onSignOut={handleSignOut}
      onToggleAuth={() => setManualAuthOverride((prev) => (prev === null ? !isAuthenticated : !prev))}
    />
  );
}
