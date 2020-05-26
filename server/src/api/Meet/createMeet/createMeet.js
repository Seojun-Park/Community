import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createMeet: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { tag, intro } = args;
      const meetup = await prisma.createMeet({
        tag,
        intro,
        participants: {
          connect: {
            id: user.id
          }
        }
      });
      return meetup;
    }
  }
};
