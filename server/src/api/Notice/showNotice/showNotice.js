import { prisma } from "../../../../generated/prisma-client";


export default {
    Query: {
        showNotice : async(_, __) => {
            return await prisma.notices({
                orderBy: 'createdAt_DESC'
            });
        }
    }
}