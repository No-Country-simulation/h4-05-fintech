import { PrismaClient } from '@prisma/client';
import { userSeeds } from './seeds/user.seeds';
import { financialProfileSeeds } from './seeds/financial-profile.seeds';
import { userProfileSeeds } from './seeds/user-profile.seeds';

const prisma = new PrismaClient();

async function seed() {
  await prisma.user.createMany({ data: userSeeds });
  await prisma.financialProfile.createMany({ data: financialProfileSeeds });
  await prisma.userProfile.createMany({ data: userProfileSeeds });
}

seed()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
