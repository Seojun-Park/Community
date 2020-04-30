import { prisma } from '../../../../generated/prisma-client'

export default {
    Query: {
        me: async(_, __, { request}) => {
            console.log(request);
            return "lalala"
        }
    }
}