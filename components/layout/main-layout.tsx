"use client";

import { ReactNode } from "react";
import { AppSidebar } from "../app-sidebar";
import { SidebarProvider } from "../ui/sidebar";
import { useWorkspace } from "@/swr/use-workspace";
import { notFound } from "next/navigation";
import { MainNavbar } from "./main-navbar";
import { useMediaQuery } from "@/hooks/use-media-query";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const { data, error, isLoading } = useWorkspace();
  const {isDesktop} = useMediaQuery();

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
    <SidebarProvider defaultOpen={isDesktop}>
      <div>
        <AppSidebar workspace={data.workspace} />
      </div>
      <div className="w-full">
        <div className="p-2">
          <MainNavbar />
        </div>
        <main className="p-1">{children}</main>
      </div>
    </SidebarProvider>
  );
};
