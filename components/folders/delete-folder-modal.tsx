import { useMediaQuery } from "@/hooks/use-media-query";
import {
  ResponsiveModal,
  useResponsiveModalContext,
} from "../responsive-modal";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { TFolderWithCount } from "@/lib/types";
import { DeleteFolderForm } from "./delete-modal-form";
import { Trash2 } from "lucide-react";

export const DeleteFolderResponsiveModal = ({
  folder,
  setShowFolderActionMenu,
}: {
  setShowFolderActionMenu: (showFolderActionMenu: boolean) => void;
  folder: TFolderWithCount;
}) => {
  return (
    <ResponsiveModal>
      <DeleteFormTrigger />
      <ResponsiveModal.Content className="p-0 md:w-md">
        <ResponsiveModal.Header className="bg-accent p-4 rounded-tr-md rounded-tl-md">
          <ResponsiveModal.Title>Delete Folder</ResponsiveModal.Title>
          <ResponsiveModal.Description>
            Are you sure you want to delete the following folder?
          </ResponsiveModal.Description>
        </ResponsiveModal.Header>
        <div className="px-6 sm:px-12 py-6 sm:py-2 text-sm">
          Deleting the <span className="font-medium">{folder.name}</span> folder
          will also delete all the{" "}
          <span className="font-medium">
            {folder._count.snippets} snippets.
          </span>{" "}
          This action can not be undone - proceed with caution.
        </div>
        <DeleteFolderForm
          folder={folder}
          setShowFolderActionMenu={setShowFolderActionMenu}
        />
      </ResponsiveModal.Content>
    </ResponsiveModal>
  );
};

const DeleteFormTrigger = () => {
  const { setShowResponsiveModal } = useResponsiveModalContext();
  const { isMobile } = useMediaQuery();

  if (isMobile) {
    return (
      <Button
        variant={"destructive"}
        onClick={() => {
          setShowResponsiveModal(true);
        }}
      >
        <Trash2 />
        <span>Delete</span>
      </Button>
    );
  }
  return (
    <DropdownMenuItem
      onSelect={(e) => {
        setShowResponsiveModal(true);
        e.preventDefault();
      }}
      variant="destructive"
    >
      <Trash2 />
      <span>Delete</span>
    </DropdownMenuItem>
  );
};
