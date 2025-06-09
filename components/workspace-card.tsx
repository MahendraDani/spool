// Workspace Card
/*
Name, description,
Number of folders,
Number of snippets
Last updated at

Three dots : edit options - settings
*/

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { TWorkspaceWithCount } from "@/lib/types";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const WorkspaceCard = ({
  workspace,
}: {
  workspace: TWorkspaceWithCount;
}) => {
  const path = usePathname();
  const username = path.split("/")[1];
  return (
    <Card className="group hover:border-accent-foreground/50 rounded-none shadow-none py-3">
      <CardHeader>
        <div className="md:text-xl flex justify-between items-center">
          <Link href={`/${username}/${workspace.slug}`} className="">
            <CardTitle>{workspace.name}</CardTitle>
          </Link>
          <Ellipsis/>
        </div>
        <CardDescription className="text-pretty line-clamp-3 -my-1">
          {workspace.slug}
        </CardDescription>
      </CardHeader>
      <CardContent className="-mt-2 text-sm">
        {workspace.description}
      </CardContent>
      <CardFooter className="-mt-3 text-sm">
        <div className="w-full flex justify-between items-center">
          <div className="flex justify-between items-center gap-1">
            <p>{"Folders :"}</p> 
            <p>{workspace._count.folders}</p>       
          </div>
          <div className="flex justify-between items-center gap-1">
            <p>{"Snippets :"}</p> 
            <p>{workspace._count.snippets}</p>       
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
