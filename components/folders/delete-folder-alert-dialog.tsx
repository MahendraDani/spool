import {
  ResponsiveAlertDialog,
  useResponsiveAlertDialogContext,
} from "../responsive-alert-dialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";

// TODO : Pressing ESC closes the dialog, but the mouse loses its focus and needs a manual reload
export const DeleteFolderResponsiveAlertDialog = () => {
  return (
    <ResponsiveAlertDialog>
      <Trigger />
      <ResponsiveAlertDialog.Content>
        <ResponsiveAlertDialog.Header>
          <ResponsiveAlertDialog.Title>
            Delete Folder
          </ResponsiveAlertDialog.Title>
          <ResponsiveAlertDialog.Description>
            Some description
          </ResponsiveAlertDialog.Description>
        </ResponsiveAlertDialog.Header>
        <ResponsiveAlertDialog.Footer>
          <ResponsiveAlertDialog.Close>Close</ResponsiveAlertDialog.Close>
          <ResponsiveAlertDialog.Action>Action</ResponsiveAlertDialog.Action>
        </ResponsiveAlertDialog.Footer>
      </ResponsiveAlertDialog.Content>
    </ResponsiveAlertDialog>
  );
};

export const Trigger = () => {
  const { setShowResponsiveAlertDialog } = useResponsiveAlertDialogContext();
  return (
    <DropdownMenuItem
      onSelect={(e) => {
        setShowResponsiveAlertDialog(true);
        e.preventDefault();
      }}
    >
      <span>Delete</span>
    </DropdownMenuItem>
  );
};
