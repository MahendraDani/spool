import { Prisma } from "@prisma/client";

export type TWorkspaceWithCount = Prisma.WorkspaceGetPayload<{
  include: {
    _count: true;
  };
}>;

export type TWorkspaceWithCountAndFolders = {
  workspace : Prisma.WorkspaceGetPayload<{
    include: {
      folders: true;
      snippets: true;
      _count: true;
    };
  }>;
  message : string;
}
