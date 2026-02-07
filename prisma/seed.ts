import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.OWNER_EMAIL ?? "owner@example.com";
  const password = process.env.OWNER_PASSWORD ?? "changeme";
  const passwordHash = await hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    create: { email, passwordHash },
    update: { passwordHash },
  });
  console.log("Owner user synced:", email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
