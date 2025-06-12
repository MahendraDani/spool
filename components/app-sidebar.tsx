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
import { TWorkspaceWithCountAndFolders } from "@/lib/types";
import Link from "next/link";
import { WorkspaceDropdown } from "./ui/workspace-dropdown";

export function AppSidebar({workspace} : {workspace : TWorkspaceWithCountAndFolders['workspace']}) {
  return (
    <Sidebar>
      <SidebarHeader className="group">
        <WorkspaceDropdown activeWorkspace={workspace}/>
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

