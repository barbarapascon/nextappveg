// pages/Home.tsx
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import CreatePost from "../components/createpostComponent";
import PostList from "../components/postListComponent";

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
  
  // Execute the 'me' query to get the currently authenticated user's details.
  const { data, loading, error } = useQuery(ME_QUERY);

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
