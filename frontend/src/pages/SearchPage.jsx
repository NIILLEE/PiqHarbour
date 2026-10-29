/* Shariff Muhammad 23611732 */

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import SearchResults from '../components/SearchResults';
import { API_URL } from '../api';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get('q') ?? '').trim();
  const [results, setResults] = useState(null); // remembers which query it belongs to
  const [error, setError] = useState('');

  useEffect(() => {
    if (!query) return;
    let cancelled = false;

    async function runSearch() {
      try {
        const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        if (cancelled) return;

        if (!data.success) {
          setError(data.message);
          return;
        }

        setError('');
        setResults({ query, ...data });
      } catch {
        if (!cancelled) setError('Search failed. Please try again.');
      }
    }

    runSearch();
    return () => {
      cancelled = true;
    };
  }, [query]);

  let content;
  if (!query) {
    content = (
      <p className="page-message">
        Type something in the search box to find people, posts, albums and hashtags.
      </p>
    );
  } else if (error) {
    content = <p className="page-message">{error}</p>;
  } else if (!results || results.query !== query) {
    content = <p className="page-message">Searching...</p>;
  } else {
    content = <SearchResults query={query} results={results} />;
  }

  return (
    <div>
      <Header />
      <main className="page-main">{content}</main>
    </div>
  );
}

export default SearchPage;