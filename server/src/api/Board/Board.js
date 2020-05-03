import { prisma } from "../../../generated/prisma-client";

export default {
  Board: {
    user: ({ id }) => prisma.board({ id }).user(),
    comments: ({ id }) => prisma.board({ id }).comments()
  },
  Comment: {
    user: ({ id }) => prisma.comment({ id }).user(),
    board: ({ id }) => prisma.comment({ id }).board()
  }
};
