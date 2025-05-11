/* onboard page with the following purpose:
1. users will land here after verifying their email address upon signing up with credentials
2. a default workspace and default folder will be created for the user
3. progress states for the above actions will be shown here
4. upon creation of these resources, user should be redirected to /<username>/<workspace-slug>/<folder-slug>

Validations:
1. unauthenticated users should be redirected to `/login`
2. authenticated users which don't have any workspace should only be allowed to be here!
3. authenticated users with greater than or equal to 1 workspaces should be redirected to /<username>
*/

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { CreateDefaultWorkspace } from "./default-workspace";
import { Navbar } from "@/components/navbar";

// type TSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    // unauthenticated users not allowed
    redirect("/");
  }

  const workspaceCount = await prisma.workspace.count({
    where: {
      ownerId: session.user.id,
    },
  });

  if (workspaceCount > 0) {
    // if not first time user
    redirect(`/${session.user.username}`);
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return notFound();
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div>Email verified</div>
        <CreateDefaultWorkspace session={session.session} user={user} />
      </div>
    </div>
  );
}
