/** @format */

import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    showMeet: async (_, __) => {
      try {
        return await prisma.meets({
          orderBy: "createdAt_DESC"
        });
      } catch (e) {
        console.log(e.message);
        console.log(e.message);
      }
    }
  }
};
