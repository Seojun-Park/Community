import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    showRent: async (_, __) => {
      try {
        return await prisma.rents({
          orderBy: "createdAt_DESC"
        });
      } catch (e) {
        console.log(e.message);
      }
    }
  }
};
