"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ReactNode } from "react";

const AddFolderModalTrigger = ({ children }: { children: ReactNode }) => {
  const { isMobile } = useMediaQuery();
  if (isMobile) {
    return <DrawerTrigger asChild>{children}</DrawerTrigger>;
  }
  return <DialogTrigger asChild>{children}</DialogTrigger>;
};

export const AddFolderModal = ({ children }: { children: ReactNode }) => {
  const { isMobile } = useMediaQuery();
  if (isMobile) {
    return <Drawer>{children}</Drawer>;
  }

  return <Dialog>{children}</Dialog>;
};

const AddFolderModalContent = () => {
  const { isMobile } = useMediaQuery();

  if (isMobile) {
    return (
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    );
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
};

AddFolderModal.Content = AddFolderModalContent;
AddFolderModal.Trigger = AddFolderModalTrigger;
