import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import v1 from 'neo4j-driver';
import typeDefs from '../apollo/type-defs';
import { resolvers } from '../apollo/resolvers';

const driver = v1.driver(
    'bolt://localhost:7687',
    v1.auth.basic('neo4j', 'test')
);

const context = ({ req }: any) => {
    return {
        driver,
        req
    };
};

const server = new ApolloServer({
    typeDefs: gql`${typeDefs}`,
    resolvers,
    context,
    introspection: true
});

const app = express();
server.applyMiddleware({ app, path: '/api/graphql' });

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
