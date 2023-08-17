import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import UnlikeButton from './unlikeButtonComponent';
import LikeButton from './likeButtonComponent';
import { useMockedQuery } from '../hooks/useMockedQuery';
import CommentList from './ListComentComponent';

const TIMELINE_QUERY = gql`
  query TimelinePosts {
    timelinePosts {
      id
      content
      likesCount
      likedByUser
      author {
        username
      }
    }
  }
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: lightgreen;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const Post = styled.div`
  background-color: white;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const Content = styled.p`
  color: gray;
  font-size: 16px;
  margin-bottom: 10px;
`;

const Author = styled.small`
  display: block;
  color: #C8A2C8;
  margin-bottom: 10px;
`;

const InteractionArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: white;
  padding: 0px;
  border-top: 2px solid #C8A2C8;
`;

const LikeCount = styled.span`
  color: #C8A2C8;
`;

function PostList() {
  const mockPostsData = {
    timelinePosts: [
      {
        id: '1',
        content: "Meal Prep Monday: Ep. 3! 🫐🥬🥕 Say goodbye 👋 to soggy produce ... xo",
        likesCount: 5,
        likedByUser: false,
        author: { username: 'VeganBunny' },
        comments: [
          { author: 'User1', text: 'Great post!' },
          { author: 'User2', text: 'Very informative. Thanks for sharing.' }
        ],
      },
      {
        id: '2',
        content: 'A new book is aiming to educate vegan children about common misconceptions ... benefits of eating plants for health, animals, and the planet.',
        likesCount: 6,
        likedByUser: false,
        author: { username: 'PlantBasedNews' },
        comments: [
          { author: 'Reader1', text: 'Can’t wait to get this book for my kids!' },
          { author: 'Reader2', text: 'This is a game-changer!' }
        ],
      },
      {
        id: '3',
        content: 'lets go vegan ihuuuu, good morning all, whow are you doing?',
        likesCount: 3,
        likedByUser: true,
        author: { username: 'BarbaraPascon' },
        comments: [
          { author: 'Friend1', text: 'Morning! Ready for some vegan breakfast!' },
        ],
      },
      {
        id: '4',
        content: 'veganism is a comprehensive philosophy that encompasses ethics, environmental concerns, and health. At its core, it emphasizes avoiding animal products in all forms, not just in the food we eat, but also in clothing, cosmetics, and everyday items. For many, the journey to veganism starts with empathy towards animals. The modern meat industry is rife with practices that are cruel, inhumane, and deeply unsettling. From battery cages to factory farming, the conditions in which animals are raised and slaughtered can be horrific. Choosing veganism is, for many, a direct stand against these practices. By refraining from consuming meat, dairy, and other animal by-products, vegans vote with their wallets, sending a clear message to industries that profit from animal suffering. Yorkers, mark your calendars! On August 12, Black VegFest ... and take it wherever it needs to go.”',
        likesCount: 50,
        likedByUser: false,
        author: { username: 'BlackVeganChannel' },
        comments: [
          { author: 'NY_Resident', text: 'Definitely attending this!' },
          { author: 'VeganChef', text: 'Can’t wait to showcase my recipes here.' }
        ],
      },
      // ... You can add other mocked posts with comments in a similar manner.
    ],
  };
  const { data, error, loading } = useMockedQuery(TIMELINE_QUERY, { mockData: mockPostsData });
// const { loading, error, data } = useQuery(TIMELINE_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container>
    {data.timelinePosts.map((post) => (
      <Post key={post.id}>
        <Content>{post.content}</Content>
        <Author>By {post.author.username}</Author>
        <InteractionArea>
          {post.likedByUser ? (
            <UnlikeButton postId={post.id} />
          ) : (
            <LikeButton postId={post.id} />
          )}
          <LikeCount>{post.likesCount} likes</LikeCount>
        </InteractionArea>
        {/* Add the CommentList here */}
        <CommentList comments={post.comments} />
      </Post>
    ))}
  </Container>
  );
}

export default PostList;
