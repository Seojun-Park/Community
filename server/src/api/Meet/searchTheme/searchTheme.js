import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchTheme: async (_, args) =>
      await prisma.meets({
        where: {
          theme_contains: args.theme
        }
      })
  }
};
