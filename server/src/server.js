import './env';
import { GraphQLServer } from 'graphql-yoga';
import schema from './schemas';
import logger from 'morgan';
import { authenticateJwt } from './passport';
import { isAuthenticated } from './middlewares';

const server = new GraphQLServer({
    schema,
    context: ({ request }) => ({ request, isAuthenticated})
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);


server.start(() => console.log(`server running`));