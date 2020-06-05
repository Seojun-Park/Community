import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchMeet: async (_, args) =>
      await prisma.meets({
        where: {
          OR: [
            { title_contains: args.term },
            { tags_some: { title_contains: args.term } }
          ]
        }
      })
  }
};
