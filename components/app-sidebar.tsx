"use client";
import { FolderClosed, FolderOpen } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { TWorkspaceWithCountAndFolders } from "@/lib/types";
import { WorkspaceDropdown } from "./ui/workspace-dropdown";
import { Collapsible, CollapsibleTrigger } from "./ui/collapsible";
import { SidebarCollapsibleFolderMenu } from "./sidebar-collapsible-folder-menu";

export function AppSidebar({
  workspace,
}: {
  workspace: TWorkspaceWithCountAndFolders["workspace"];
}) {
  return (
    <Sidebar variant="floating">
      <SidebarHeader className="group">
        <WorkspaceDropdown activeWorkspace={workspace} />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Folders</SidebarGroupLabel>
          <SidebarGroupContent>
            {workspace.folders.map((folder, idx) => (
              <SidebarMenu key={idx}>
                <Collapsible className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="cursor-pointer">
                        <FolderClosed className="group-data-[state=open]/collapsible:hidden block" />
                        <FolderOpen className="group-data-[state=open]/collapsible:block hidden" />
                        {folder.name}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <SidebarCollapsibleFolderMenu
                      activeWorkspaceSlug={workspace.slug}
                      folderSlug={folder.slug}
                    />
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
