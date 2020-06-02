import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createMeet: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { tags, intro, title, creator, images, isPublic } = args;
      let newTag;
      const existedTag = await prisma.$exists.tag({ title: tags });
      const checkTag = await prisma.tags({
        where: {
          title: tags
        }
      });
      if (existedTag === true) {
        return await prisma.createMeet({
          intro,
          title,
          creator,
          isPublic,
          images,
          participants: {
            connect: {
              id: user.id
            }
          },
          tags: {
            connect: { id: checkTag[0].id }
          }
        });
      } else {
        const meetup = await prisma.createMeet({
          intro,
          title,
          creator,
          isPublic,
          images,
          participants: {
            connect: {
              id: user.id
            }
          }
        });
        newTag = await prisma.createTag({
          meets: {
            connect: {
              id: meetup.id
            }
          },
          title
        });
        return meetup;
      }
    }
  }
};
