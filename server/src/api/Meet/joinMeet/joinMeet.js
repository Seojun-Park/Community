import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    joinMeet: (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { meetId } = args;
      const { user } = request;
      return prisma.updateMeet({
        where: {
          id: meetId
        },
        data: {
          participants: {
            connect: {
              id: user.id
            }
          }
        }
      });
    }
  }
};
