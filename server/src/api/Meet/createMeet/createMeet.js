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
        thumnail,
        member,
        theme,
        time
      } = args;
      let newTag;
      let checkTag;
      let existedTag;
      const existedTitle = await prisma.$exists.meet({ title });
      if (existedTitle === true) {
        return false;
      }
      switch (tags) {
        case tags === undefined || tags === [""]:
          newTag = title;
          // Seeking if tag is already existed
          checkTag = await prisma.tags({
            where: {
              title: newTag
            }
          });
          existedTag = await prisma.$exists.tags({ title: newTag });
          break;
        case tags:
          checkTag = await prisma.tags({
            where: {
              title: Object.values(tags)[0]
            }
          });
          existedTag = await prisma.$exists.tag({ title: tags[0] });
      }
      if (existedTag === true) {
        console.log(checkTag);
        return await prisma.createMeet({
          intro,
          title,
          creator,
          isPublic,
          images,
          location,
          thumnail,
          date,
          member,
          theme,
          time,
          participants: {
            connect: {
              id: user.id
            }
          },
          tags: {
            connect: {
              id: checkTag[0].id
            }
          }
        });
      } else {
        const meetup = await prisma.createMeet({
          intro,
          title,
          creator,
          isPublic,
          images,
          member,
          theme,
          thumnail,
          location,
          date,
          time,
          participants: {
            connect: {
              id: user.id
            }
          }
        });

        switch (tags) {
          case tags:
            for (let i = 0; i < tags.length; i++) {
              await prisma.createTag({
                meets: {
                  connect: {
                    id: meetup.id
                  }
                },
                title: tags[i]
              });
            }
            break;
          case tags === undefined:
            await prisma.createTag({
              meets: {
                connect: {
                  id: meetup.id
                }
              },
              title
            });
            break;
        }
        return meetup;
      }
    }
  }
};
