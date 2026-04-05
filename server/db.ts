import { PrismaPg } from "@prisma/adapter-pg";

import { env } from "~/env";
import { PrismaClient } from "~/prisma/generated/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const createPrismaClient = () => {
  const client = new PrismaClient({
    adapter,
    log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
  });

  if (env.NODE_ENV === "development") {
    client.$on("query", (e) => {
      console.log("Duration: " + e.duration + "ms");
    });
  }

  return client;
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
