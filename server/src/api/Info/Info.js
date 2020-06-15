import { prisma } from "../../../generated/prisma-client";

export default {
  Info: {
    images: ({ id }) => prisma.info({ id }).images()
  },
  Image: {
    info: ({ id }) => prisma.image({ id }).info()
  }
};
