import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    uploadMarket: async (_, args, { request }) => {
      const { user } = request;
      const { title, caption, status, images, price } = args;
      const market = await prisma.createMarket({
        caption,
        title,
        status,
        price,
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
              market: {
                connect: {
                  id: market.id
                }
              }
            })
        );
      }
      return market;
    }
  }
};
