import { prisma } from "../../../generated/prisma-client";

export default {
    Market: {
        user: parent => prisma.market({ id: parent.id }).user(),
        comments: parent => prisma.market({ id: parent.id }).comments()
    },
    Comment: {
        user: parent => prisma.comment({ id: parent.id }).user(),
        market: parent => prisma.comment({ id: parent.id }).market()
    }
}