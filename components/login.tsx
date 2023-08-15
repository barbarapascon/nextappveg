import { signIn } from 'next-auth/react';
import React, { useState } from 'react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const result = await signIn('credentials', {
      username,
      password,
      redirect: false, // We'll handle redirection manually
    });

    if (result.error) {
      alert('Login failed. Please check your credentials.');
    } else {
      // Redirect to dashboard or wherever you want
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
