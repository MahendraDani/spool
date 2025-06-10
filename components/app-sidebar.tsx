"use client";
import {
  FolderClosed,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { SidebarCollapseTrigger } from "./sidebar-collapse-trigger";
import { TWorkspaceWithCountAndFolders } from "@/lib/types";
import Link from "next/link";

export function AppSidebar({workspace} : {workspace : TWorkspaceWithCountAndFolders['workspace']}) {
  return (
    <Sidebar>
      <SidebarHeader className="group flex flex-row justify-between items-center">
        <span>{workspace.name}</span>
        <div className="group-hover:visible invisible">
          <SidebarCollapseTrigger />
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {workspace.folders.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link href={`/${workspace.slug}/${item.slug}`}>
                      <FolderClosed />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

