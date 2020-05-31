import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addSchedule: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { todo, date, tag, isOn } = args;
      const { user } = request;
      const schedule = await prisma.createSchedule({
        todo,
        date,
        tag,
        isOn,
        user: {
          connect: {
            id: user.id
          }
        }
      });
      return schedule;
    }
  }
};
