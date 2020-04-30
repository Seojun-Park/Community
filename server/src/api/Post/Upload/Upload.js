import { prisma } from "../../../../generated/prisma-client";


export default {
    Mutation: {
        upload: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { caption, images } = args;
            const post = await prisma.createPost({
                caption,
                user: {
                    connect: {
                        id: user.id
                    }
                }
            });
            images.forEach(async image => {
                await prisma.createImage({
                    url: image,
                    post: {
                        connect: {
                            id: post.id
                        }
                    }
                })
            })
            return post;
        }
    }
}