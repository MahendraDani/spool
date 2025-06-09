"use client";

import { WorkspaceCard } from "@/components/workspace-card";
import { useWorkspace } from "@/swr/use-workspace";

export const WorkspacePageClient = () => {
  // fetch all workspaces of current user
  // map each workspace with WorkspaceCard component

  // TODO : find a way to type SWR hooks
  const { data: workspaces, error, isLoading } = useWorkspace();

  return (
    <div className="container p-4">
      <div>Workspace page client</div>
      {isLoading && <p>Fetching data</p>}
      {error && <p>Error fetching data</p>}
      {/* <pre>{JSON.stringify(workspaces, null, 2)}</pre> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workspaces &&
          workspaces.map((workspace, idx) => (
            <WorkspaceCard key={idx} workspace={workspace} />
          ))}
      </div>
    </div>
  );
};
