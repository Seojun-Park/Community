import { prisma } from "../../../generated/prisma-client";


export default {
    Board: {
        user: ({ id }) => prisma.board({ id }).user()
    }
}