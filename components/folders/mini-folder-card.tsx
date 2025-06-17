"use client";
import { TFolderWithCount } from "@/lib/types";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatTimestamp } from "@/lib/date";
import { Badge } from "../ui/badge";
import { Clock } from "lucide-react";

export const MiniFolderCard = ({ folder }: { folder: TFolderWithCount }) => {
  return (
    <Card className="p-2">
      <CardHeader className="p-1">
        <div className="flex justify-between items-center gap-4">
          <CardTitle className="font-medium">{folder.name}</CardTitle>
          <Badge variant={"outline"} className="text-xs sm:text-sm">
            {`${folder._count.snippets} Snippet${
              folder._count.snippets !== 1 ? "s" : ""
            }`}
          </Badge>
        </div>
        <CardDescription className="line-clamp-1 flex items-center justify-start gap-2">
          <Clock className="size-4" />
          Last updated {formatTimestamp(folder.updatedAt)}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
