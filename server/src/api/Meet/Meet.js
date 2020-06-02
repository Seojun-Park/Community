import { prisma } from "../../../generated/prisma-client";

export default {
  Meet: {
    participants: ({ id }) => prisma.meet({ id }).participants(),
    images: ({ id }) => prisma.meet({ id }).images(),
    tags: ({ id }) => prisma.meet({ id }).tags()
  }
};
