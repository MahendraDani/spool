"use client";
import { fetcher } from "@/lib/fetcher";
import { TFoldersOfWorkspace } from "@/lib/types";
import { useParams } from "next/navigation";
import useSWR from "swr";

export const useFoldersOfWorkspace = ()=>{
  const {slug} = useParams() as {
    slug : string;
  }

  console.log(slug)

  const {isLoading,mutate,error,data} = useSWR<TFoldersOfWorkspace>(slug && `/api/folders?slug=${slug}`,fetcher);
  return {
    isLoading,
    mutate,
    error,
    data
  }
}