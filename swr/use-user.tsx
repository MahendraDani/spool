"use client";
import useSWR from "swr";

export const useUser = ()=>{

  const { isLoading, error, data } = useSWR("/api/me", (...args) =>
    fetch(...args).then((res) => res.json())
  );
  
  // TODO : return the component that renders data directly from the hook to be reused throughout the app
  return {
    isLoading,
    error,
    data
  }
}