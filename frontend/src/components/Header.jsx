import { Link } from 'react-router-dom';
import piqhLogo from '../assets/PIQH2.png';
import './Header.css';

function Header() {
  return (
    <header className="site-header">
      <div className="site-header__brand">
        <img src={piqhLogo} alt="PiqHarbour logo" className="site-header__logo" />
        <span className="site-header__name">PiqHarbour</span>
      </div>

      <nav className="site-header__nav">
        <Link to="/home">Home</Link>
        <Link to="/post/1">Posts</Link>
        <Link to="/search">Search</Link>
      </nav>

      <div className="site-header__user">
        <Link to="/profile/1">@username</Link>
      </div>
    </header>
  );
}

export default Header;