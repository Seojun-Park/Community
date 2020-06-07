import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editMeet: (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const {
        id,
        intro,
        location,
        creator,
        date,
        isPublic,
        maxparticipants
      } = args;
      const { user } = reuqest;
      if (creator !== user.id) {
        console.log("You are not Master of this meeting");
        return null;
      } else {
        return prisma.updateMeet({
          where: {
            id
          },
          data: {
            intro,
            location,
            date,
            isPublic,
            maxparticipants
          }
        });
      }
    }
  }
};
