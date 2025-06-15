"use client";
import { fetcher } from "@/lib/fetcher";
import { TWorkspaceWithCountAndFolders } from "@/lib/types";
import { useParams } from "next/navigation";
import useSWR from "swr";

export const useWorkspace = () => {
  const { slug } = useParams() as {
    slug: string;
  };
  const { isLoading, error, data } =
    useSWR<TWorkspaceWithCountAndFolders>(
      slug && `/api/workspaces/${slug}`,
      fetcher
    );

  return {
    isLoading,
    error,
    data,
  };
};
