import { defineTable } from "convex/server";
import { zodOutputToConvex } from "convex-helpers/server/zod";
import { z } from "zod";

const requiredText = (label: string, maxLength = 2000) => z.string().trim().min(1, `${label} is required`).max(maxLength);
const optionalText = z.string().trim().max(1000).optional();

export const registrationSchema = z.object({
  googleSub: z.string(), // Google account ID

  identity: z.object({
    name: requiredText("Name", 150),
    year: z.enum(["first_year", "second_year", "third_year", "fourth_year", "fifth_year_or_later", "graduate", "other"]),
    major: requiredText("Major", 200),
  }),

  logistics: z.object({
    dietaryRestrictions: optionalText,
    allergies: optionalText,
    accessibilityNeeds: optionalText,
    age: z.number().int().min(1).max(120),
  }),

  skillLevel: z.object({
    hackathonsAttended: z.enum(["0", "1-2", "3+"]),
    codingComfort: z.enum(["beginner", "intermediate", "advanced"]),

    toolsUsed: z
      .array(z.enum(["gemini_api", "firebase", "flutter", "google_cloud", "android", "none"]))
      .min(1, "Select at least one option, or choose none of these")
      .max(5)
      .refine((tools) => new Set(tools).size === tools.length, {
        message: "Do not select the same tool more than once",
      })
      .refine((tools) => !tools.includes("none") || tools.length === 1, {
        message: "'None' cannot be selected with another tool",
      }),

    teamRole: z.enum(["frontend", "backend", "ui_ux", "ml"]),
  }),

  motivation: z.object({
    whyDevfest: requiredText("Why you want to attend"),
    projectAndWhatWentWrong: requiredText("Your project experience"),
    geminiWeekendIdea: requiredText("Your Gemini API idea"),
    learningGoals: requiredText("Your learning goals"),
  }),

  consent: z.object({
    codeOfConduct: z.literal(true, {
      error: "You must agree to the code of conduct",
    }),
    photoVideo: z.literal(true, {
      error: "Photo/video consent is required",
    }),
    sponsorInfoSharing: z.boolean().default(false),
  }),
});

export const registrationTable = defineTable(zodOutputToConvex(registrationSchema));
