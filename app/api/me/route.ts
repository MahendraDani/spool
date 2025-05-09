import { withSession } from "@/lib/api/with-session";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  return await withSession(req, async ({user}) => {
    return NextResponse.json({user});
  });
};
