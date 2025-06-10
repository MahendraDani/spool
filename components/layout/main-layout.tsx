"use client";

import { ReactNode } from "react";
import { AppSidebar } from "../app-sidebar";
import { SidebarExpandTrigger } from "../sidebar-expand-trigger";
import { SidebarProvider } from "../ui/sidebar";
import { useWorkspace } from "@/swr/use-workspace";
import { notFound } from "next/navigation";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const { data, error, isLoading } = useWorkspace();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    notFound();
  }

  if (!data?.workspace) {
    notFound();
  }

  return (
    <SidebarProvider>
      <div>
        <AppSidebar workspace={data.workspace} />
      </div>
      <div>
        <div className="flex">
          <SidebarExpandTrigger />
          <p>nav options</p>
        </div>
        <main>{children}</main>
      </div>
    </SidebarProvider>
  );
};
