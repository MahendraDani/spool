import { SpoolAPIError } from "@/lib/api/error";
import { spoolAPIErrorHandler, spoolInternalAPIErrorHandler } from "@/lib/api/error-handler";
import { withFolder } from "@/lib/api/with-folder";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// GET /api/folders?slug=<workspace_slug>&folderSlug=<folder_slug>
export const GET = (req: NextRequest) => {
  return withFolder(req, async ({ folder, workspace }) => {
    try {
      const snippets = await prisma.snippet.findMany({
        where : {
          workspaceId : workspace.id,
          folderId : folder.id
        },
        orderBy : {
          updatedAt : "desc"
        },
      })

      if(!snippets){
        throw new SpoolAPIError({
          status : "not_found",
          message : "No snippets exists in requested folder."
        })
      }

      return NextResponse.json({
        snippets,
        message : "Snippets fetched successfully"
      })
    } catch (error) {
      console.error(error);
      if (error instanceof ZodError) {
        return NextResponse.json({ error: error.flatten() });
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return NextResponse.json(
          { error: "database_error", details: error.message },
          { status: 500 }
        );
      } else if (error instanceof SpoolAPIError) {
        return spoolAPIErrorHandler(req, error);
      }
      return spoolInternalAPIErrorHandler(req, error);
    }
  });
};
