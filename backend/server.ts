import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import neo4j, { Session, session } from 'neo4j-driver';
import { NextApiRequest } from 'next'; // Adjust this import as per NextAuth.js documentation

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
    likePost(postId: ID!): Post!
    unlikePost(postId: ID!): Post!
    createPost(content: String!): Post!
  }
`;

const resolvers = {
  Query: {
    posts: async () => {
      const session = driver.session();
      const result = await session.run('MATCH (p:Post) RETURN p');
      session.close();
      return result.records.map((record) => record.get('p').properties);
    },
  },
  Mutation: {
    likePost: async (_, { postId }) => {
      const session = driver.session();
      const result = await session.run('MATCH (p:Post {id: $postId}) SET p.likes = p.likes + 1 RETURN p', {
        postId,
      });
      session.close();
      return result.records[0].get('p').properties;
    },
    unlikePost: async (_, { postId }) => {
      const session = driver.session();
      const result = await session.run('MATCH (p:Post {id: $postId}) SET p.likes = p.likes - 1 RETURN p', {
        postId,
      });
      session.close();
      return result.records[0].get('p').properties;
    },
    createPost: async (_, { content }, { user }: { user?: Session }) => {
      if (!user) {
        throw new Error('Authentication required');
      }

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
    user: session({ req } as unknown as NextApiRequest).user,
  }),
});

const app = express();
server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
