"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Post",
    embedded: false
  },
  {
    name: "Notice",
    embedded: false
  },
  {
    name: "Market",
    embedded: false
  },
  {
    name: "Rent",
    embedded: false
  },
  {
    name: "Board",
    embedded: false
  },
  {
    name: "Image",
    embedded: false
  },
  {
    name: "Comment",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://eu1.prisma.sh/jinchul112-d9440e/server/dev`
});
exports.prisma = new exports.Prisma();
