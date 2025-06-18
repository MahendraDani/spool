"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExternalLinkIcon, MoreHorizontal, MoreVertical } from "lucide-react";
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
import { DeleteFolderResponsiveModal } from "./delete-folder-modal";
import { TFolderWithCount } from "@/lib/types";
import { useState } from "react";
import { EditFolderModal } from "./edit-folder-modal";
import Link from "next/link";
import { useParams } from "next/navigation";

export const FolderActionMenu = ({
  withinSidebar = false,
  folder,
}: {
  withinSidebar?: boolean;
  folder: TFolderWithCount;
}) => {
  const { isMobile } = useMediaQuery();
  const [showFolderActionMenu, setShowFolderActionMenu] = useState(false);
  const { slug } = useParams() as {
    slug: string;
  };

  if (isMobile) {
    return (
      <Drawer
        open={showFolderActionMenu}
        onOpenChange={setShowFolderActionMenu}
      >
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
          <div className="grid grid-cols-1 space-y-2 p-6 place-content-start">
            <Link href={`/${slug}/${folder.slug}`}>
              <Button variant={"secondary"} className="w-full">
                <ExternalLinkIcon />
                <span>View</span>
              </Button>
            </Link>
            <EditFolderModal
              folder={folder}
              setShowFolderActionMenu={setShowFolderActionMenu}
            />
            <DeleteFolderResponsiveModal
              folder={folder}
              setShowFolderActionMenu={setShowFolderActionMenu}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <DropdownMenu
      open={showFolderActionMenu}
      onOpenChange={setShowFolderActionMenu}
    >
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
        <Link href={`/${slug}/${folder.slug}`}>
          <DropdownMenuItem>
            <ExternalLinkIcon />
            <span>View</span>
          </DropdownMenuItem>
        </Link>
        <EditFolderModal
          folder={folder}
          setShowFolderActionMenu={setShowFolderActionMenu}
        />
        <DeleteFolderResponsiveModal
          folder={folder}
          setShowFolderActionMenu={setShowFolderActionMenu}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
