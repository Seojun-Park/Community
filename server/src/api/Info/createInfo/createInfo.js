import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createInfo: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { title, images, text } = args;
      const info = await prisma.createInfo({
        text,
        title
      });
      if (images !== undefined) {
        images.forEach(
          async image =>
            await prisma.createImage({
              url: image,
              info: {
                connect: {
                  id: info.id
                }
              }
            })
        );
      }
      return info;
    }
  }
};
