// pages/Home.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import CreatePost from "../components/createPostComponent";
import PostList from "../components/postListComponent";
import { useMockedQuery } from '../hooks/useMockedQuery'; // Import the mocked hook

// The 'me' query to fetch details of the currently authenticated user.
const ME_QUERY = gql`
  query {
    me {
      id
      username
    }
  }
`;

function Home() {
  const router = useRouter();

  const mockResponse = {
    me: {
      id: 'mocked-id',
      username: 'MockedUsername'
    },
  };
  
const { data, loading, error } = useMockedQuery(ME_QUERY, { mockData: mockResponse });
//const { data, loading, error } = useQuery(ME_QUERY);
  useEffect(() => {
    if (!loading && !data?.me) {
      // If not authenticated, redirect to the login page.
      router.push("/login");
    }
  }, [loading, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Welcome, {data.me.username}!</h1>
      <CreatePost />
      <h2>Your Timeline</h2>
      <PostList />
    </div>
  );
}

export default Home;
