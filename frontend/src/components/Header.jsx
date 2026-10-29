import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import SearchInput from './SearchInput';

import piqhLogo from '../assets/PIQH2.png';
import './Header.css';

function Header() {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';

  function handleLogout(){

    logout();
    navigate('/');

  }

  return (
    <header className="site-header">
      <div className="site-header__brand">
        <img src={piqhLogo} alt="PiqHarbour logo" className="site-header__logo" />
        <span className="site-header__name">PiqHarbour</span>
      </div>

      <nav className="site-header__nav">
        <Link to="/home">Home</Link>
          {user && (
            <Link to={`/profile/${user._id}`} state={{ tab: 'posts' }}>
              Posts
            </Link>
          )}
      </nav>

      <SearchInput key={query} initialValue={query} />

      <div className="site-header__user">
        <Link to={`/profile/${user._id}`}>@{user.username}</Link>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </header>
  );
}

export default Header;