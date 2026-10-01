"use node";

import { renderRegistrationConfirmationEmail } from "@ucsc-devfest/transactional";
import { zid } from "convex-helpers/server/zod4";
import { z } from "zod";
import { type ActionCtx, env } from "../_generated/server";
import { internalAction } from "../lib/procedures";
import { resend } from "./resend";

const MAX_NAME_LENGTH = 150;

type SendRegistrationEmailOptions = {
  idempotencyKey?: string;
  name: string;
  priority: boolean;
  to: string;
};

async function sendRegistrationEmail(ctx: ActionCtx, { idempotencyKey, name, priority, to }: SendRegistrationEmailOptions) {
  const { html, text } = await renderRegistrationConfirmationEmail({
    name,
    priority,
    actionUrl: env.WEBSITE_URL,
  });
  const replyTo = "ucsc.dsc@gmail.com";

  return resend.sendEmail(ctx, {
    from: "UCSC DevFest <events@ucsc-devfest.com>",
    to,
    subject: "Application received — Google DevFest 2026 at UC Santa Cruz",
    html,
    text,
    replyTo: [replyTo],
    ...(idempotencyKey ? { idempotencyKey } : {}),
  });
}

export const sendRegistrationConfirmation = internalAction({
  args: z.object({
    name: z.string().trim().min(1).max(MAX_NAME_LENGTH),
    priority: z.boolean(),
    registrationId: zid("registrations"),
    to: z.email(),
  }),
  returns: z.string(),
  handler: (ctx, { name, priority, registrationId, to }) =>
    sendRegistrationEmail(ctx, {
      idempotencyKey: `registration-confirmation:${registrationId}`,
      name,
      priority,
      to,
    }),
});

export const sendRegistrationConfirmationTest = internalAction({
  args: z.object({
    name: z.string().trim().min(1).max(MAX_NAME_LENGTH),
  }),
  returns: z.string(),
  handler: (ctx, { name }) =>
    sendRegistrationEmail(ctx, {
      name,
      priority: true,
      to: "ucsc.dsc@gmail.com",
    }),
});
