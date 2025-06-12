"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarCollapseTrigger } from "../sidebar-collapse-trigger";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "./separator";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { WorkspaceList } from "../workspace-list";
import { TWorkspaceWithCountAndFolders } from "@/lib/types";

export const WorkspaceDropdown = ({
  activeWorkspace,
}: {
  activeWorkspace: TWorkspaceWithCountAndFolders["workspace"];
}) => {
  const { isMobile } = useMediaQuery();

  if (isMobile) {
    return (
      <Drawer>
        <div className="flex px-1 py-0.5 hover:bg-accent/60 cursor-pointer rounded-sm">
          <DrawerTrigger asChild>
            <div className="w-full flex justify-between items-center gap-2 relative">
              <div className="flex justify-start items-center gap-2">
                <ChevronDown className="size-4" />
                <p className="line-clamp-1 font-medium">
                  {activeWorkspace.name}
                </p>
              </div>
            </div>
          </DrawerTrigger>
          <div className="group-hover:visible invisible">
            <SidebarCollapseTrigger />
          </div>
        </div>
        <DrawerContent>
          <div>
            <div className="p-3 flex justify-start items-start gap-2">
              <Avatar className="rounded-sm size-10">
                {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                <AvatarFallback className="rounded-sm">
                  {activeWorkspace.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <DrawerTitle className="font-medium line-clamp-1">
                  {activeWorkspace.name}
                </DrawerTitle>
                <div className="text-sm flex justify-start items-center gap-2">
                  <p className="text-muted-foreground">{`Folders: ${activeWorkspace._count.folders}`}</p>
                  <p className="text-muted-foreground">{`Snippets: ${activeWorkspace._count.snippets}`}</p>
                </div>
              </div>
            </div>
          </div>
          <Separator className="w-full" />
          <WorkspaceList activeWorkspaceSlug={activeWorkspace.slug} />
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Popover>
      <div className="flex px-1 py-0.5 hover:bg-accent/60 cursor-pointer rounded-sm">
        <PopoverTrigger asChild>
          <div className="w-full flex justify-between items-center gap-2 relative">
            <div className="flex justify-start items-center gap-2">
              <ChevronDown className="size-4" />
              <p className="line-clamp-1 font-medium">
                {activeWorkspace.name}
              </p>
            </div>
          </div>
        </PopoverTrigger>
        <div className="group-hover:visible invisible">
          <SidebarCollapseTrigger />
        </div>
      </div>
      <PopoverContent className="ml-2 p-0">
        <div>
          <div className="p-3 flex justify-start items-start gap-2">
            <Avatar className="rounded-sm size-10">
              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              <AvatarFallback className="rounded-sm">
                {activeWorkspace.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-medium line-clamp-1">
                {activeWorkspace.name}
              </h2>
              <div className="text-sm flex justify-start items-center gap-2">
                <p className="text-muted-foreground">{`Folders: ${activeWorkspace._count.folders}`}</p>
                <p className="text-muted-foreground">{`Snippets: ${activeWorkspace._count.snippets}`}</p>
              </div>
            </div>
          </div>
        </div>
        <Separator className="w-full" />
        <WorkspaceList activeWorkspaceSlug={activeWorkspace.slug} />
      </PopoverContent>
    </Popover>
  );
};
