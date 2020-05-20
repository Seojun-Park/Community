import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchBoard: async (_, args) =>
      await prisma.boards({
        where: {
          OR: [{ title_starts_with: args.term }]
        }
      })
  }
};
