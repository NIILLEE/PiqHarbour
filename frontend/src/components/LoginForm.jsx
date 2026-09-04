import { useState } from 'react';
import './AuthForm.css';

function LoginForm(){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

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

    if (validate()){
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            console.log('Login response:', data);
        } catch(err){
            console.error('Login request failed:', err);
        }
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
      {errors.password && <span className="auth-form__error">{errors.password}</span>}

      <button type="submit">Log In</button>
    </form>
  );
  
}

export default LoginForm;