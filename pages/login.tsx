import styled from 'styled-components';
import { useState } from 'react';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMockedQuery } from '../hooks/useMockedQuery';
import { AppIcon, Header, LogoutButton } from '../styles/styledComponents';

const LOGIN_MUTATION = gql`
  mutation LogIn($username: String!, $password: String!) {
    logIn(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: lightgreen;
  
`;

const Card = styled.div`
  width: 80%;
  max-width: 400px;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  background-color: white;
`;

const Title = styled.h1`
  font-size: 1.5em;
  margin-bottom: 20px;
  color: #C8A2C8;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  color: gray;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #C8A2C8;
  border-radius: 5px;
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

const Status = styled.p`
  text-align: center;
  margin: 20px 0;
`;

const Error = styled(Status)`
  color: red;
`;

const SignUpText = styled.p`
  text-align: center;
`;

const SignUpLink = styled.a`
  color: #C8A2C8;
  text-decoration: underline;
`;

interface User {
  id: string;
  username: string;
}

interface MockResponse {
  logIn: {
      token: string;
      user: User;
  };
} 

function generateUniqueID() {// just for test
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
} 

export let initialMockResponse = {
    logIn: {
      token: 'mocked-token',
      user: {
        id: '1',
        username: 'BarbaraPascon'
      }
    }
  };
  
function Login() {


  const { execute: logIn, data, loading, error } = useMockedQuery(LOGIN_MUTATION, { mockData: initialMockResponse });
  // const [logIn, { loading, error }] = useMutation(LOGIN_MUTATION);
 const [mockResponses, setMockResponses] = useState<MockResponse[]>([initialMockResponse]);
 const [loginError, setLoginError] = useState<string | null>(null);
  
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const newMockResponse = {
        logIn: {
          token: 'some-mocked-token', 
          user: {
            id: generateUniqueID(),
            username: username
          }
        }
      };
      
      
      initialMockResponse = {
        logIn: {
          token: generateUniqueID(),
          user: {
            id: generateUniqueID(),
            username: username
          }
        }
      };

    try {
      const result = await logIn();//{ variables: { username, password } 

      if (result) {
        localStorage.setItem('AUTH_TOKEN', data.logIn.token);

        router.push('/home');
      }

    } catch (err) {
      setLoginError(err.message);
    }
  };

  return (
    <Container>
    <Header>
    <AppIcon/>
    VEGANHIVE
    <Link legacyBehavior href="/login">
    <LogoutButton>Login</LogoutButton>  
    </Link>
    </Header>  {/*  */}
    <Container>
      <Card>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Username:    </Label>
            <Input type="text" name="username" required />
          </InputGroup>
          <InputGroup>
            <Label>Password:       </Label>
            <Input type="password" name="password" required />
          </InputGroup>
          <Button type="submit" disabled={loading}>
            Login
          </Button>
        </Form>

        {loading && <Status>Loading...</Status>}
        {(error || loginError) && <Error>Error: {error?.message || loginError}</Error>}
        <SignUpText>
          Don't have an account? 
          <Link legacyBehavior href="/signup">
            <SignUpLink>Sign up</SignUpLink>
          </Link>
        </SignUpText>
      </Card>
    </Container>
    </Container>
  );
}

export default Login;
