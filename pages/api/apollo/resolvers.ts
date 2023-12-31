
import { AuthenticationError } from 'apollo-server-micro';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'YOUR_SECRET_KEY'; 

export const resolvers = {
  Query: {
    me: async (_, __, { driver, req }) => {
      const userId = req.userId;
      if (!userId) {
        throw new AuthenticationError("You must be logged in!");
      }
      const session = driver.session();
      const user = await session.run(
        "MATCH (u:User) WHERE id(u) = $userId RETURN u",
        { userId }
      );
      session.close();
      return user.records[0].get('u').properties;
    },

    posts: async (_, __, { driver }) => {
      const session = driver.session();
      const posts = await session.run("MATCH (p:Post) RETURN p");
      session.close();
      return posts.records.map(record => record.get('p').properties);
    }
  },

  Mutation: {
    signUp: async (_, { username, password }, { driver }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const session = driver.session();
      const result = await session.run(
        "CREATE (u:User {username: $username, password: $hashedPassword}) RETURN u",
        { username, hashedPassword }
      );
      session.close();
      const user = result.records[0].get('u').properties;
      const token = jwt.sign({ userId: user.id }, JWT_SECRET);
      return { token, user };
    },

    logIn: async (_, { username, password }, { driver }) => {
      const session = driver.session();
      const user = await session.run(
        "MATCH (u:User {username: $username}) RETURN u",
        { username }
      );
      session.close();
      if (user.records.length === 0) {
        throw new AuthenticationError("No such user found!");
      }
      const storedUser = user.records[0].get('u').properties;
      const valid = await bcrypt.compare(password, storedUser.password);
      if (!valid) {
        throw new AuthenticationError("Invalid password!");
      }
      const token = jwt.sign({ userId: storedUser.id }, JWT_SECRET);
      return { token, storedUser };
    },

    createPost: async (_, { content }, { driver, req }) => {
      if (!req.userId) {
        throw new AuthenticationError("You must be logged in!");
      }
      const session = driver.session();
      const post = await session.run(
        "MATCH (u:User) WHERE id(u) = $userId CREATE (p:Post {content: $content, createdAt: datetime()})<-[:CREATED]-(u) RETURN p",
        { userId: req.userId, content }
      );
      session.close();
      return post.records[0].get('p').properties;
    },

    likePost: async (_, { postId }, { driver, req }) => {
      if (!req.userId) {
        throw new AuthenticationError("You must be logged in!");
      }
      const session = driver.session();
      await session.run(
        `
        MATCH (u:User), (p:Post)
        WHERE id(u) = $userId AND id(p) = $postId
        MERGE (u)-[:LIKES]->(p)
        `,
        { userId: req.userId, postId }
      );
      session.close();
      return { id: postId };
    },

    unlikePost: async (_, { postId }, { driver, req }) => {
      if (!req.userId) {
        throw new AuthenticationError("You must be logged in!");
      }
      const session = driver.session();
      await session.run(
        `
        MATCH (u:User)-[r:LIKES]->(p:Post)
        WHERE id(u) = $userId AND id(p) = $postId
        DELETE r
        `,
        { userId: req.userId, postId }
      );
      session.close();
      return { id: postId };
    }
  },

  Post: {
    likesCount: async (post, _, { driver }) => {
      const session = driver.session();
      const result = await session.run(
        'MATCH (p:Post) WHERE id(p) = $postId RETURN SIZE((p)-[:LIKES]->()) as likesCount',
        { postId: post.id }
      );
      session.close();
      return result.records[0].get('likesCount').toNumber();
    },

    likedByUser: async (post, _, { driver, req }) => {
      if (!req.userId) {
        throw new AuthenticationError("You must be logged in to view this.");
      }

      const session = driver.session();
      const result = await session.run(
        `
        MATCH (u:User {id: $userId})-[:LIKES]->(p:Post {id: $postId})
        RETURN EXISTS((u)-[:LIKES]->(p)) as liked
        `,
        { userId: req.userId, postId: post.id }
      );
      session.close();
      return result.records[0].get('liked');
    },
  }
};
