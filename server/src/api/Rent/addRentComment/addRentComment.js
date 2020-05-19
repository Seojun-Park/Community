import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addRentComment: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { text, rentId } = args;
      const { user } = request;
      const comment = await prisma.createComment({
        user: {
          connect: {
            id: user.id
          }
        },
        rent: {
          connect: {
            id: rentId
          }
        },
        text
      });
      return comment;
    }
  }
};
