import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    uploadRent: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const {
        title,
        caption,
        status,
        images,
        address,
        size,
        type,
        zone,
        price,
        deposit,
        condition
      } = args;
      const rent = await prisma.createRent({
        caption,
        title,
        status,
        address,
        size,
        type,
        zone,
        price,
        deposit,
        condition,
        user: {
          connect: {
            id: user.id
          }
        }
      });
      if (images !== undefined) {
        images.forEach(
          async image =>
            await prisma.createImage({
              url: image,
              rent: {
                connect: {
                  id: rent.id
                }
              }
            })
        );
      }
      return rent;
    }
  }
};
