import { prisma } from "../../../generated/prisma-client";

export default {
  Rent: {
    user: ({ id }) => prisma.rent({ id }).user()
  }
};
