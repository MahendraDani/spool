import { SpoolAPIError } from "@/lib/api/error";
import {
  spoolAPIErrorHandler,
  spoolInternalAPIErrorHandler,
} from "@/lib/api/error-handler";
import { withSession } from "@/lib/api/with-session";
import { prisma } from "@/lib/prisma";
import { ZSlugSchema } from "@/lib/zod";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// GET /api/workspaces/:slug  - Get details of workspace using its slug
// returns all folders and all snips in each folder

export const GET = async (
  req: NextRequest,
  props: { params: Promise<{ slug: string }> }
) => {
  return withSession(req, async ({ user }) => {
    try {
      const params = await props.params;

      const { slug } = await ZSlugSchema.parseAsync({
        slug: params.slug,
      });

      const workspace = await prisma.workspace.findUnique({
        where: {
          slug,
          ownerId: user.id,
        },
        include: {
          // TODO : use pagination here
          folders : {
            include : {
              _count : true
            },
            orderBy : {
              updatedAt : "desc"
            }
          },
          _count : true,
        },
      });

      if (!workspace) {
        throw new SpoolAPIError({
          status: "not_found",
          message: "Workspace with provided slug not found.",
        });
      }
      return NextResponse.json({
        workspace,
        message: "Workspace fetched successfully",
      });
    } catch (err) {
      if (err instanceof ZodError) {
        console.error(err);
        return NextResponse.json({ error: err.flatten() });
      } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return NextResponse.json(
          { error: "database_error", details: err.message },
          { status: 500 }
        );
      } else if (err instanceof SpoolAPIError) {
        return spoolAPIErrorHandler(req, err);
      }
      return spoolInternalAPIErrorHandler(req, err);
    }
  });
};

// DELETE /api/workspaces/<slug> delete workspace using its slug
// This will delete all the folders and snippets associated in the workspace
export const DELETE = async (
  req: NextRequest,
  props: { params: Promise<{ slug: string }> }
) => {
  return withSession(req, async ({ user }) => {
    try {
      const params = await props.params;

      const { slug } = await ZSlugSchema.parseAsync({
        slug: params.slug,
      });

      // Prisma will delete associated folders and snips automatically due to onCascade constraint
      await prisma.workspace.delete({
        where: {
          slug,
          ownerId: user.id,
        },
      });
      return NextResponse.json({
        data: null,
        message: "Workspace deleted successfully",
      });
    } catch (err) {
      if (err instanceof ZodError) {
        console.error(err);
        return NextResponse.json({ error: err.flatten() });
      } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return NextResponse.json(
          { error: "database_error", details: err.message },
          { status: 500 }
        );
      } else if (err instanceof SpoolAPIError) {
        return spoolAPIErrorHandler(req, err);
      }
      return spoolInternalAPIErrorHandler(req, err);
    }
  });
};
