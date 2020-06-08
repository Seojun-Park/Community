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
        console.log("존재하는 밋업타이틀입니다");
        return false;
      }
      console.log("라인27");
      console.log(tags);
      console.log("라인29");
      console.log(title);
      if (tags === undefined || tags === [""]) {
        newTag = title;
        checkTag = await prisma.tags({
          where: {
            title: newTag
          }
        });
        console.log("라인38");
        console.log(checkTag);
        existedTag = await prisma.$exists.tag({ title: newTag });
        console.log("라인41");
        console.log(existedTag);
      } else {
        checkTag = await prisma.tags({
          where: {
            title: tags[0]
          }
        });
        console.log("라인49");
        console.log(checkTag);
        existedTag = await prisma.$exists.tag({ title: tags[0] });
        console.log("라인52");
        console.log(existedTag);
      }

      if (existedTag === true) {
        // 여려개의 태그를 가지고 있을때, 그 태그 전부에 연결 하는 방법 구상 필요
        console.log(
          "existedTag가 true 일때 태그가 존재 하고 있고, 그 태그 쿼리와 연결하여 밋업 생성"
        );
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
        console.log(
          "existedTag가 false 이고 태그가 존재하지 않아, 태그 없이 밋업을 먼저 생성 하고 밋업 타이틀로 태그를 생성 준비"
        );
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
        console.log("line 98 밋업 생성 완료");
        if (tags !== undefined) {
          console.log(
            "밋업 생성 시 태그가 존재 함 태그 === undefined 가 존재 하지 않는거니까... 머리가 멈춘듯"
          );
          if (tags.length > 1) {
            console.log(
              "밋업 생성 때, 1개 이상의 태그를 집어 넣었기때문에, 그 태그들을 전부 새로 생성하고, 생성한 밋업과 전부 연결"
            );
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
            console.log(
              "밋업 생성 때, 1개 태그를 집어넣어 생성 요청, 1개의 태그만 생성 후, 밋업과 연결",
              "태그가 1개일때 인데 [''] 여기에서도 이게 반응함. 태그를 읽어 value 값 체크 필요"
            );
            await prisma.createTag({
              meets: {
                connect: {
                  id: meetup.id
                }
              },
              title: tags
            });
          }
        } else {
          console.log("밋업 타이틀로 태그를 생성하고 밋업과 연결");
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
