"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { SidebarMenuAction } from "./sidebar";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./button";

export const SidebarFolderGroupAction = () => {
  const { isMobile } = useMediaQuery();

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <SidebarMenuAction className="cursor-pointer">
            <MoreHorizontal className="group-hover/menu-item:block md:hidden" />
          </SidebarMenuAction>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Folder Actions</DrawerTitle>
          </DrawerHeader>
          <div className="grid grid-cols-1 space-y-2 p-2">
            <Button variant={"outline"}>Open</Button>
            <Button variant={"outline"}>Edit</Button>
            <Button variant={"outline"}>Delete</Button>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuAction className="cursor-pointer">
          <MoreHorizontal className="group-hover/menu-item:block hidden" />
        </SidebarMenuAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start">
        <DropdownMenuItem>
          <span>Open</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
