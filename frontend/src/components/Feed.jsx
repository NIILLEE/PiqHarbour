import { useState } from 'react';
import PostPreview from './PostPreview';
import './Feed.css';

function Feed({ posts }){
  const [view, setView] = useState('local'); // 'local' | 'global'

  return (
    <div className="feed">
      <div className="feed__tabs">
        <button
          className={view === 'local' ? 'feed__tab feed__tab--active' : 'feed__tab'}
          onClick={() => setView('local')}
        >
          Friends
        </button>
        <button
          className={view === 'global' ? 'feed__tab feed__tab--active' : 'feed__tab'}
          onClick={() => setView('global')}
        >
          Global
        </button>
      </div>

      <div className="feed__list">
        {posts.map((post) => (
          <PostPreview key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
  
}

export default Feed;