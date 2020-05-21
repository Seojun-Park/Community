import "./env";
import { GraphQLServer } from "graphql-yoga";
import schema from "./schemas";
import logger from "morgan";
import { uploadMiddleware, uploadController } from "./upload"

import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.express.post("/upload", uploadMiddleware, uploadController);

server.start({ port: PORT }, () =>
  console.log(`server running on Port ${PORT}`)
);
