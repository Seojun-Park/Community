import { prisma } from "../../../../generated/prisma-client";
import { confirmApply } from "../../../utils";

export default {
  Mutation: {
    applyMeet: async (_, args, { request }) => {
      const { meetId, id } = args;
      const { user } = request;
      try {
        const response = confirmApply(user);
        // if (response === "accept") {
        //   await prisma.updateMeet({
        //     data: { participants: { user } },
        //     where: { meetId }
        //   });
        //   return true;
        // }
        return false;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};
