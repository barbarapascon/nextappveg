import gql from 'graphql-tag';
import React from 'react';

//tests
import { useMockedQuery } from '../hooks/useMockedQuery';
import { LikeIcon, Button } from '../styles/styledComponents';

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
      <Button onClick={likePost} disabled={loading}>
      <LikeIcon />
           
      </Button>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default LikeButton;
