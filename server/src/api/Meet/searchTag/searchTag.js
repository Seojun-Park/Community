import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchTag: async (_, args) =>
      await prisma.meets({
        where: {
          tags_some: {
            title_contains: args.title
          }
        }
      })
  }
};
