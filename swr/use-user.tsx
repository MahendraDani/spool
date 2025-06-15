"use client";
import { fetcher } from "@/lib/fetcher";
import { Prisma } from "@prisma/client";
import useSWR from "swr";

export const useMe = () => {
  const { isLoading, error, data } = useSWR("/api/me", fetcher);

  // TODO : return the component that renders data directly from the hook to be reused throughout the app
  return {
    isLoading,
    error,
    data,
  };
};

export const useUser = ({ userId }: { userId: string }) => {
  const { isLoading, mutate, error, data } = useSWR<{
    data: Prisma.UserGetPayload<true>;
    message: string;
  }>(`/api/users/${userId}`, fetcher);
  return {
    isLoading,
    error,
    data,
    mutate,
  };
};
