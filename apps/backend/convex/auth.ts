import type { GenericCtx } from "@convex-dev/better-auth";
import { createClient } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { type BetterAuthOptions, betterAuth } from "better-auth/minimal";
import { multiSession } from "better-auth/plugins";
import { components } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";
import { env } from "./_generated/server";
import authConfig from "./auth.config.ts";
import authSchema from "./betterAuth/schema";

const HOURS_PER_SESSION = 8;
const HOURS_BETWEEN_SESSION_UPDATES = 2;
const SECONDS_PER_HOUR = 60 * 60;

export const authComponent = createClient<DataModel, typeof authSchema>(components.betterAuth, {
  local: {
    schema: authSchema,
  },
});

export const createAuthOptions = (ctx: GenericCtx<DataModel>) => {
  return {
    database: authComponent.adapter(ctx),
    plugins: [convex({ authConfig }), multiSession()],
    trustedOrigins: [env.WEBSITE_URL],
    baseURL: env.WEBSITE_URL + env.AUTH_BASE_PATH,
    socialProviders: {
      google: {
        prompt: "select_account consent",
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        accessType: "offline",
      },
    },
    user: {
      additionalFields: {
        role: {
          // The Convex schema generator cannot translate Better Auth enum-array field types.
          type: "string",
          required: true,
          defaultValue: "attendee",
          input: false,
        },
      },
    },
    session: {
      expiresIn: SECONDS_PER_HOUR * HOURS_PER_SESSION,
      updateAge: SECONDS_PER_HOUR * HOURS_BETWEEN_SESSION_UPDATES,
    },
  } satisfies BetterAuthOptions;
};

export const options = createAuthOptions({} as GenericCtx<DataModel>);

export const createAuth = (ctx: GenericCtx<DataModel>) => betterAuth(createAuthOptions(ctx));
