import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const now = new Date();

  // 1. Create a user
  const user = await prisma.user.findUnique({
    where : {
      email : "tim@example.com",
    }
  })

  if(!user){
    throw new Error("Invalid or incorrect email address")
  }

  // 2. Create an account (BetterAuth expects this for login linkage)
  await prisma.account.create({
    data: {
      id: faker.string.uuid(),
      accountId: 'demo-provider-id',
      providerId: 'credentials', // or 'github', 'google', etc. depending on BetterAuth setup
      userId: user.id,
      password: 'Timcook@123',
      scope: 'user',
      createdAt: now,
      updatedAt: now,
    },
  });

  // 3. Create a workspace
  const workspace = await prisma.workspace.create({
    data: {
      name: 'My Workspace',
      slug: 'my-workspace',
      ownerId: user.id,
    },
  });

  // 4. Create 7 folders with 5 snippets each
  for (let i = 1; i <= 7; i++) {
    const folder = await prisma.folder.create({
      data: {
        name: `Folder ${i}`,
        slug: `folder-${i}`,
        description: `Description for Folder ${i}`,
        ownerId: user.id,
        workspaceId: workspace.id,
      },
    });

    for (let j = 1; j <= 5; j++) {
      await prisma.snippet.create({
        data: {
          name: `Snippet ${j} in Folder ${i}`,
          description: `Description for snippet ${j}`,
          code: `console.log("Snippet ${j} from folder ${i}");`,
          folderId: folder.id,
          workspaceId: workspace.id,
          authorId: user.id,
        },
      });
    }
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
