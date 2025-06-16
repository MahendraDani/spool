"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, MoreVertical } from "lucide-react";
import { SidebarMenuAction } from "../ui/sidebar";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { DeleteFolderResponsiveAlertDialog } from "./delete-folder-alert-dialog";

export const FolderActionMenu = ({
  withinSidebar = false,
}: {
  withinSidebar?: boolean;
}) => {
  const { isMobile } = useMediaQuery();

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          {withinSidebar ? (
            <SidebarMenuAction className="cursor-pointer">
              <MoreHorizontal className="group-hover/menu-item:block md:hidden" />
            </SidebarMenuAction>
          ) : (
            <Button variant={"ghost"} className="size-6 p-1">
              <MoreVertical className="size-4" />
            </Button>
          )}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Folder Actions</DrawerTitle>
          </DrawerHeader>
          <div className="grid grid-cols-1 space-y-2 p-2">
            <Button variant={"secondary"}>Open</Button>
            <Button variant={"secondary"}>Edit</Button>
            <Button variant={"secondary"}>Delete</Button>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {withinSidebar ? (
          <SidebarMenuAction className="cursor-pointer">
            <MoreHorizontal className="group-hover/menu-item:block hidden" />
          </SidebarMenuAction>
        ) : (
          <Button variant={"ghost"} className=" size-6 p-1">
            <MoreVertical className="size-4" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start">
        <DropdownMenuItem>
          <span>Open</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Edit</span>
        </DropdownMenuItem>
        <DeleteFolderResponsiveAlertDialog />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
