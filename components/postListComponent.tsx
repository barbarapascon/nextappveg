// components/PostList.tsx
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import UnlikeButton from './unlikeButtonComponent';
import LikeButton from './likeButtonComponent';

const TIMELINE_QUERY = gql`
  query TimelinePosts {
    timelinePosts {
      id
      content
      likesCount
      likedByUser
      author {
        username
      }
    }
  }
`;

function PostList() {
  const { loading, error, data } = useQuery(TIMELINE_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.timelinePosts.map((post) => (
        <div key={post.id}>
          <p>{post.content}</p>
          <small>By {post.author.username}</small>
          <div>
            {post.likedByUser ? (
              //create LikeButton and UnlikeButton components below.
              <UnlikeButton postId={post.id} />
            ) : (
              <LikeButton postId={post.id} />
            )}
            <span>{post.likesCount} likes</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
