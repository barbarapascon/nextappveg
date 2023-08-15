import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { gql } from "apollo-server";
import CreatePost from "../components/createPostComponent";
import PostList from "../components/postListComponent";

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

  // Execute the 'me' query to verify user authentication.
  const { data, loading, error } = useQuery(ME_QUERY);

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
