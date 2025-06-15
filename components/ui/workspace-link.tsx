"use client";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export const WorkspaceLink = ({
  href,
  workspaceName,
  isActiveWorkspace,
}: {
  href: string;
  isActiveWorkspace: boolean;
  workspaceName: string;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm p-1 flex justify-start items-center gap-2 relative",
        isActiveWorkspace ? "bg-accent" : "hover:bg-accent"
      )}
    >
      <Avatar className="rounded-sm size-5">
        <AvatarFallback className="rounded-sm">
          {workspaceName.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <p>{workspaceName}</p>
      {isActiveWorkspace && <Check className="size-4 absolute right-2" />}
    </Link>
  );
};
