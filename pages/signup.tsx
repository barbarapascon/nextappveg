// pages/signup.tsx
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import Link from 'next/link';

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

function SignUp() {
  const [signUp, { loading, error }] = useMutation(SIGNUP_MUTATION);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const { data } = await signUp({ variables: { username, password } });
      
      // If registration was successful, store the token and redirect to dashboard or timeline.
      if (data && data.signUp.token) {
        localStorage.setItem('AUTH_TOKEN', data.signUp.token);
        router.push('/dashboard'); // or '/timeline' if you have that route.
      }
    } catch (err) {
      console.error("Signup Error:", err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" required />
        </div>
        <button type="submit" disabled={loading}>
          Sign Up
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <p>Already have an account? <Link href="/login">Log in</Link></p>
    </div>
  );
}

export default SignUp;
