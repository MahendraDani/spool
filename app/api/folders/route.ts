import { SpoolAPIError } from "@/lib/api/error";
import {
  spoolAPIErrorHandler,
  spoolInternalAPIErrorHandler,
} from "@/lib/api/error-handler";
import { withWorkspace } from "@/lib/api/with-workspace";
import { prisma } from "@/lib/prisma";
import { ZCreateFolderSchema } from "@/lib/zod";
import { Prisma } from "@prisma/client";
import slugify from "@sindresorhus/slugify";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// /api/folders/?slug=<workspace-slug>
export const POST = (req: NextRequest) => {
  return withWorkspace(req, async ({ user, workspace }) => {
    try {
      const { name, description } = await ZCreateFolderSchema.parseAsync(
        await req.json()
      );
       
      const nameAlreadyUsed = await prisma.folder.findFirst({
        where : {
          name,
          workspaceId : workspace.id,
          ownerId : user.id
        }
      })
      if(nameAlreadyUsed){
        throw new SpoolAPIError({
          status : "conflict",
          message : "A folder with same name already exists in the workspace"
        })
      }
      const folder = await prisma.folder.create({
        data: {
          name,
          slug: slugify(name),
          description,
          ownerId: user.id,
          workspaceId: workspace.id,
        },
      });

      return NextResponse.json(
        {
          data: folder,
          message: "Folder created successfully",
        },
        {
          status: 201,
        }
      );
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
