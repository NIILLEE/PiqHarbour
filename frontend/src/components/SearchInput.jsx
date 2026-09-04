import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchInput.css';

function SearchInput() {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e){

    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(term)}`);

  }

  return (

    <form className="search-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search users, posts, albums, #hashtags..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        aria-label="Search"
      />
      <button type="submit">Search</button>
    </form>
  );

}

export default SearchInput;