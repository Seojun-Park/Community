import { prisma } from "../../../../generated/prisma-client";
import { confirmApply } from "../../../utils";

export default {
  Mutation: {
    joinMeet: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { meetId } = args;
      const { user } = request;
      try {
        const response = confirmApply(user);
        if (response === "accept") {
          await prisma.updateMeet({
            data: { participants: { user } },
            where: { meetId }
          });
          return true;
        }
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};
