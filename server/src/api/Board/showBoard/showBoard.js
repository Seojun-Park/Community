import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        showBoard : async (_, __) => {
            return await prisma.boards({
                orderBy: 'createdAt_DESC'
            });
        }
    }
}