"use client";

import { useSnippetsOfFolder } from "@/swr/use-folder-snippets";
import { CollapsibleContent } from "./ui/collapsible";
import {
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "./ui/sidebar";

export const SidebarCollapsibleFolderMenu = ({
  activeWorkspaceSlug,
  folderSlug,
}: {
  activeWorkspaceSlug: string;
  folderSlug: string;
}) => {
  return (
    <CollapsibleContent>
      <SnippetList
        activeWorkspaceSlug={activeWorkspaceSlug}
        folderSlug={folderSlug}
      />
    </CollapsibleContent>
  );
};

const SnippetList = ({
  activeWorkspaceSlug,
  folderSlug,
}: {
  activeWorkspaceSlug: string;
  folderSlug: string;
}) => {
  const { isLoading, data, error } = useSnippetsOfFolder({
    workspaceSlug: activeWorkspaceSlug,
    folderSlug,
  });

  if (error) {
    throw new Error("Failed to fetch snippets of a folder");
  }

  if (isLoading) {
    return (
      <SidebarMenuSub className="space-y-1 my-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <SidebarMenuSubItem key={index}>
            <SidebarMenuSkeleton/>
          </SidebarMenuSubItem>
        ))}
      </SidebarMenuSub>
    );
  }
  return (
    <SidebarMenuSub>
      {!data ? (
        <p>No snippets found, create one</p>
      ) : (
        data.snippets.map((snippet, idx) => (
          <SidebarMenuSubItem key={idx}>
            <SidebarMenuSubButton>{snippet.name}</SidebarMenuSubButton>
          </SidebarMenuSubItem>
        ))
      )}
    </SidebarMenuSub>
  );
};
