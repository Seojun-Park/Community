import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createMeet: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const {
        tags,
        intro,
        title,
        creator,
        images,
        isPublic,
        location,
        date,
        time
      } = args;
      let newTag;
      let checkTag;
      let existedTag;
      const existedTitle = await prisma.$exists.meet({ title });
      if (existedTitle === true) {
        return false;
      }
      if (tags === undefined || tags === [""]) {
        newTag = title;
        checkTag = await prisma.tags({
          where: {
            title: newTag
          }
        });
        existedTag = await prisma.$exists.tag({ title: newTag });
      } else {
        checkTag = await prisma.tags({
          where: {
            title: tags[0].title
          }
        });
        existedTag = await prisma.$exists.tag({ title: tags[0] });
      }

      if (existedTag === true) {
        // 여려개의 태그를 가지고 있을때, 그 태그 전부에 연결 하는 방법 구상 필요
        return await prisma.createMeet({
          intro,
          title,
          creator,
          isPublic,
          images,
          location,
          date,
          time,
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
          location,
          date,
          time,
          participants: {
            connect: {
              id: user.id
            }
          }
        });
        if (tags !== undefined) {
          if (tags.length > 1) {
            for (let i = 0; i < tags.length; i++) {
              await prisma.createTag({
                meets: {
                  connect: {
                    id: meetup.id
                  }
                },
                title: tags[i].title
              });
            }
          } else {
            if (tags[0].title === undefined) {
              await prisma.createTag({
                meets: {
                  connect: {
                    id: meetup.id
                  }
                },
                title
              });
            } else {
              await prisma.createTag({
                meets: {
                  connect: {
                    id: meetup.id
                  }
                },
                title: tags[0].title
              });
            }
          }
        } else {
          await prisma.createTag({
            meets: {
              connect: {
                id: meetup.id
              }
            },
            title
          });
        }
        return meetup;
      }
    }
  }
};
