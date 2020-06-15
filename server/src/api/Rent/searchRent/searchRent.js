import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchRent: async (_, args) => {
      console.log(args.term);
      return prisma.rents({
        where: {
          OR: [
            { title_starts_with: args.term },
            { caption_contains: args.term },
            { zone_contains: args.term },
            { price_contains: args.term },
            { type_contains: args.term },
            { zone_contains: args.term }
          ]
        }
      });
    }
  }
};
