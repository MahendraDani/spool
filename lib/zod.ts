import slugify from "@sindresorhus/slugify";
import { z } from "zod";

const validSlugRegex = new RegExp(/^[a-zA-Z0-9\-]+$/);

/*
Valid : 
myfile.txt
report_final2025.csv
backup-01.tar.gz

Invalid :
my file.txt
data\n.txt
notes\tfinal.md
*/
export const isValidFilename = /^[^<>:"/\\|?*\x00-\x1F\s]+$/;

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

/*
Validates a string against specific naming rules
 * Rules:
 * 1. Must not begin with '.'
 * 2. Must not end with '.'
 * 3. Must not include special characters like !@#$%^&*, but can include '.'
 * 4. Must not include two dots '..' side by side
 * 5. Allow spaces and hyphens between characters
*/
const FOLDER_NAME_REGEX =
  /^[a-zA-Z0-9\s-](?:[a-zA-Z0-9\s.-](?!\.))*[a-zA-Z0-9\s-]$|^[a-zA-Z0-9\s-]$/;

export const ZCreateFolderSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be less than 50 characters" })
    .refine((val) => FOLDER_NAME_REGEX.test(val), {
      message:
        'Folder name can not contain characters like < > : " / \\ | ? * and should not start or end with a dot or space. Spaces are allowed',
    }),
  description: z.string().optional()
});

export const ZSlugSchema = z.object({
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
