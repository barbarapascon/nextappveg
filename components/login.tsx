import { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import Link from 'next/link';

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

function Login() {
  const [logIn, { loading, error }] = useMutation(LOGIN_MUTATION);
  const [loginError, setLoginError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const { data } = await logIn({ variables: { username, password } });

      if (data) {
        localStorage.setItem('AUTH_TOKEN', data.logIn.token);
        router.push('/dashboard');
      }

    } catch (err) {
      setLoginError(err.message);
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
          Login
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {(error || loginError) && <p>Error: {error?.message || loginError}</p>}
      <p>
        Don't have an account? <Link href="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;
