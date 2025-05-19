import { PrismaClient } from "./generated/prisma/index.js";

export const getPrisma = (database_url: string) => {
  const prisma = new PrismaClient({
    datasourceUrl: database_url,
  });
  return prisma;
};
