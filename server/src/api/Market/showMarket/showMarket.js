import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        showMarket : async (_, __) => {
            try {
                return await prisma.markets({
                    orderBy: 'createdAt_DESC'
                });
            } catch (e){
                console.log(e.message)
            }
        }
    }
}