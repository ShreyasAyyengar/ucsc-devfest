import { ConvexError } from "convex/values";
import type { ZCustomCtx } from "convex-helpers/server/zod4";
import { withSystemFields, zid } from "convex-helpers/server/zod4";
import { z } from "zod";

import { components } from "../_generated/api";
import { protectedMutation, type protectedQuery, publicQuery } from "../lib/procedures";
import { isPriority } from "../priority.ts";
import { registrationDocumentSchema, registrationSchema } from "./schemas";

const registrationInputSchema = registrationSchema.omit({ googleSub: true });
const registrationDocumentWithSystemFieldsSchema = z.object(withSystemFields("registrations", registrationDocumentSchema.shape));

type AuthenticatedCtx = ZCustomCtx<typeof protectedQuery>;
type QueryRunnerCtx = Pick<AuthenticatedCtx, "runQuery">;

async function getGoogleSub(ctx: QueryRunnerCtx, userId: string): Promise<string> {
  // Look up the linked provider account directly by the stable Better Auth
  // user id contained in the already-verified Convex identity. Calling
  // Better Auth's session API here creates a sign-out race: Better Auth
  // revokes its session before Convex drops the JWT, causing this reactive
  // query to briefly fail with `APIError: Unauthorized`.
  const googleAccount = (await ctx.runQuery(components.betterAuth.adapter.findOne, {
    model: "account",
    where: [
      { field: "userId", value: userId },
      { field: "providerId", value: "google" },
    ],
  })) as { accountId: string } | null;

  if (!googleAccount) {
    throw new ConvexError({
      code: "UNAUTHORIZED",
      message: "A linked Google account is required.",
    });
  }

  return googleAccount.accountId;
}

export const createRegistration = protectedMutation({
  args: registrationInputSchema,
  returns: zid("registrations"),
  handler: async (ctx, registration) => {
    const recipientEmail = ctx.identity.email;

    if (!recipientEmail) {
      throw new ConvexError({
        code: "INVALID_ACCOUNT",
        message: "Your Google account must have an email address to register.",
      });
    }

    const googleSub = await getGoogleSub(ctx, ctx.identity.subject);
    const existingRegistration = await ctx.db
      .query("registrations")
      .withIndex("googleSub", (query) => query.eq("googleSub", googleSub))
      .unique();

    if (existingRegistration) {
      throw new ConvexError({
        code: "CONFLICT",
        message: "A registration already exists for this Google account.",
      });
    }

    const priority = isPriority;
    const registrationId = await ctx.db.insert("registrations", {
      ...registration,
      googleSub,
      priority,
    });

    // await ctx.scheduler.runAfter(0, internal.email.actions.sendRegistrationConfirmation, {
    //   name: registration.identity.name,
    //   priority,
    //   registrationId,
    //   to: recipientEmail,
    // });

    return registrationId;
  },
});

export const getRegistration = publicQuery({
  args: {},
  returns: registrationDocumentWithSystemFieldsSchema.nullable(),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    // This query is a live subscription. During sign-out Convex may execute it
    // once more after the identity has been cleared, which is a normal state
    // transition rather than an exceptional request.
    if (!identity) {
      return null;
    }

    const googleSub = await getGoogleSub(ctx, identity.subject);

    return ctx.db
      .query("registrations")
      .withIndex("googleSub", (query) => query.eq("googleSub", googleSub))
      .unique();
  },
});

export const deleteRegistration = protectedMutation({
  args: {},
  returns: z.boolean(),
  handler: async (ctx) => {
    const googleSub = await getGoogleSub(ctx, ctx.identity.subject);
    const registration = await ctx.db
      .query("registrations")
      .withIndex("googleSub", (query) => query.eq("googleSub", googleSub))
      .unique();

    if (!registration) {
      return false;
    }

    await ctx.db.delete("registrations", registration._id);
    return true;
  },
});
