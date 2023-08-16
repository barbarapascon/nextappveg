import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from './apollo/type-defs';
import { resolvers } from './apollo/resolvers';
import { Neo4jGraphQL } from '@neo4j/graphql';
import { driver } from '../../util/neo4j';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'YOUR_SECRET_KEY';

const contextFunction = ({ req }) => {
    const token = req.headers.authorization || '';
    let userId;
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        userId = decodedToken?.userId;
    } catch (e) {
        // implement
    }

    return {
        driver,
        req: {
            ...req,
            userId,
        },
    };
};

const neoSchema = new Neo4jGraphQL({
    typeDefs,
    resolvers,
});

// Initiate the ApolloServer outside the handler
let apolloServer;

async function startServer() {
    const schema = await neoSchema.getSchema();
    apolloServer = new ApolloServer({
        schema,
        context: contextFunction,
        introspection: true,
    });
    await apolloServer.start();
}

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (!apolloServer) {
        await startServer();
    }

    return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}
