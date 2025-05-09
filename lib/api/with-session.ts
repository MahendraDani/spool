import { } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../auth";
import {User, Session,} from "better-auth"

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
    const session = await auth.api.getSession({headers : req.headers});
    if(!session){
      throw new Error("no session")
    }
    return await handler({session : session.session, user : session.user});
  } catch (e) {
    console.error("Error in withSession:", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
