import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteMeet: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { roomId, isMaster } = args;
      if (isMaster === true) {
        await prisma.deleteMeet({
          roomId,
          isMaster
        });
        return true;
      } else if (isMaster === false) {
        console.log("You are not Authorized");
        return false;
      }
    }
  }
};
