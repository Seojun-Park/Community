import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeRentDetail: async (_, args) => {
      const { id } = args;
      return await prisma.rent({ id });
    }
  }
};
