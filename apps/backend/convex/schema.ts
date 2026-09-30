import { defineSchema } from "convex/server";
import { registrationTable } from "./application/schemas.ts";

export default defineSchema({
  registrations: registrationTable,
});
