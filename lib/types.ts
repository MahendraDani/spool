import { Prisma } from '@prisma/client';

export type TWorkspaceWithCount = Prisma.WorkspaceGetPayload<{
  include: {
    _count: true;
  };
}>;
