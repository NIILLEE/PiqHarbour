/* Shariff Muhammad 23611732 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchInput.css';

function SearchInput({ initialValue = '' }){

  const [term, setTerm] = useState(initialValue);
  const navigate = useNavigate();

  function handleSubmit(e){

    e.preventDefault();

    const trimmed = term.trim();

    if (!trimmed) return;

    navigate(`/search?q=${encodeURIComponent(trimmed)}`);

  }

  return (
    <form className="search-input" onSubmit={handleSubmit} role="search">
      <input
        type="text"
        placeholder="Search people, posts, albums, #tags"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        aria-label="Search"
      />
      <button type="submit">Search</button>
    </form>
  );
  
}

export default SearchInput;