import { useState } from 'react';
import './AuthForm.css';

function SignUpForm(){

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

    if (validate()){
      try {
        const response = await fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password }),
        });
        const data = await response.json();
        console.log('Signup response:', data);
      } catch (err) {
        console.error('Signup request failed:', err);
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
      {errors.confirmPassword && (
        <span className="auth-form__error">{errors.confirmPassword}</span>
      )}

      <button type="submit">Sign Up</button>
    </form>
  );
  
}

export default SignUpForm;