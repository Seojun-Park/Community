import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    uploadBoard: async (_, args, { request }) => {
      const { user } = request;
      const { title, caption, status } = args;
      console.log(status);
      const board = await prisma.createBoard({
        caption,
        title,
        status,
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
