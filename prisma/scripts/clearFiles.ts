import { prisma } from "../../src/lib/prisma";

async function main() {
  await prisma.file.deleteMany({});
  console.log("File table cleared");
}

main().finally(() => prisma.$disconnect());
