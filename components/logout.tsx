"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const LogoutButton = () => {
  const router = useRouter();

  async function onSubmit() {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message);
      return;
    }

    router.push("/");
  }
  return (
    <form onSubmit={onSubmit}>
      <Button size={"sm"} type="submit">
        Log out
      </Button>
    </form>
  );
};
