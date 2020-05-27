import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteMeet: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, isMaster } = args;
      console.log(isMaster);
      try {
        if (isMaster === true) {
          await prisma.deleteMeet({
            id
          });
          return true;
        } else if (isMaster === false) {
          console.log("You are not Authorized");
          return false;
        }
      } catch (e) {
        console.log(e.message);
      }
    }
  }
};
