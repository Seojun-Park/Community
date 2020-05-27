import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeMeetDetail: async (_, args) => {
      const { id } = args;
      return await prisma.meet({ id });
    }
  }
};
