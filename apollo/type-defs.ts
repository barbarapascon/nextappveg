import { gql } from 'apollo-server';

export const typeDefs = gql`
type User {
  id: ID!
  username: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  content: String!
  author: User!
  likesCount: Int!
  likedByUser: Boolean!
}

type Mutation {
  createPost(content: String!): Post!
  likePost(postId: ID!): Post!
  unlikePost(postId: ID!): Post!
}

type Query {
  timelinePosts: [Post!]!
}
`;
export default typeDefs;