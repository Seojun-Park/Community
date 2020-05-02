import { prisma } from "../../../generated/prisma-client";

export default {
    Market: {
        user: ({ id }) => prisma.market({ id }).user(),
        comments: ({ id }) => prisma.market({ id }).comments()
    },
    Comment: {
        user: ({ id }) => prisma.comment({ id }).user(),
        market: ({ id }) => prisma.comment({ id }).market()
    }
}