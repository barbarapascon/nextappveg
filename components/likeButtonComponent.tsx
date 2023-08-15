// components/LikeButton.tsx
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

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
  const [likePost, { loading }] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId },
    // Consider using the cache to immediately update the UI
  });

  return (
    <button onClick={() => likePost()} disabled={loading}>
      Like
    </button>
  );
}

export default LikeButton;
