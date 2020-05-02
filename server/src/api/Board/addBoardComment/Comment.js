import { prisma } from "../../../../generated/prisma-client";

export default {
    Comment: {
        user: ({ id }) => prisma.comment({ id }).user(),
        board: ({ id }) => prisma.comment({ id }).board()
    }
}