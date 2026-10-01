import resend from "@convex-dev/resend/convex.config.js";
import { defineApp } from "convex/server";
import { v } from "convex/values";
import betterAuth from "./betterAuth/convex.config";

const app = defineApp({
  env: {
    WEBSITE_URL: v.string(),

    BETTER_AUTH_SECRET: v.string(),
    AUTH_BASE_PATH: v.string(),

    GOOGLE_CLIENT_ID: v.string(),
    GOOGLE_CLIENT_SECRET: v.string(),

    RESEND_API_KEY: v.string(),
    RESEND_FROM_EMAIL: v.optional(v.string()),
    RESEND_REPLY_TO: v.optional(v.string()),
    RESEND_TEST_MODE: v.optional(v.string()),
  },
});
app.use(betterAuth);
app.use(resend);
export default app;
