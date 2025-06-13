import { Prisma } from "@prisma/client";

export type TWorkspaceWithCount = Prisma.WorkspaceGetPayload<{
  include: {
    _count: true;
  };
}>;

export type TWorkspaceWithCountAndFolders = {
  workspace : Prisma.WorkspaceGetPayload<{
    include: {
      folders: {
        include : {
          _count : true
        }
      };
      snippets: true;
      _count: true;
    };
  }>;
  message : string;
}

export type TSnippetsOfFolder = {
  snippets : Prisma.SnippetGetPayload<true>[],
  message : string
}

export type TFoldersOfWorkspace = {
  data : Prisma.FolderGetPayload<{
    include : {
      _count : true
    }
  }>[]
  message : string
}
