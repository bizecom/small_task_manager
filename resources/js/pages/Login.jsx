import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { login } from '../api/auth/login';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await login(email, password);
      Cookies.set('token', token, { expires: 1 });
      Cookies.set('user', user, { expires: 1 });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className='w-full h-screen flex flex-col gap-5 justify-center items-center'>
      <div className='p-5 bg-gray-200 shadow-sm rounded-md'>
      <h1 className='text-lg mb-2 font-weight-bold'>Login</h1>
      <form onSubmit={handleLogin} className='flex flex-col gap-5'>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='flex gap-5 items-center w-full'>
          <button type="submit" className='w-full'>Login</button>
          <NavLink to="/register">Register</NavLink>
        </div>
        {error && <p>{error}</p>}
      </form>
      </div>
    </div>
  );
}

export default Login;
