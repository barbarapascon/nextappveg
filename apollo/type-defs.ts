// apollo/type-defs.ts
import { gql } from '@apollo/client';

// Define your GraphQL schema types and queries/mutations
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
    # Define other mutations here
  }
`;

export default typeDefs;
