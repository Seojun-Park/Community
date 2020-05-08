import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeBoardDetail: async (_, args) => {
            const { id } = args;
            return await prisma.board({ id })
        }
    }
}
