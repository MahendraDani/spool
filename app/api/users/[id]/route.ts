import { withSession } from "@/lib/api/with-session";
import { NextRequest } from "next/server";
import { SpoolAPIError } from "@/lib/api/error";
import {
  spoolAPIErrorHandler,
  spoolInternalAPIErrorHandler,
} from "@/lib/api/error-handler";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";

// GET get an user by Id
export const GET = (req: NextRequest) => {
  return withSession(req, async () => {
    try {
      const userId = req.nextUrl.pathname.split("users/")[1];
      console.log(userId);
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new SpoolAPIError({
          status: "not_found",
          message: "User with requester id not found",
        });
      }
      return NextResponse.json({
        data: user,
        message: "User details fetched successfully",
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
