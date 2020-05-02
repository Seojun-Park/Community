import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        uploadMarket: async(_, args, { request }) => {
            const { user } = request;
            const { title, caption } = args;
            const market = await prisma.createMarket({
                caption,
                title,
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