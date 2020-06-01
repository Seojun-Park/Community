import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createMeet: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { tag, intro, title, creator, images, isPublic } = args;
      let newTag;
      const exist = await prisma.$exists.tag({ where: { title: tag } });
      console.log(exist);
      // return await prisma.createMeet({
      //   intro,
      //   title,
      //   creator,
      //   isPublic,
      //   images,
      //   participants: {
      //     connect: {
      //       id: user.id
      //     }
      //   },
      //   tags: {
      //     connect: {
      //       id: exist.id
      //     }
      //   }
      // });
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
          tag: {
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
          tag
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
      // await prisma.updateMeet({
      //   where: {
      //     id: meetup.id
      //   },
      //   tags: {
      //     connect: {
      //       id: newTag.id
      //     }
      //   }
      // });
    }
  }
};
