"use client";

import { TFolderOfWorkspace } from "@/lib/types";
import { useFoldersOfWorkspace } from "@/swr/use-folders";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDateWithTimezone, formatTimestamp } from "@/lib/date";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { NotepadText, Clock, User } from "lucide-react";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { UserHoverCard } from "../ui/user-hover-card";
import { FolderActionMenu } from "../folders/folder-action-menu";

export const WorkspacePageClient = () => {
  const { isLoading, data: folders } = useFoldersOfWorkspace();
  return (
    <div>
      {isLoading && <p>use loading skeletons here...</p>}
      <div className="space-y-2">
        {folders?.data.map((folder, idx) => (
          <FolderListItem key={idx} folder={folder} />
        ))}
      </div>
    </div>
  );
};

const FolderListItem = ({ folder }: { folder: TFolderOfWorkspace }) => {
  const { slug } = useParams() as {
    slug: string;
  };

  return (
    <Card className="rounded-md p-4">
      <CardHeader className="-mb-2 p-0">
        <div>
          <CardTitle className="flex justify-start items-center gap-2">
            <Link href={`/${slug}/${folder.slug}`} className="hover:underline underline-offset-4">
              <p className="text-base font-medium">{folder.name}</p>
            </Link>
            {folder.description && (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <NotepadText className="size-4 font-normal text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
                </HoverCardTrigger>
                <HoverCardContent className="p-0 text-sm max-w-80">
                  <div className="p-2 flex justify-center items-center gap-2 text-muted-foreground">
                    <NotepadText className="size-4" />
                    <p>Description</p>
                  </div>
                  <Separator />
                  <p className="p-4 text-pretty">{folder.description}</p>
                </HoverCardContent>
              </HoverCard>
            )}
          </CardTitle>

          <CardDescription className="space-y-1 sm:space-y-0">
            {/* Mobile: Stack vertically */}
            <div className="flex flex-col sm:hidden space-y-1 text-xs">
              <div className="flex items-center gap-1">
                <Clock className="size-3" />
                <span>Updated</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="font-medium hover:underline cursor-pointer">
                      {formatTimestamp(folder.updatedAt)}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-center max-w-48">
                      {formatDateWithTimezone(folder.updatedAt)}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-center gap-1">
                <User className="size-3" />
                <span>by</span>
                <UserHoverCard
                  userId={folder.ownerId}
                  username={folder.owner.username}
                />
              </div>
            </div>

            {/* Desktop: Single line */}
            <div className="hidden sm:flex items-center gap-1 text-sm">
              <Clock className="size-3" />
              <span>Updated</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="font-medium cursor-pointer">
                    {formatTimestamp(folder.updatedAt)}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-center max-w-48">
                    {formatDateWithTimezone(folder.updatedAt)}
                  </p>
                </TooltipContent>
              </Tooltip>
              <span>by</span>
              <UserHoverCard
                userId={folder.ownerId}
                username={folder.owner.username}
              />
            </div>
          </CardDescription>
        </div>

        <CardAction className="font-normal flex justify-between items-center gap-4 mt-3">
          <Badge variant={"outline"} className="text-xs sm:text-sm">
            {`${folder._count.snippets} Snippet${
              folder._count.snippets !== 1 ? "s" : ""
            }`}
          </Badge>
          <FolderActionMenu/>
        </CardAction>
      </CardHeader>
    </Card>
  );
};
