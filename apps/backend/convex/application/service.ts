import { ConvexError } from "convex/values";
import { withSystemFields, zid } from "convex-helpers/server/zod4";
import { z } from "zod";

import { protectedMutation } from "../lib/procedures";
import { registrationSchema } from "./schemas";

const registrationInputSchema = registrationSchema.omit({ googleSub: true });
const registrationDocumentSchema = z.object(withSystemFields("registrations", registrationSchema.shape));

import type { ZCustomCtx } from "convex-helpers/server/zod4";
import { authComponent, createAuth } from "../auth";
import { protectedQuery } from "../lib/procedures";

type AuthenticatedCtx = ZCustomCtx<typeof protectedQuery>;

async function getGoogleSub(ctx: AuthenticatedCtx): Promise<string> {
  const { auth, headers } = await authComponent.getAuth(createAuth, ctx);
  const accounts = await auth.api.listUserAccounts({ headers });

  const googleAccount = accounts.find((account) => account.providerId === "google");

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
    const googleSub = await getGoogleSub(ctx);
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

    return ctx.db.insert("registrations", {
      ...registration,
      googleSub,
    });
  },
});

export const getRegistration = protectedQuery({
  args: {},
  returns: registrationDocumentSchema.nullable(),
  handler: async (ctx) => {
    const googleSub = await getGoogleSub(ctx);

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
    const googleSub = await getGoogleSub(ctx);
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
