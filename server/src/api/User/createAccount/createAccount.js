import { prisma } from '../../../../generated/prisma-client'

export default {
    Mutation: {
        createAccount: async (_, args) => {
            const { username, email, firstName="", lastName="", intro="" } = args
            const exists = await prisma.$exists.user({
                OR: [
                    {
                        username
                    },
                    {
                        email
                    }
                ]
            });
            if (exists) {
                throw Error("this username and email is alrady taken");
            }
            await prisma.createUser({
                username,
                email,
                firstName,
                lastName,
                intro
            });
            return true
        }
    }
}