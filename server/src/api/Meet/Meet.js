import { prisma } from "../../../generated/prisma-client";

export default {
  Meet: {
    participants: ({ id }) => prisma.meet({ id }).participants()
  }
};
