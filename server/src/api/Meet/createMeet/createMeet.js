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
        member,
        theme,
        time
      } = args;
      let newTag;
      let checkTag;
      let existedTag;
      const existedTitle = await prisma.$exists.meet({ title });
      console.log("existed title check");
      console.log(existedTitle);
      if (existedTitle === true) {
        console.log("existed Title true");
        return false;
      }
      if (tags === undefined || tags === [""]) {
        newTag = title;
        checkTag = await prisma.tags({
          where: {
            title: newTag
          }
        });
        console.log(
          "tag doesn't exist and tag is undefineds, meet title takes tag"
        );
        console.log(newTag);
        existedTag = await prisma.$exists.tag({ title: newTag });
      } else {
        checkTag = await prisma.tags({
          where: {
            title: tags[0].title
          }
        });
        console.log(
          "tag doesn't exist tag is defined, first array of tag request takes tag title"
        );
        console.log(checkTag);
        existedTag = await prisma.$exists.tag({ title: tags[0] });
      }

      if (existedTag === true) {
        // 여려개의 태그를 가지고 있을때, 그 태그 전부에 연결 하는 방법 구상 필요
        console.log("Tag is existed, create meet and connect to the tag");
        console.log(existedTag);
        return await prisma.createMeet({
          intro,
          title,
          creator,
          isPublic,
          images,
          location,
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
            connect: { id: checkTag[0].id }
          }
        });
      } else {
        console.log(
          "tag doesn't exist, create meet with blank tag and create tag and connect to the meet"
        );
        const meetup = await prisma.createMeet({
          intro,
          title,
          creator,
          isPublic,
          images,
          member,
          theme,
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
            console.log(tags);
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
          } else {
            console.log("no tag input request");
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
              console.log("tag input request");
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
          console.log("weird");
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
