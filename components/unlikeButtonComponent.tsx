import gql from 'graphql-tag';
//tests
import { useMockedQuery } from '../hooks/useMockedQuery';

const UNLIKE_POST_MUTATION = gql`
  mutation UnlikePost($postId: ID!) {
    unlikePost(postId: $postId) {
      id
      likesCount
      likedByUser
    }
  }
`;
function UnlikeButton({ postId }) {
  const mockResponse = {
    unlikePost: {
      id: postId,
      likesCount: 8, // some mocked value
      likedByUser: false,
    },
  };

  const { execute: unlikePost, error, loading } = useMockedQuery(UNLIKE_POST_MUTATION, { mockData: mockResponse });
  // const [unlikePost, { loading }] = useMutation(UNLIKE_POST_MUTATION, {
  //   variables: { postId },
  //   // Consider using the cache to immediately update the UI
  // });
  return (
    <div>
      <button onClick={unlikePost} disabled={loading}>
        Unlike
      </button>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default UnlikeButton;
