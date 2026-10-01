/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as application_schemas from "../application/schemas.js";
import type * as application_service from "../application/service.js";
import type * as auth from "../auth.js";
import type * as email_actions from "../email/actions.js";
import type * as email_resend from "../email/resend.js";
import type * as http from "../http.js";
import type * as lib_procedures from "../lib/procedures.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "application/schemas": typeof application_schemas;
  "application/service": typeof application_service;
  auth: typeof auth;
  "email/actions": typeof email_actions;
  http: typeof http;
  "lib/procedures": typeof lib_procedures;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {
  betterAuth: import("../betterAuth/_generated/component.js").ComponentApi<"betterAuth">;
};
