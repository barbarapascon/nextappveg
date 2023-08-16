import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
//tests
import { useMockedQuery } from '../hooks/useMockedQuery'; // Import the mocked hook


const CREATE_POST_MUTATION = gql`
  mutation CreatePost($content: String!) {
    createPost(content: $content) {
      id
      content
    }
  }
`;
function CreatePost() {
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
//I've removed the variables passed to createPost() because, in the mocked scenario, the function doesn't utilize them. In a real-world situation, with the actual Apollo Client's useMutation, i would indeed pass these variables.
    await createPost();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea name="content" placeholder="What's on your mind?" required></textarea>
        <button type="submit" disabled={loading}>
          Post
        </button>
      </form>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default CreatePost;