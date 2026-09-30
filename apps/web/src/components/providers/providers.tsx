"use client";

import { type AuthClient, ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { ConvexReactClient } from "convex/react";
import { ConvexQueryCacheProvider } from "convex-helpers/react/cache";
import type { ReactNode } from "react";
import { env } from "@/env";
import { authClientWeb } from "@/lib/auth-client-web";

const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL);

export function ConvexClientProvider({ children, initialToken }: { children: ReactNode; initialToken?: string | null }) {
  return (
    <ConvexBetterAuthProvider client={convex} authClient={authClientWeb as unknown as AuthClient} initialToken={initialToken}>
      <ConvexQueryCacheProvider expiration={30 * 60_000} maxIdleEntries={100}>
        {children}
      </ConvexQueryCacheProvider>
    </ConvexBetterAuthProvider>
  );
}

export default function Providers({ children, initialToken }: { children: ReactNode; initialToken?: string | null }) {
  return <ConvexClientProvider initialToken={initialToken}>{children}</ConvexClientProvider>;
}
