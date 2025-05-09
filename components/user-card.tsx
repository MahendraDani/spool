"use client";
import { useUser } from "@/swr/use-user";

export const UserCard = () => {

  const {data,isLoading,error} = useUser();

  return (
    <div>
      {isLoading ? (
        <p>{"Fetching user details...."}</p>
      ) : (
        <pre>
          {error && JSON.stringify(error,null,2)}
          {data && JSON.stringify(data,null,2)}
        </pre>
      )}
    </div>
  );
};
