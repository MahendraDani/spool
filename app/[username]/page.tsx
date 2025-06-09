import { SpoolAPIError } from "@/lib/api/error";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { WorkspacePageClient } from "./page-client";

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  if (session.user.username != username) {
    // unauthorized
    throw new SpoolAPIError({
      status: "unauthorized",
      message: "Access to requested resource is denied",
    });
  }

  // TODO : show user's workspaces here
  return (
    <div>
      <WorkspacePageClient />
    </div>
  );
}
