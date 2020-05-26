import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    posts: ({ id }) => prisma.user({ id }).posts(),
    boards: ({ id }) => prisma.user({ id }).boards(),
    markets: ({ id }) => prisma.user({ id }).markets(),
    rents: ({ id }) => prisma.user({ id }).rents(),
    meets: ({ id }) => prisma.user({ id }).meets()
  }
};
