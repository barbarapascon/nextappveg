import React from 'react';
import styled from 'styled-components';

import Comment from './commentComponent';

interface CommentListProps {
  comments: { author: string; text: string }[];
}

const CommentsContainer = styled.div`
  margin-top: 2px;
  border-top: 2px solid #C8A2C8;
  padding-top: 8px;
`;

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (!comments || comments.length === 0) return null;

  return (
    <CommentsContainer>
      {comments.map((comment, index) => (
        <Comment
         key={index} author={comment.author} text={comment.text}></Comment>
      ))}
    </CommentsContainer>
  );
}

export default CommentList;
