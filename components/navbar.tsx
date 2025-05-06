"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { LogoutButton } from "@/components/logout";

export const Navbar = () => {
  const { data } = authClient.useSession();

  return (
    <div className="p-4 px-12 flex justify-between items-center">
      <p>Spool</p>
      {!data?.user ? (
        <div className="flex justify-between items-center gap-4">
          <Button size={"sm"} variant={"ghost"}>
            Login
          </Button>
          <Button size={"sm"}>Sign up</Button>
        </div>
      ) : (
        <LogoutButton/>
      )}
    </div>
  );
};
