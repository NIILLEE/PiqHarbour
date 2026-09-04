import { useState } from 'react';
import piqhLogo from '../assets/PIQH2.png';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import './SplashPage.css';

function SplashPage(){

  const [activeForm, setActiveForm] = useState(null);

  return (
    <div className="splash">
      <header className="splash__top">
        <div className="splash__brand">
          <img src={piqhLogo} alt="PiqHarbour logo" className="splash__logo" />
          <span className="splash__name">PiqHarbour</span>
        </div>
        <div className="splash__actions">
          <button onClick={() => setActiveForm('login')}>Log In</button>
          <button onClick={() => setActiveForm('signup')}>Sign Up</button>
        </div>
      </header>

      <main className="splash__main">
        {activeForm === null && (
          <div className="splash__panel">
            <h1>A revolutionary platform.</h1>
            <p>
              Share precious moments and anything that matters to you to the
              people that matter, in high quality, maintaining the essence in
              the best way possible.
            </p>
            <p className="splash__tagline">
              PiqHarbour — your high definition photosharing destination.
            </p>
          </div>
        )}
        {activeForm === 'login' && <LoginForm />}
        {activeForm === 'signup' && <SignUpForm />}
      </main>

      <footer className="splash__footer">© 2026 PiqHarbour</footer>
    </div>
  );
  
}

export default SplashPage;