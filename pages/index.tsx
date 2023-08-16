import { useEffect } from "react";
import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import CreatePost from "../components/createPostComponent";
import PostList from "../components/postListComponent";
import { useMockedQuery } from '../hooks/useMockedQuery'; // Import the mocked hook

// The 'me' query is designed to fetch details of the currently authenticated user.
const ME_QUERY = gql`
  query {
    me {
      id
      username
    }
  }
`;

function HomePage() {
  const router = useRouter();

  const mockResponse = {
    me: {
      id: 'mocked-id',
      username: 'BarbaraPascon'
    },
  };

  // Use the mocked query hook with the mock response
  const { data, loading, error } = useMockedQuery(ME_QUERY, { mockData: mockResponse });
//const { data, loading, error } = useQuery(ME_QUERY);
  useEffect(() => {
    if (!loading && !data?.me) {
      // If not authenticated, redirect to the login page.
      router.push("/login");
    }
  }, [loading, data]);

  // While the query is loading, display a loading message.
  if (loading) return <p>Loading...</p>;

  // If the 'me' query results in an error, you might want to handle it. For simplicity, I'll just return null here.
  if (error) return null;

  return (
 
      <div>
        <h1>Welcome, {data.me.username}!</h1>
        <CreatePost />
        <h2>Your Timeline</h2>
        <PostList />
      </div>

  );
}

export default HomePage;
