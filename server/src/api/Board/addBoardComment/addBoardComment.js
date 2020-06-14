import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addBoardComment: (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { text, boardId } = args;
      const { user } = request;
      return prisma.createComment({
        user: {
          connect: {
            id: user.id
          }
        },
        board: {
          connect: {
            id: boardId
          }
        },
        text
      });
    }
  }
};
