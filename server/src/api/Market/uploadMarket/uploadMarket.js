import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        uploadMarket: async(_, args, { request }) => {
            const { user } = request;
            const { title, caption,status } = args;
            const market = await prisma.createMarket({
                caption,
                title,
                status,
                user: {
                    connect:{
                        id: user.id
                    }
                }
            });
            return market;
        }
    }
}