import gql from 'graphql-tag';
//tests
import { useMockedQuery } from '../hooks/useMockedQuery';

const LIKE_POST_MUTATION = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likesCount
      likedByUser
    }
  }
`;

function LikeButton({ postId }) {
  const mockResponse = {
    data: {
      likePost: {
        id: postId,
        likesCount: 42,   // arbitrary mocked number
        likedByUser: true,
      },
    },
  };

  const { execute: likePost, error, loading } = useMockedQuery(LIKE_POST_MUTATION, { mockData: mockResponse });

  return (
    <div>
      <button onClick={likePost} disabled={loading}>
        Like
      </button>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default LikeButton;
