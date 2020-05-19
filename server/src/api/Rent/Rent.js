import { prisma } from "../../../generated/prisma-client";

export default {
  Rent: {
    user: ({ id }) => prisma.rent({ id }).user(),
    comments: ({ id }) => prisma.rent({ id }).comments()
  },
  Comment: {
    user: ({ id }) => prisma.comment({ id }).user(),
    rent: ({ id }) => prisma.comment({ id }).rent()
  }
};
