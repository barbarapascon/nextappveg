import styled from 'styled-components';
import { useState } from 'react';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMockedQuery } from '../hooks/useMockedQuery';
import { Header, LogoutButton } from '../styles/styledComponents';

const SIGNUP_MUTATION = gql`
  mutation SignUp($username: String!, $password: String!) {
    signUp(username: $username, password: $password) {
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
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const Title = styled.h1`
  font-size: 1.5em;
  margin-bottom: 20px;
  color:  #C8A2C8;;
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
  border: 1px solid  #C8A2C8;;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color:  #C8A2C8;;
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

const LoginText = styled.p`
  text-align: center;
`;

const LoginLink = styled.a`
  color: lilac;
  text-decoration: underline;
`;

function SignUp() {
  const mockResponse = {
    signUp: {
      token: 'mocked-token',
      user: {
        id: 'mocked-id',
        username: 'MockedUsernameForSignUp'
      }
    }
  };

  const { execute: signUp, data, loading, error } = useMockedQuery(SIGNUP_MUTATION, { mockData: mockResponse });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
  // try {
    //   const { data } = await signUp({ variables: { username, password } });
      
    //   // If registration was successful, store the token and redirect to dashboard or timeline.
    //   if (data && data.signUp.token) {
    //     localStorage.setItem('AUTH_TOKEN', data.signUp.token);
    //     router.push('/dashboard'); // or '/timeline' if you have that route.
    //   }


    try {
      const result = await signUp();
      if (result) {
        localStorage.setItem('AUTH_TOKEN', data.signUp.token);
        router.push('/home');
      }
    } catch (err) {
      console.error("Signup Error:", err.message);
    }
  };

  return (
    <Container>
    <Header>VEGANHIVE
    <Link legacyBehavior href="/login">
        
    <LogoutButton>Login</LogoutButton>  
    </Link>
    </Header>  {/* Add your app name or whatever text you want */}
   
    <Container>
      <Card>
        <Title>Sign Up</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Username:</Label>
            <Input type="text" name="username" required />
          </InputGroup>
          <InputGroup>
            <Label>Password:</Label>
            <Input type="password" name="password" required />
          </InputGroup>
          <Button type="submit" disabled={loading}>
            Sign Up
          </Button>
        </Form>

        {loading && <Status>Loading...</Status>}
        {error && <Error>Error: {error.message}</Error>}
        <LoginText>
          Already have an account? 
          <Link legacyBehavior href="/login">
            <LoginLink>Log in</LoginLink>
          </Link>
        </LoginText>
      </Card>
    </Container>
    </Container>
  );
}

export default SignUp;
