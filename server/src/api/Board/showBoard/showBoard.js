import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        showBoard : async (_, __) => {
            try {
                return await prisma.boards({
                    orderBy: 'createdAt_DESC'
                });
            } catch (e){
                console.log(e.message)
            }
        }
    }
}