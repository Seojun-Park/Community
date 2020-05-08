import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeDetail: async (_, args) => {
            const { id } = args;
            return await prisma.board({ id })
        }
    }
}
