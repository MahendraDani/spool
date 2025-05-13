"use client";
import { fetcher } from "@/lib/fetcher";
import { TWorkspaceWithCount } from "@/lib/types";
import useSWR from "swr";

export const useWorkspace = ()=>{

  const { isLoading, error, data } = useSWR<TWorkspaceWithCount[]>("/api/workspaces", fetcher);
  
  // TODO : return the component that renders data directly from the hook to be reused throughout the app
  return {
    isLoading,
    error,
    data
  }
}