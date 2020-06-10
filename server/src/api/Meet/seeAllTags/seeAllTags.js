import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeAllTags: async (_, __) => {
      try {
        console.log(prisma.tags);
        return await prisma.tags({
          orderBy: "updatedAt_DESC"
        });
      } catch (e) {
        console.log("Tag error");
        console.log(e.message);
      }
    }
  }
};
