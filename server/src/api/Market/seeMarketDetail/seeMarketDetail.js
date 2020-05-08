import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeMarketDetail: async (_, args) => {
      const { id } = args;
      return await prisma.market({ id });
    }
  }
};
