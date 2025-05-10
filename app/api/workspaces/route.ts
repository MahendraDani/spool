import { SpoolAPIError } from "@/lib/api/error";
import { spoolAPIErrorHandler, spoolInternalAPIErrorHandler } from "@/lib/api/error-handler";
import { withSession } from "@/lib/api/with-session";
import { prisma } from "@/lib/prisma";
import { ZCreateWorkspaceSchema } from "@/lib/zod";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// POST /api/workspaces - create a new workspace
export const POST = async (req: NextRequest) => {
  return withSession(req, async ({ user }) => {
    try {
      const { name, description, slug } =
        await ZCreateWorkspaceSchema.parseAsync(await req.json());

      // check if workspace exists with the same slug
      // this really scans the all the rows in workspace table, which won't be really good for performance!
      // Trade-off : currently API is used internally, that means it will be called by me
      // so I will make sure to check if a workspace exists before calling this API. 
      // Hence commenting out for now!
      const slugAlreadyUsed = await prisma.workspace.findFirst({
        where : {
          slug,
        }
      })

      if(slugAlreadyUsed){
        throw new SpoolAPIError({
          status : "conflict",
          message : `The slug \"${slug}\" is already in use.`
        })
      }

      // create new workspace
      const workspace = await prisma.workspace.create({
        data: {
          ownerId: user.id,
          name,
          description,
          slug,
        },
      });
      return NextResponse.json({ data: workspace, message : "Workspace created successfully!" });
    } catch (err) {
      if (err instanceof ZodError) {
        console.error(err);
        return NextResponse.json({ error: err.flatten() });
      } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return NextResponse.json(
          { error: "database_error", details: err.message },
          { status: 500 }
        );
      }else if(err instanceof SpoolAPIError){
        return spoolAPIErrorHandler(req,err);
      }
      return spoolInternalAPIErrorHandler(req, err);
    }
  });
};
