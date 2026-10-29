import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../api';

import './AuthForm.css';

function SignUpForm(){

  const [serverError, setServerError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  function validate(){

    const newErrors = {};

    if (username.trim().length < 3){
      newErrors.username = 'Username must be at least 3 characters.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      newErrors.email = 'Please enter a valid email address.';
    }

    if (password.length < 8){
      newErrors.password = 'Password must be at least 8 characters.';
    }

    if (confirmPassword !== password){
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;

  }

  async function handleSubmit(e){

    e.preventDefault();
    setServerError('');

    if (!validate()){
      return;
    }

    if (validate()){
      try {
        const response = await fetch(`${API_URL}/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (!data.success){
          setServerError(data.message);
          return;
        }

        login(data.user);
        navigate('/home');
      } catch (err) {
        setServerError('An unexpected error occurred. Please try again later.');
      }
    }
    
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <h2>Sign Up</h2>

      <label htmlFor="signup-username">Username</label>
      <input
        type="text"
        id="signup-username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {errors.username && <span className="auth-form__error">{errors.username}</span>}

      <label htmlFor="signup-email">Email</label>
      <input
        type="email"
        id="signup-email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <span className="auth-form__error">{errors.email}</span>}

      <label htmlFor="signup-password">Password</label>
      <input
        type="password"
        id="signup-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <span className="auth-form__error">{errors.password}</span>}

      <label htmlFor="signup-confirm">Confirm Password</label>
      <input
        type="password"
        id="signup-confirm"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {serverError && <span className="auth-error__error">{serverError}</span>}
      <button type="submit">Sign Up</button>
    </form>
  );
  
}

export default SignUpForm;