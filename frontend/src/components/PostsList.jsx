/* Shariff Muhammad u23611732 */

import { Link } from 'react-router-dom';
import { imageSrc } from '../api';

import './PostsList.css';

function PostsList({ posts }){

  return (
    <div className="posts-list">
      <h3>Posts ({posts.length})</h3>

      {posts.length === 0 ? (
        <p className="posts-list__empty">No posts yet.</p>
      ) : (
        <div className="posts-list__grid">
          {posts.map((post) => (
            <Link to={`/post/${post._id}`} key={post._id} className="posts-list__item">
              <img src={imageSrc(post.imageUrl)} alt={post.description} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
  
}

export default PostsList;