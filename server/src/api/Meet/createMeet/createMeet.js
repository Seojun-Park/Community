import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createMeet: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { tag, intro, title, creator } = args;
      console.log(user);
      const meetup = await prisma.createMeet({
        tag,
        intro,
        title,
        creator,
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
