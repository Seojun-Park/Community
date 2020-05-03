import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    uploadBoard: async (_, args, { request }) => {
      const { user } = request;
      const { title, caption } = args;
      const board = await prisma.createBoard({
        caption,
        title,
        user: {
          connect: {
            id: user.id
          }
        }
      });
      return board;
    }
  }
};
