import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        editUser: (_, args, {request, isAuthenticated }) => {
            isAuthenticated(request);
            const { username, firstName, lastName, intro, avatar } = args;
            const { user } = request;
            return prisma.updateUser({
                where: {
                    id: user.id
                },
                data: {
                    username,
                    firstName,
                    lastName,
                    intro,
                    avatar
                }
            });
        }
    }
}