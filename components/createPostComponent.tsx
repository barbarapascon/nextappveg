// components/CreatePost.tsx
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($content: String!) {
    createPost(content: $content) {
      id
      content
    }
  }
`;

function CreatePost() {
  const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;

    await createPost({ variables: { content } });
    // You may want to add some logic here like refreshing the list of posts.
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
