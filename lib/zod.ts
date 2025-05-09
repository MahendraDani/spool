import slugify from "@sindresorhus/slugify";
import { z } from "zod";

const validSlugRegex = new RegExp(/^[a-zA-Z0-9\-]+$/);

export const ZCreateWorkspaceSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(30, { message: "Name should be less than 30 characters" }),
  description: z.string().optional(),
  slug: z
    .string()
    .min(5, { message: "Slug must be at least 3 characters" })
    .max(48, { message: "Slug must be less than 48 characters" })
    .transform((v) => slugify(v))
    .refine((v) => validSlugRegex.test(v), {
      message:
        "Slugs can only contain letters, numbers, and hyphens. No spaces or special characters are allowed",
    }),
});
