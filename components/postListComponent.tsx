// components/PostList.tsx
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import UnlikeButton from './unlikeButtonComponent';
import LikeButton from './likeButtonComponent';

//tests
import { useMockedQuery } from '../hooks/useMockedQuery'; // Import the mocked hook


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
  // Example mock data
  const mockPostsData = {
    timelinePosts: [
      {
        id: '1',
        content: 'lets go vegan ihuuuu',
        likesCount: 5,
        likedByUser: false,
        author: { username: 'MockedUser' },
      },
      // ... other mocked posts
    ],
  };

  // Use the mocked hook instead of the real one
  const { data, error, loading } = useMockedQuery(TIMELINE_QUERY, { mockData: mockPostsData });

// const { loading, error, data } = useQuery(TIMELINE_QUERY);

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
