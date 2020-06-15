import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    ToggleLike: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id, isLiked } = args;
      try {
        await prisma.updateRent({
          where: {
            id
          },
          data: {
            isLiked
          }
        });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};
