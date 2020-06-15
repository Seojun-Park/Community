import { prisma } from "../../../generated/prisma-client";

export default {
  Rent: {
    user: ({ id }) => prisma.rent({ id }).user(),
    images: ({ id }) => prisma.rent({ id }).images()
  },
  Image: {
    rent: ({ id }) => prisma.rent({ id }).rent()
  }
};
