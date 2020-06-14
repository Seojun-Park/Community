import { prisma } from "../../../generated/prisma-client";

export default {
  Market: {
    user: parent => prisma.market({ id: parent.id }).user(),
    comments: parent => prisma.market({ id: parent.id }).comments(),
    images: parent => prisma.market({ id: parent.id }).images()
  },
  Image: {
    market: parent => prisma.market({ id: parent.id }).market()
  }
};
