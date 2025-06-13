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
import { NotepadText } from "lucide-react";
import { Separator } from "../ui/separator";

export const WorkspacePageClient = () => {
  const { isLoading, data: folders } = useFoldersOfWorkspace();
  return (
    <div>
      {isLoading && <p>loading...</p>}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div>
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
    <Link href={`/${slug}/${folder.slug}`}>
      <Card className="rounded-none p-4">
        <CardHeader className="-mb-2 p-0">
          <div>
            <CardTitle className="flex justify-start items-center gap-2">
              <p>{folder.name}</p>
              {folder.description && (
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <NotepadText className="size-4 font-normal text-muted-foreground" />
                  </HoverCardTrigger>
                  <HoverCardContent className="p-0 text-sm">
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
            <CardDescription className="flex justify-start items-center gap-1">
              <p>Updated on</p>
              <Tooltip>
                <TooltipTrigger>
                  <p>{formatTimestamp(folder.updatedAt)}</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-center max-w-48">
                    {formatDateWithTimezone(folder.updatedAt)}
                  </p>
                </TooltipContent>
              </Tooltip>
              <p>by</p>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <p>Sam Manekshaw</p>
                </HoverCardTrigger>
                <HoverCardContent className="p-0 text-sm">
                  <div className="p-2 flex justify-center items-center gap-2 text-muted-foreground">
                    <NotepadText className="size-4" />
                    <p>Description</p>
                  </div>
                  <Separator />
                  <p className="p-4 text-pretty">{folder.description}</p>
                </HoverCardContent>
              </HoverCard>
            </CardDescription>
          </div>
          <CardAction>Card Action</CardAction>
        </CardHeader>
      </Card>
    </Link>
  );
};
