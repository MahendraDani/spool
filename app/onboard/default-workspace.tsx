"use client";

import slugify from "@sindresorhus/slugify";
import { Session } from "better-auth";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadingCircle } from "@/components/icons/loading-circle";

export const CreateDefaultWorkspace = ({
  session,
  user,
}: {
  session: Session;
  user: User;
}) => {
  const router = useRouter();
  const [status, setStatus] = useState<
    "idle" | "creating" | "error" | "redirecting"
  >("idle");

  const createDefaultWorkspaceAndFolder = async () => {
    try {
      setStatus("creating");

      const slug = slugify(
        `playground-${Math.floor(Math.random() * 10000) + 1}`
      );

      const workspaceRes = await fetch("/api/workspaces", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `spool.session_token=${session.token}`,
        },
        body: JSON.stringify({
          name: "Playground",
          slug,
          description: "The default workspace of a user",
        }),
      });

      if (!workspaceRes.ok) throw new Error("Failed to create workspace");

      const { data: workspace } = await workspaceRes.json();

      const folderRes = await fetch(
        `/api/folders?workspace-slug=${workspace.slug}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: `spool.session_token=${session.token}`,
          },
          body: JSON.stringify({
            name: "Hobby",
            description: "Folder for my cool snips",
          }),
        }
      );

      if (!folderRes.ok) throw new Error("Failed to create folder");

      const { data: folder } = await folderRes.json();

      setStatus("redirecting");
      router.push(`/${user.username}/${workspace.slug}/${folder.name}`);
    } catch (error) {
      console.error("Workspace creation error:", error);
      setStatus("error");
      router.refresh(); // retry in case of error
    }
  };

  useEffect(() => {
    if (status === "idle") {
      createDefaultWorkspaceAndFolder();
    }
  }, [status]);

  return (
    <div className="container-wrapper min-h-[80vh] md:min-h-[92vh] flex justify-center items-center flex-col gap-4 text-center">
      {status === "creating" && (
        <div className="flex justify-start items-center gap-4">
          <LoadingCircle />
          <p>Setting up your workspace...</p>
        </div>
      )}
      {status === "redirecting" && (
        <div className="flex justify-start items-center gap-4">
          <LoadingCircle />
          <p>Redirecting you to your default folder...</p>
        </div>
      )}
      {status === "error" && (
        <p className="text-red-500">An error occurred. Retrying...</p>
      )}
    </div>
  );
};
