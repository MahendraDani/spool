"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarCollapseTrigger } from "../sidebar-collapse-trigger";
import { Check, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "./separator";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { useWorkspaces } from "@/swr/use-workspaces";
import { usePathname } from "next/navigation";

export const WorkspaceDropdown = ({
  activeWorkspaceName,
  activeWorkspaceSlug,
}: {
  activeWorkspaceName: string;
  activeWorkspaceSlug: string;
}) => {
  const { isMobile } = useMediaQuery();
  const { data: workspaces, isLoading } = useWorkspaces();
  const pathname = usePathname();

  if(isLoading){
    return <div>loading</div>
  }

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <div className="w-full px-1 py-0.5 flex justify-between items-center gap-2 hover:bg-accent/60 cursor-pointer rounded-sm">
            <div className="flex justify-start items-center gap-2">
              <ChevronDown className="size-4" />
              <p className="line-clamp-1 text-sm font-medium">
                {activeWorkspaceName}
              </p>
            </div>
            <div className="group-hover:visible invisible">
              <SidebarCollapseTrigger />
            </div>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <div>
            <div className="p-3 flex justify-start items-start gap-2">
              <Avatar className="rounded-sm size-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{activeWorkspaceName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <DrawerTitle className="font-medium line-clamp-1">
                  {activeWorkspaceName}
                </DrawerTitle>
                <p className="text-muted-foreground">{activeWorkspaceSlug}</p>
              </div>
            </div>
          </div>
          <Separator className="w-full" />
          <div className="p-2 space-y-1">
            <p className="text-sm text-muted-foreground">Workspaces</p>
            {workspaces?.map((workspace, idx) => (
              <WorkspaceLink
                key={idx}
                href={workspace.slug}
                workspaceName={workspace.name}
                isActiveWorkspace={workspace.slug === activeWorkspaceSlug}
              />
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-full px-1 py-0.5 flex justify-between items-center gap-2 hover:bg-accent/60 cursor-pointer">
          <div className="flex justify-start items-center gap-2">
            <ChevronDown className="size-4" />
            <p className="line-clamp-1 text-sm font-medium">
              {activeWorkspaceName}
            </p>
          </div>
          <div className="group-hover:visible invisible">
            <SidebarCollapseTrigger />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="ml-2 p-0">
        <div>
          <div className="p-3 flex justify-start items-start gap-2">
            <Avatar className="rounded-sm size-10">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{activeWorkspaceName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <h2 className="font-medium line-clamp-1">
                {activeWorkspaceName}
              </h2>
              <p className="text-muted-foreground">{activeWorkspaceSlug}</p>
            </div>
          </div>
        </div>
        <Separator className="w-full" />
        <div className="p-2 space-y-1">
          <p className="text-sm text-muted-foreground">Workspaces</p>
          {workspaces?.map((workspace, idx) => (
            <WorkspaceLink
              key={idx}
              href={workspace.slug}
              workspaceName={workspace.name}
              isActiveWorkspace={pathname.includes(workspace.slug)}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const WorkspaceLink = ({
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
