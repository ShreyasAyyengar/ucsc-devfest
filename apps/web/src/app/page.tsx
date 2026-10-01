"use client";

import { DevFestView } from "@/components/devfest-view";
import { authClientWeb } from "@/lib/auth-client-web";

export default function Home() {
  const { data: session, isPending } = authClientWeb.useSession();
  const isAuthenticated = Boolean(session?.user);
  const userEmail = session?.user?.email ?? "";

  return <DevFestView isAuthenticated={isAuthenticated} userEmail={userEmail} isLoading={isPending} />;
}
