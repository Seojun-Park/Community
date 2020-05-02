import { prisma } from "../../../../generated/prisma-client";


export default {
    Mutation: {
        addBoardComment: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { text, boardId } = args
            const { user } = request;
            const comment = await prisma.createComment({
                user: {
                    connect:{
                        id: user.id
                    }
                },
                board: {
                    connect: {
                        id: boardId
                    }
                },
                text
            });
            return comment
        }
    }
}