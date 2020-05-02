import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        uploadNotice: async(_, args, { request }) => {
            const { user } = request;
            const { title, caption } = args;
            const notice = await prisma.createNotice({
                caption,
                title,
                user: {
                    connect:{
                        id: user.id
                    }
                }
            });
            return notice
        }
    }
}