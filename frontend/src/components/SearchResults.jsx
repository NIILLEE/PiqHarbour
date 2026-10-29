/* Shariff Muhammad u23611732 */

import { Link } from 'react-router-dom';
import ProfilePreview from './ProfilePreview';
import PostsList from './PostsList';
import AlbumsList from './AlbumsList';
import './SearchResults.css';

function SearchResults({ query, results }){

  const { users, posts, albums, hashtags } = results;
  const total = users.length + posts.length + albums.length + hashtags.length;

  if (total === 0){
    return <p className="page-message">No results for “{query}”.</p>;
  }

  return (
    <div className="search-results">
      <h1 className="search-results__title">Results for “{query}”</h1>

      {users.length > 0 && (
        <section className="search-results__section">
          <h3>People ({users.length})</h3>
          <div className="search-results__people">
            {users.map((user) => (
              <ProfilePreview key={user._id} user={user} />
            ))}
          </div>
        </section>
      )}

      {hashtags.length > 0 && (
        <section className="search-results__section">
          <h3>Hashtags ({hashtags.length})</h3>
          <div className="search-results__tags">
            {hashtags.map(({ tag, count }) => (
              <Link
                key={tag}
                to={`/search?q=${encodeURIComponent(`#${tag}`)}`}
                className="search-results__tag"
              >
                #{tag} <span>({count})</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {posts.length > 0 && <PostsList posts={posts} />}
      {albums.length > 0 && <AlbumsList albums={albums} />}
    </div>
  );
  
}

export default SearchResults;