import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import UnlikeButton from './unlikeButtonComponent';
import LikeButton from './likeButtonComponent';
import { useMockedQuery } from '../hooks/useMockedQuery';

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
`;

const Post = styled.div`
  background-color: white;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const Content = styled.p`
  color: gray;
  font-size: 16px;
  margin-bottom: 10px;
`;

const Author = styled.small`
  display: block;
  color: lilac;
  margin-bottom: 10px;
`;

const InteractionArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LikeCount = styled.span`
  color: lilac;
`;

function PostList() {
  const mockPostsData = {
    timelinePosts: [
      {
        id: '1',
        content: "Meal Prep Monday: Ep. 3! 🫐🥬🥕 Say goodbye 👋 to soggy produce languishing in plastic bags in the back of your fridge. It’s time to show our fruit and veggies the TLC they deserve, and to transform your fridge from a produce graveyard 🪦 to a flourishing garden! 🪴The most life-changing tip is to actually WASH your produce to get off any bacteria and mold spores, which will help it stay fresh so much longer. As soon as you get home from the grocery store, unpack your produce and give it a bath 🍓🛁. I’m using @ForceofNatureClean (ad), which is a multi-purpose cleaner that starts with just salt, water and vinegar. It’s family-friendly, contains zero toxic chemicals and kills 99.9% of viruses and bacteria. You can use it to clean your kitchen, bathroom, any surfaces in your home...the sky ☀️☁️ is the limit. Tap the link in my Stories to check them out and use code VEGAN40 to save 40% on bundles, plus free shipping STRAWBERRIES 🍓 Wash, dry completely, and store in a towel-lined container in the fridge. Try these tips and I GUARANTEE it will save you money on lost produce that goes bad in your fridge. xo",
        likesCount: 5,
        likedByUser: false,
        author: { username: 'VeganBunny' },
      },
      {
        id: '2',
        content: 'A new book is aiming to educate vegan children about common misconceptions about the lifestyle, while giving them the tools to respond to criticism. Titled 50 Comebacks For Vegan Kids, the book explores 50 common myths about the plant-based diet in terms of health, the planet, and animals. Solomon Tadlock, the 12-year-old son of renowned plant-based physician Brooke Goldner, wrote the book.       Goldner is a best-selling author who says that she reversed lupus on a plant-based diet. She has written two books endorsing the benefits of animal-free eating, Goodbye Autoimmune Disease and Goodbye Lupus. Taking to Instagram to post about her son’s recent TV appearance on Houston channel KPRC-TV, she said she was “so proud” of his achievement. She explained that he wrote it to “help empower kids against bullies and also as a resource for information about the science that backs up the benefits of eating plants for health, animals, and the planet.',
        likesCount: 6,
        likedByUser: false,
        author: { username: 'PlantBasedNews' },
      },
      {
        id: '3',
        content: 'lets go vegan ihuuuu, good morning all, whow are you doing?',
        likesCount: 3,
        likedByUser: true,
        author: { username: 'BarbaraPascon' },
      },
      {
        id: '4',
        content: 'New Yorkers, mark your calendars! On August 12, Black VegFest returns to Brooklyn, New York City, to host its Spread Love 2 vegan festival. The event is the non-profit organization’s sixth annual festival. Black VegFest will be hosted at the Weeksville Heritage Center in Crown Heights, Brooklyn, featuring top plant-based eats from more than 75 chefs. The event celebrates the intersection of vegan living and the Black community, hosting panel discussions on Black food cooperatives and social justice. “At Black VegFest, we are engaging with our people, bringing them in and sharing and learning with each other,” Francis Peña, an organizer with Black VegFest, told VegOut. “This is our power. And we want us, our people, to have that power and take it wherever it needs to go.”',
        likesCount: 50,
        likedByUser: false,
        author: { username: 'BlackVeganChannel' },
      },
      // ... other mocked posts
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
        </Post>
      ))}
    </Container>
  );
}

export default PostList;
