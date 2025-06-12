"use client";

import { useWorkspaces } from "@/swr/use-workspaces";
import { WorkspaceLink } from "./ui/workspace-link";
import { Skeleton } from "./ui/skeleton";

export const WorkspaceList = ({
  activeWorkspaceSlug,
}: {
  activeWorkspaceSlug: string;
}) => {
  const { data: workspaces, isLoading, error } = useWorkspaces();

  if(error){
    throw new Error("Error fetching workspace list")
  }

  return (
    <div className="p-2 space-y-1">
      <p className="text-sm text-muted-foreground">Workspaces</p>
      {isLoading || !workspaces ? (
        Array.from({length : 5}).map((_,idx)=>(
          <Skeleton key={idx} className="h-5 w-full" />
        ))
      ) : (
        workspaces.map((workspace, idx) => (
          <WorkspaceLink
            key={idx}
            href={workspace.slug}
            workspaceName={workspace.name}
            isActiveWorkspace={activeWorkspaceSlug === workspace.slug}
          />
        ))
      )}
    </div>
  );
};
