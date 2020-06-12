import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    quitMeet: (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { meetId } = args;
      const { user } = request;
      return prisma.updateMeet({
        where: {
          id: meetId
        },
        data: {
          participants: {
            disconnect: {
              id: user.id
            }
          }
        }
      });
    }
  }
};
