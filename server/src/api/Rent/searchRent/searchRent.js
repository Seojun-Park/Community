import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchRent: async (_, args) =>
      await prisma.rents({
        where: {
          OR: [{ title_starts_with: args.term }]
        }
      })
  }
};
