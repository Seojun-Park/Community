import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    followUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      try {
        await prisma.updateUser({
          where: {
            id: user.id
          },
          data: {
            following: {
              connect: {
                id
              }
            }
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
