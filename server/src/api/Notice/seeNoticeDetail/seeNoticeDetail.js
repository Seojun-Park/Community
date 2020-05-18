import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeNoticeDetail: async (_, args) => {
      const { id } = args;
      return await prisma.notice({ id });
    }
  }
};

