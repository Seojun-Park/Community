import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchMeet: async (_, args) =>
      await prisma.meets({
        where: {
          OR: [{ tag_contains: args.term }, { title_contains: args.term }]
        }
      })
  }
};
