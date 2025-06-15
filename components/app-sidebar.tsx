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
import { AddFolderModalForm } from "./folders/add-folder-form";
import { ResponsiveModal } from "./responsive-modal";
import { cn } from "@/lib/utils";

export function AppSidebar({
  workspace,
}: {
  workspace: TWorkspaceWithCountAndFolders["workspace"];
}) {
  const { isDesktop, isMobile } = useMediaQuery();
  return (
    <Sidebar variant="floating">
      <SidebarHeader className="group">
        <WorkspaceDropdown activeWorkspace={workspace} />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Folders</SidebarGroupLabel>
          <ResponsiveModal>
            <Tooltip>
              <ResponsiveModal.Trigger>
                <SidebarGroupAction
                  title="Add folder"
                  className="cursor-pointer text-muted-foreground"
                >
                  <TooltipTrigger asChild>
                    <div>
                      <Plus className="size-4" />
                    </div>
                  </TooltipTrigger>
                </SidebarGroupAction>
              </ResponsiveModal.Trigger>
              <TooltipContent>
                <p>Add folder</p>
              </TooltipContent>
            </Tooltip>
            <ResponsiveModal.Content className={cn(!isMobile && "p-0 w-md")}>
              <ResponsiveModal.Header
                className={cn(
                  isMobile
                    ? "px-4"
                    : "bg-secondary p-6 rounded-tr-sm rounded-tl-sm"
                )}
              >
                <ResponsiveModal.Title>Create new folder</ResponsiveModal.Title>
                <ResponsiveModal.Description>
                  Folders can be utilized to organize and manage related
                  snippets, facilitating easier access and administration.
                </ResponsiveModal.Description>
              </ResponsiveModal.Header>
              <AddFolderModalForm />
            </ResponsiveModal.Content>
          </ResponsiveModal>
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
                <ResponsiveModal>
                  <ResponsiveModal.Trigger>
                    <SidebarMenuButton className="text-muted-foreground">
                      <Plus />
                      <span>New folder</span>
                    </SidebarMenuButton>
                  </ResponsiveModal.Trigger>
                  <ResponsiveModal.Content
                    className={cn(!isMobile && "p-0 w-md")}
                  >
                    <ResponsiveModal.Header
                      className={cn(
                        isMobile
                          ? "px-4"
                          : "bg-secondary p-6 rounded-tr-sm rounded-tl-sm"
                      )}
                    >
                      <ResponsiveModal.Title>
                        Create new folder
                      </ResponsiveModal.Title>
                      <ResponsiveModal.Description>
                        Folders can be utilized to organize and manage related
                        snippets, facilitating easier access and administration.
                      </ResponsiveModal.Description>
                    </ResponsiveModal.Header>
                    <AddFolderModalForm />
                  </ResponsiveModal.Content>
                </ResponsiveModal>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
