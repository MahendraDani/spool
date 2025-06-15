import { Folder, Prisma, Workspace } from "@prisma/client";
import { User, Session } from "better-auth";
import { NextRequest, NextResponse } from "next/server";
import { SpoolAPIError } from "./error";
import { auth } from "../auth";
import {
  spoolAPIErrorHandler,
  spoolInternalAPIErrorHandler,
} from "./error-handler";
import { prisma } from "../prisma";

type TFolderRouteHandler = ({
  user,
  session,
  workspace,
}: {
  user: User;
  session: Session;
  workspace: Workspace;
  folder: Folder;
}) => Promise<NextResponse>;

export const withFolder = async (
  req: NextRequest,
  handler: TFolderRouteHandler
) => {
  try {
    if (!req.headers.get("Cookie")) {
      throw new SpoolAPIError({
        status: "bad_request",
        message:
          "Missing authorization header. Please add auth token in Cookie header.",
      });
    }
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) {
      throw new SpoolAPIError({
        status: "unauthorized",
        message: "Invalid or incorrect auth token in request header.",
      });
    }

    // const workspaceSlug = req.url
    const workspaceSlug = req.nextUrl.searchParams.get("slug");
    if (!workspaceSlug) {
      throw new SpoolAPIError({
        status: "bad_request",
        message:
          "Missing workspace slug. Please add workspace slug in search params",
      });
    }

    const workspace = await prisma.workspace.findUnique({
      where: {
        slug: workspaceSlug,
        ownerId: session.user.id,
      },
    });

    if (!workspace) {
      throw new SpoolAPIError({
        status: "not_found",
        message: "Workspace associated with provided slug not found",
      });
    }

    if (workspace.ownerId != session.user.id) {
      throw new SpoolAPIError({
        status: "forbidden",
        message: "The permission to access requested workspace is denied",
      });
    }

    const folderSlug = req.nextUrl.searchParams.get("folderSlug");
    if (!folderSlug) {
      throw new SpoolAPIError({
        status: "bad_request",
        message: "Missing folder slug. Please add folderSlug in search params",
      });
    }

    const folder = await prisma.folder.findFirst({
      where: {
        workspaceId: workspace.id,
        slug: folderSlug,
        ownerId: session.user.id,
      },
    });

    if (!folder) {
      throw new SpoolAPIError({
        status: "not_found",
        message: `The requested folder with slug ${folderSlug} could not be found`,
      });
    }

    return await handler({
      user: session.user,
      session: session.session,
      workspace,
      folder,
    });
  } catch (error) {
    if (error instanceof SpoolAPIError) {
      return spoolAPIErrorHandler(req, error);
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "database_error", details: error.message },
        { status: 500 }
      );
    }
    return spoolInternalAPIErrorHandler(req, error);
  }
};
