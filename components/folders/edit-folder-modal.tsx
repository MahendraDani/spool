import { TFolderWithCount } from "@/lib/types";
import {
  ResponsiveModal,
  useResponsiveModalContext,
} from "../responsive-modal";
import { Button } from "../ui/button";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useMediaQuery } from "@/hooks/use-media-query";
import { EditFolderModalForm } from "./edit-folder-form";
import { PencilIcon } from "lucide-react";

export const EditFolderModal = ({
  folder,
  setShowFolderActionMenu,
}: {
  setShowFolderActionMenu: (showFolderActionMenu: boolean) => void;
  folder: TFolderWithCount;
}) => {
  return (
    <ResponsiveModal>
      <EditFolderModalTrigger />
      <ResponsiveModal.Content className="p-0 md:w-md">
        <ResponsiveModal.Header className="bg-accent p-4 rounded-tr-md rounded-tl-md">
          <ResponsiveModal.Title>Edit Folder</ResponsiveModal.Title>
          <ResponsiveModal.Description>
            Folders can be utilized to organize and manage related snippets.
            Update the details of the folder.
          </ResponsiveModal.Description>
        </ResponsiveModal.Header>
        <EditFolderModalForm
          folder={folder}
          setShowFolderActionMenu={setShowFolderActionMenu}
        />
      </ResponsiveModal.Content>
    </ResponsiveModal>
  );
};

const EditFolderModalTrigger = () => {
  const { setShowResponsiveModal } = useResponsiveModalContext();
  const { isMobile } = useMediaQuery();

  if (isMobile) {
    return (
      <Button
        variant={"secondary"}
        onClick={() => {
          setShowResponsiveModal(true);
        }}
      >
        <PencilIcon />
        <span>Edit</span>
      </Button>
    );
  }
  return (
    <DropdownMenuItem
      onSelect={(e) => {
        setShowResponsiveModal(true);
        e.preventDefault();
      }}
    >
      <PencilIcon />
      <span>Edit</span>
    </DropdownMenuItem>
  );
};
