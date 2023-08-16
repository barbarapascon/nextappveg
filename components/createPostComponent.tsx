import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useMockedQuery } from '../hooks/useMockedQuery';
import { useState } from 'react';
import { AddIcon, ToggleButton } from '../styles/styledComponents';
const CREATE_POST_MUTATION = gql`
  mutation CreatePost($content: String!) {
    createPost(content: $content) {
      id
      content
    }
  }
`;

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: rgba(0, 0, 0, 0.4); // Semi-transparent background
`;
const CreatePostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: lightgreen;
`;


const Card = styled.div`
position: relative; // This is added
width: 90%;
max-width: 800px;
padding: 40px;
border-radius: 15px;
box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
background-color: white;
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #C8A2C8;
  border-radius: 5px;
  width: 100%;
  min-height: 150px;
  margin-bottom: 15px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #C8A2C8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
`;

const Error = styled.p`
  color: red;
  text-align: center;
  margin-top: 20px;
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #C8A2C8;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
`;

function CreatePost() {
  const [showForm, setShowForm] = useState(false);
  const mockResponse = {
    createPost: {
      id: 'mocked-id',
      content: 'This is a mocked post content',
    },
  };

  const { execute: createPost, error, loading } = useMockedQuery(CREATE_POST_MUTATION, { mockData: mockResponse });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    await createPost();
  };

  return (
    <CreatePostContainer>
      {/* The main "Create New Post" button is always visible */}
      <ToggleButton onClick={() => setShowForm(true)}>  {/* Explicitly set to "true" */}
        <AddIcon></AddIcon>
      </ToggleButton>

      {/* The form appears as an overlay */}
      {showForm && (
        <Container>
          <Card>
            {/* Close Button inside the Card */}
            <CloseButton onClick={() => setShowForm(false)}>&times;</CloseButton>
            <Form onSubmit={handleSubmit}>
              <Textarea name="content" placeholder="What's on your mind?" required />
              <Button type="submit" disabled={loading}>
                Post
              </Button>
            </Form>
            {error && <Error>Error: {error.message}</Error>}
          </Card>
        </Container>
      )}
    </CreatePostContainer>
  );
}
export default CreatePost;
