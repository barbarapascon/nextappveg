import { ApolloServer, gql } from 'apollo-server';
import neo4j from 'neo4j-driver';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';

const driver = neo4j.driver(
  'bolt://localhost:7687', // Neo4j URL
  neo4j.auth.basic('neo4j', 'password') // Neo4j credentials
);

const typeDefs = gql`
  type Post {
    id: ID!
    content: String!
    likes: Int!
  }

  type Query {
    posts: [Post!]!
  }

  type Mutation {
    createPost(content: String!): Post!
    # Define other mutations here
  }
`;

const resolvers = {
  Query: {
    // Implement queries as needed
  },
  Mutation: {
    createPost: async (_, { content }, { user }: { user?: Session }) => {
      // Check if the user is authenticated
      if (!user) {
        throw new Error('Authentication required');
      }

      // Implement creating a post using your database and Neo4j logic
      const session = driver.session();
      const result = await session.run('CREATE (p:Post {content: $content, likes: 0}) RETURN p', {
        content,
      });
      session.close();
      return result.records[0].get('p').properties;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    user: (req as NextApiRequest).session?.user,
  }),
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
