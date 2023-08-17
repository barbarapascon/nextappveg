import React from 'react';
import styled from 'styled-components';

interface CommentProps {
  author: string;
  text: string;
}

const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 0;
`;

const AuthorAvatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #C8A2C8;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const CommentText = styled.span`
  background-color: lightgreen;
  padding: 6px 10px;
  border-radius: 18px;
  font-size: 14px;
`;

const Comment: React.FC<CommentProps> = ({ author, text }) => {
  return (
    <CommentContainer>
      <AuthorAvatar>{author[0]}</AuthorAvatar> {/* Display first letter of the author */}
      <CommentText>{text}</CommentText>
    </CommentContainer>
  );
}

export default Comment;
