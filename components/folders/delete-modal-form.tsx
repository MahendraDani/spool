import { MiniFolderCard } from "./mini-folder-card";
import { Input } from "../ui/input";
import { FormEvent, useState } from "react";
import { LoadingCircle } from "../icons/loading-circle";
import { useSession } from "@/hooks/use-session";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { mutate } from "swr";
import { useResponsiveModalContext } from "../responsive-modal";
import { TFolderWithCount } from "@/lib/types";
import { Button } from "../ui/button";

export const DeleteFolderForm = ({ folder }: { folder: TFolderWithCount }) => {
  const { setShowResponsiveModal } = useResponsiveModalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { session } = useSession();
  const path = usePathname();
  const slug = path.split("/")[1];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/folders/${folder.id}?slug=${slug}`, {
        method: "DELETE",
        headers: {
          Cookie: `Bearer spool.session_token=${session.token}`,
        },
      });
      if (!res.ok) {
        throw new Error("some error deleting folder");
      }
      await mutate(`/api/folders?slug=${slug}`);
      await mutate(`/api/workspaces/${slug}`);
      setShowResponsiveModal(false);
      toast.success("Folder deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error deleting folder");
      throw new Error("Error delete folder");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pb-4 px-4">
      <div className="px-4 space-y-4">
        <MiniFolderCard folder={folder} />
        <fieldset>
          <label className="text-sm">
            To confirm, please type{" "}
            <span className="font-semibold">{folder.slug}</span> below
          </label>
          <Input required pattern={folder.slug} />
        </fieldset>
        <div className="mt-2 flex justify-end items-center gap-2">
          <Button
            disabled={isSubmitting}
            onClick={() => {
              setShowResponsiveModal(false);
            }}
            type="reset"
            variant={"outline"}
          >
            Cancel
          </Button>
          <Button disabled={isSubmitting} variant={"destructive"}>
            {isSubmitting && <LoadingCircle />}
            {isSubmitting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </form>
  );
};