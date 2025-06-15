"use client";
import {
  ChevronDown,
  ChevronRight,
  FolderClosed,
  FolderOpen,
  Plus,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { TWorkspaceWithCountAndFolders } from "@/lib/types";
import { WorkspaceDropdown } from "./ui/workspace-dropdown";
import { Collapsible, CollapsibleTrigger } from "./ui/collapsible";
import { SidebarCollapsibleFolderMenu } from "./sidebar-collapsible-folder-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SidebarFolderGroupAction } from "./ui/sidebar-folder-group-action";
import { useMediaQuery } from "@/hooks/use-media-query";

export function AppSidebar({
  workspace,
}: {
  workspace: TWorkspaceWithCountAndFolders["workspace"];
}) {
  const { isDesktop } = useMediaQuery();
  return (
    <Sidebar variant="floating">
      <SidebarHeader className="group">
        <WorkspaceDropdown activeWorkspace={workspace} />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <Tooltip>
            <SidebarGroupLabel>Folders</SidebarGroupLabel>
            <TooltipTrigger asChild>
              <SidebarGroupAction
                title="Add folder"
                className="cursor-pointer text-muted-foreground"
              >
                <Plus /> <span className="sr-only">Add folderf</span>
              </SidebarGroupAction>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add folder</p>
            </TooltipContent>
          </Tooltip>
          <SidebarGroupContent>
            {workspace.folders.map((folder, idx) => (
              <SidebarMenu key={idx}>
                <Collapsible className="group/collapsible">
                  <SidebarMenuItem className="group/menu-item">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="cursor-pointer">
                        <FolderClosed className="group-data-[state=open]/collapsible:hidden group-hover/menu-item:hidden block" />
                        <FolderOpen className="group-hover/menu-item:group-data-[state=open]/collapsible:hidden group-data-[state=open]/collapsible:block hidden" />

                        <ChevronRight className="group-hover/menu-item:block group-data-[state=open]/collapsible:hidden hidden" />
                        <ChevronDown className="group-hover/menu-item:block group-data-[state=closed]/collapsible:hidden hidden" />
                        {folder.name}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <SidebarCollapsibleFolderMenu
                      activeWorkspaceSlug={workspace.slug}
                      folderSlug={folder.slug}
                    />
                    {isDesktop && (
                      <SidebarMenuBadge className="group-hover/menu-item:hidden flex">
                        {folder._count.snippets}
                      </SidebarMenuBadge>
                    )}
                    <SidebarFolderGroupAction />
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
            ))}
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-muted-foreground">
                  <Plus />
                  <span>New folder</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
