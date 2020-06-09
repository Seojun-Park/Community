import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editMeet: (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const {
        id,
        intro,
        location,
        date,
        isPublic,
        time,
        maxparticipants
      } = args;
      const { user } = request;
      return prisma.updateMeet({
        where: {
          id
        },
        data: {
          intro,
          location,
          date,
          time,
          isPublic,
          maxparticipants
        }
      });
    }
  }
};
