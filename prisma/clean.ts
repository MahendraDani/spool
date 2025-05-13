import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanup() {
  const userEmail = 'time@example.com';

  // Find the user first
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) {
    console.log('No seed user found to delete.');
    return;
  }

  const userId = user.id;

  console.log(`Deleting data for user: ${userEmail} (ID: ${userId})`);

  // Deletion order to respect foreign key constraints
  await prisma.commentLike.deleteMany({
    where: { userId },
  });

  await prisma.comment.deleteMany({
    where: { authorId: userId },
  });

  await prisma.snippetStar.deleteMany({
    where: { userId },
  });

  await prisma.snippet.deleteMany({
    where: { authorId: userId },
  });

  await prisma.folder.deleteMany({
    where: { ownerId: userId },
  });

  await prisma.workspace.deleteMany({
    where: { ownerId: userId },
  });

  await prisma.account.deleteMany({
    where: { userId },
  });

  await prisma.session.deleteMany({
    where: { userId },
  });

  await prisma.user.delete({
    where: { id: userId },
  });

  console.log('Seed data deleted successfully!');
}

cleanup()
  .catch((e) => {
    console.error('Error cleaning up database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
