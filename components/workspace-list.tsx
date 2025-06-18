"use client";

import { useWorkspaces } from "@/swr/use-workspaces";
import { WorkspaceLink } from "./ui/workspace-link";
import { Skeleton } from "./ui/skeleton";
import { Plus } from "lucide-react";
import { ResponsiveModal } from "./responsive-modal";
import { Button } from "./ui/button";
import { AddWorkspaceForm } from "./workspace/add-workspace-form";

export const WorkspaceList = ({
  setShowWorkspaceDropdown,
  activeWorkspaceSlug,
}: {
  setShowWorkspaceDropdown: (open: boolean) => void;
  activeWorkspaceSlug: string;
}) => {
  const { data: workspaces, isLoading, error } = useWorkspaces();

  if (error) {
    throw new Error("Error fetching workspace list");
  }

  return (
    <div className="p-2 space-y-1">
      <div className="flex justify-between items-center gap-2">
        <p className="pl-1 text-sm text-muted-foreground">Workspaces</p>
        <ResponsiveModal>
          <ResponsiveModal.Trigger>
            <Button variant={"ghost"} className="size-6 p-1">
              <Plus className="size-4" />
            </Button>
          </ResponsiveModal.Trigger>
          <AddWorkspaceForm
            setShowWorkspaceDropdown={setShowWorkspaceDropdown}
          />
        </ResponsiveModal>
      </div>
      {isLoading || !workspaces
        ? Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton key={idx} className="h-5 w-full" />
          ))
        : workspaces.map((workspace, idx) => (
            <WorkspaceLink
              key={idx}
              href={`/${workspace.slug}`}
              workspaceName={workspace.name}
              isActiveWorkspace={activeWorkspaceSlug === workspace.slug}
            />
          ))}
      <ResponsiveModal>
        <ResponsiveModal.Trigger>
          <Button variant={"ghost"} className="text-sm w-full h-auto flex justify-start font-normal rounded-sm py-1 has-[>svg]:px-2">
            <Plus/>
            <span>New Workspace</span>
          </Button>
        </ResponsiveModal.Trigger>
        <AddWorkspaceForm setShowWorkspaceDropdown={setShowWorkspaceDropdown} />
      </ResponsiveModal>
    </div>
  );
};
