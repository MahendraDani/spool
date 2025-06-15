"use client";
import { fetcher } from "@/lib/fetcher";
import { TSnippetsOfFolder } from "@/lib/types";
import useSWR from "swr";

// Fetch all snippets with a folder which is in a workspace

export const useSnippetsOfFolder = ({workspaceSlug,folderSlug} : {workspaceSlug : string, folderSlug : string})=>{
  const {data,mutate,isLoading,error} = useSWR<TSnippetsOfFolder>(workspaceSlug && folderSlug && `/api/snippets?slug=${workspaceSlug}&folderSlug=${folderSlug}`, fetcher);

  return {
    data,
    mutate,
    isLoading,
    error
  }
}