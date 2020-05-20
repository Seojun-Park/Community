import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchMarket: async (_, args) =>
      await prisma.markets({
        where: {
          OR: [{ title_starts_with: args.term }]
        }
      })
  }
};
