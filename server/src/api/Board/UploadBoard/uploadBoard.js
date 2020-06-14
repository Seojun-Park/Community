import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    uploadBoard: async (_, args, { request }) => {
      const { user } = request;
      const { title, caption, category } = args;
      const board = await prisma.createBoard({
        caption,
        title,
        category,
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
