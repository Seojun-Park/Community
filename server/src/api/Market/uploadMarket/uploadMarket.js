import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    uploadMarket: async (_, args, { request }) => {
      const { user } = request;
      const { title, caption, status, images } = args;
      const market = await prisma.createMarket({
        caption,
        title,
        status,
        user: {
          connect: {
            id: user.id
          }
        }
      });
      images.forEach(
        async image =>
          await prisma.createImage({
            url: image,
            market: {
              connect: {
                id: market.id
              }
            }
          })
      );
      return market;
    }
  }
};
