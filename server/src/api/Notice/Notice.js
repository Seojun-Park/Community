import { prisma } from "../../../generated/prisma-client";

export default {
    Notice: {
        user:({ id }) => prisma.notice({ id }).user()
    }
}