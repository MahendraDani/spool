import { AppSidebar } from "@/components/app-sidebar";
import { SessionProvider } from "@/components/providers/session-provider";
import { SidebarExpandTrigger } from "@/components/sidebar-expand-trigger";
import { SidebarProvider } from "@/components/ui/sidebar";
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
      <SidebarProvider>
        <AppSidebar />
        <main className="py-2">
          <SidebarExpandTrigger/>
          {children}
        </main>
      </SidebarProvider>
    </SessionProvider>
  );
}
