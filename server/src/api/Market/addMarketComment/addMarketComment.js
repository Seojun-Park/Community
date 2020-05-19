import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addMarketComment: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { text, marketId } = args;
      const { user } = request;
      const comment = await prisma.createComment({
        user: {
          connect: {
            id: user.id
          }
        },
        market: {
          connect: {
            id: marketId
          }
        },
        text
      });
      return comment;
    }
  }
};
