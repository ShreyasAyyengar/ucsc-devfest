"use client";

import { type AuthClient, ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";
import { authClient } from "@/lib/auth-client";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL ?? "";
const convex = new ConvexReactClient(convexUrl);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexBetterAuthProvider client={convex} authClient={authClient as unknown as AuthClient}>
      {children}
    </ConvexBetterAuthProvider>
  );
}
