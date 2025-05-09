import { } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../auth";
import {User, Session,} from "better-auth"
import { SpoolAPIError } from "./error";
import { spoolAPIErrorHandler, spoolInternalAPIErrorHandler } from "./error-handler";

type TSessionRouteHandler = ({
  user,
  session,
}: {
  user: User;
  session: Session;
}) => Promise<NextResponse>;

export const withSession = async (
  req: NextRequest,
  handler: TSessionRouteHandler
): Promise<NextResponse> => {
  try {
    if(!req.headers.get("Cookie")){
      throw new SpoolAPIError({
        status : "bad_request",
        message : "Missing authorization header. Please add auth token in Cookie header."
      })
    }
    const session = await auth.api.getSession({headers : req.headers});
    if(!session){
      throw new SpoolAPIError({
        status : "unauthorized",
        message : "Invalid or incorrect auth token in request header."
      })
    }
    return await handler({session : session.session, user : session.user});
  } catch (error) {
    if(error instanceof SpoolAPIError){
      return spoolAPIErrorHandler(req,error);
    }
    return spoolInternalAPIErrorHandler(req,error);
  }
};
