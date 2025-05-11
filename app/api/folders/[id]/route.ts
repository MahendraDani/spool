import { SpoolAPIError } from "@/lib/api/error";
import {
  spoolAPIErrorHandler,
  spoolInternalAPIErrorHandler,
} from "@/lib/api/error-handler";
import { withWorkspace } from "@/lib/api/with-workspace";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// GET /api/folders/:id?slug=<workspace-slug> - get details of a folder of a workspace
export const GET = async (
  req: NextRequest,
  props: {
    params: Promise<{ id: string }>;
  }
) => {
  return withWorkspace(req, async ({ user, workspace }) => {
    try {
      const params = await props.params;
      const id = params.id;
      const folder = await prisma.folder.findUnique({
        where: {
          id,
          ownerId: user.id,
          workspaceId: workspace.id,
        },
        include : {
          _count : true
        }
      });

      if (!folder) {
        throw new SpoolAPIError({
          status: "not_found",
          message: "The requested folder not found",
        });
      }

      return NextResponse.json({
        data: folder,
        message: "Folder found successfully",
      });
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
