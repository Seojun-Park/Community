import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createMeet: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { tags, intro, title, creator, images, isPublic } = args;
      let newTag;
      const exist = await prisma.$exists.tag({ where: { title: tags } });
      console.log(exist);
      if (exist) {
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
            connect: {
              id: exist.id
            }
          }
        });
      } else {
        console.log("here??");
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
          },
          tags
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
