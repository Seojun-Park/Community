import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editMeet: (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, title, intro, images, location, date } = args;
      const { user } = request;
      return prisma.updateMeet({
        where: {
          id
        },
        data: {
          title,
          intro,
          images,
          location,
          date
        }
      });
    }
  }
};
