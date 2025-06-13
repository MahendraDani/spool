"use client";

import { useFoldersOfWorkspace } from "@/swr/use-folders";

export const WorkspacePageClient = ({
  activeWorkspaceSlug,
}: {
  activeWorkspaceSlug: string;
}) => {
  const { isLoading, data } = useFoldersOfWorkspace();
  return (
    <div>
      <p>{activeWorkspaceSlug}</p>
      {isLoading && <p>loading...</p>}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
