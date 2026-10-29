import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../api';

import { useState } from 'react';
import './AuthForm.css';

function LoginForm(){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const [serverError, setServerError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  function validate(){

    const newErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (password.trim().length === 0) {
      newErrors.password = 'Password is required.';
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

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!data.success){
        setServerError(data.message);
        return;
      }

      login(data.user);
      navigate('/home');
    } catch {
      setServerError('An unexpected error occurred. Please try again later.');
    }

  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <h2>Log In</h2>

      <label htmlFor="login-email">Email</label>
      <input
        type="email"
        id="login-email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <span className="auth-form__error">{errors.email}</span>}

      <label htmlFor="login-password">Password</label>
      <input
        type="password"
        id="login-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {serverError && <span className="auth-form__error">{serverError}</span>}

      <button type="submit">Log In</button>
    </form>
  );
  
}

export default LoginForm;