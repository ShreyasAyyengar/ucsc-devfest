import { convexBetterAuthNextJs } from "@convex-dev/better-auth/nextjs";
import { env } from "@/env";

export const { GET, POST } = convexBetterAuthNextJs({
  convexUrl: env.NEXT_PUBLIC_CONVEX_URL,
  convexSiteUrl: env.NEXT_PUBLIC_CONVEX_SITE_URL,
}).handler;
