import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    uploadRent: async (_, args, { request }) => {
      const { user } = request;
      const { title, caption, status } = args;
      const rent = await prisma.createRent({
        caption,
        title,
        status,
        user: {
          connect: {
            id: user.id
          }
        }
      });
      return rent;
    }
  }
};
