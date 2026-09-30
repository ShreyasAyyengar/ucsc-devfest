import { convexClient } from "@convex-dev/better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000",
  plugins: [convexClient()],
});

export const { useSession, signIn, signOut } = authClient;
