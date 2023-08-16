// pages/Home.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import { gql, useApolloClient } from "@apollo/client";
import CreatePost from "../components/createPostComponent";
import PostList from "../components/postListComponent";
import { useMockedQuery } from '../hooks/useMockedQuery'; // Import the mocked hook
import { AppIcon, Container, Header, LogoutButton, Subtitle, WelcomeMessage } from "../styles/styledComponents";
// Styled components
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
  const client = useApolloClient();  // Using Apollo Client's hook

  const logout = () => {
    localStorage.removeItem("authToken"); 
    client.resetStore();
    router.push("/login");
  };
  const mockResponse = {
    me: {
      id: 'mocked-id',
      username: 'BarbaraPascon'
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
    <Container>
      <Header>
      <AppIcon/>
      VEGANHIVE
      <LogoutButton onClick={logout}>Logout</LogoutButton>
      </Header>  {/* Add your app name or whatever text you want */}
      <WelcomeMessage>Welcome, <span>{data.me.username}!</span></WelcomeMessage>
      <CreatePost />
      <Subtitle>See what peopple are talking about:</Subtitle>
      <PostList />
    </Container>
  );
}

export default Home;
