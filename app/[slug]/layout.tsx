import { MainLayout } from "@/components/layout/main-layout";
import { SessionProvider } from "@/components/providers/session-provider";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function WorkspaceLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }
  return (
    <SessionProvider
      data={{ session: session.session, loginUser: session.user }}
    >
      <MainLayout>{children}</MainLayout>
    </SessionProvider>
  );
}
