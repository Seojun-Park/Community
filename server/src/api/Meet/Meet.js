import { prisma } from "../../../generated/prisma-client";

export default {
  Meet: {
    participants: ({ id }) => prisma.user({ id }).user()
  }
};
