// components/UnlikeButton.tsx
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

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
  const [unlikePost, { loading }] = useMutation(UNLIKE_POST_MUTATION, {
    variables: { postId },
    // Consider using the cache to immediately update the UI
  });

  return (
    <button onClick={() => unlikePost()} disabled={loading}>
      Unlike
    </button>
  );
}

export default UnlikeButton;
