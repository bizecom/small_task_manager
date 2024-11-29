import React, { useState } from 'react';
import { register } from '../api/auth/register';
import { NavLink, useNavigate } from 'react-router';
import Cookies from 'js-cookie';

function Register() {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      Cookies.set('token', token, { expires: 1 });
      Cookies.set('user', user, { expires: 1 });
      navigate('/');
    } catch (err) {
      setError(err || 'Login failed');
    }
  };

  return (
    <div className='w-full h-screen flex flex-col gap-5 justify-center items-center'>
      <div className='p-5 bg-gray-200 shadow-sm rounded-md'>
        <h1 className='text-lg mb-2 font-weight-bold'>Register</h1>
        <form onSubmit={handleRegister} className='flex flex-col gap-5'>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <div className='flex gap-5 items-center w-full'>
            <button type="submit" className='w-full'>Register</button>
            <NavLink to="/login">Login</NavLink>
          </div>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Register;
