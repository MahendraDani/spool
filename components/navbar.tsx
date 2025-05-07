"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { LogoutButton } from "@/components/logout";
import Link from "next/link";
import { ThemeToggleButton } from "./theme-toggle";

export const Navbar = () => {
  const { data } = authClient.useSession();

  // TODO : fix hydration error when user signs
  const isLoggedIn = data?.user ? true : false

  return (
    <div className="border-grid">
      <div className="container-wrapper">
        <div className="container py-3 flex justify-between items-center">
          <Link href="/">Spool</Link>

          <div className="flex justify-between items-center gap-4">
            <ThemeToggleButton />

            {!isLoggedIn && (
              <>
                <Link href="/login">
                  <Button size="sm" variant="outline">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Sign up</Button>
                </Link>
              </>
            )}

            {isLoggedIn && (
              <LogoutButton />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
