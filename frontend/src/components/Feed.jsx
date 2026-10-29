/* Shariff Muhammad 23611732 */

import { useEffect, useState } from 'react';

import { useAuth } from '../context/AuthContext';
import { API_URL } from '../api';
import PostPreview from './PostPreview';
import AlbumActivity from './AlbumActivity';

import './Feed.css';

function Feed(){

  const { user } = useAuth();

  const [scope, setScope] = useState('local');
  const [sort, setSort] = useState('newest');
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadFeed(){

      try {
        const params = new URLSearchParams({ userId: user._id, scope, sort });
        const response = await fetch(`${API_URL}/feed?${params}`);
        const data = await response.json();

        if (cancelled) return;

        if (!data.success){
          setError(data.message);
          return;
        }

        setError('');
        setItems(data.items);
      } catch {
        if (!cancelled) setError('Could not load the feed.');
      }

    }

    loadFeed();
    return () => {
      cancelled = true;
    };
  }, [user._id, scope, sort]);

  function changeScope(newScope){

    setItems(null);
    setScope(newScope);

  }

  function changeSort(newSort){

    setItems(null);
    setSort(newSort);

  }

  const tabClass = (active) => (active ? 'feed__tab feed__tab--active' : 'feed__tab');

  return (
    <div className="feed">
      <div className="feed__controls">
        <div className="feed__group">
          <button className={tabClass(scope === 'local')} onClick={() => changeScope('local')}>
            Friends
          </button>
          <button className={tabClass(scope === 'global')} onClick={() => changeScope('global')}>
            Global
          </button>
        </div>

        <div className="feed__group" role="group" aria-label="Sort the feed">
          <span className="feed__group-label">Sort by</span>
          <button className={tabClass(sort === 'newest')} onClick={() => changeSort('newest')}>
            Newest
          </button>
          <button className={tabClass(sort === 'comments')} onClick={() => changeSort('comments')}>
            Most commented
          </button>
        </div>
      </div>

      {error && <p className="feed__message">{error}</p>}
      {!error && items === null && <p className="feed__message">Loading feed...</p>}

      {!error && items !== null && items.length === 0 && (
        <p className="feed__message">
          Nothing here yet.{' '}
          {scope === 'local' && 'Add some friends, share a photo, or check the Global feed.'}
        </p>
      )}

      {!error && items !== null && items.length > 0 && (
        <ul className="feed__list">
          {items.map((item) => (
            <li
              key={`${item.type}-${item.type === 'post' ? item.post._id : item.album._id}`}
              className="feed__item"
            >
              {item.type === 'post' ? (
                <PostPreview post={item.post} />
              ) : (
                <AlbumActivity album={item.album} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
}

export default Feed;