import { Link } from 'react-router-dom';
import './PostsList.css';

function PostsList({ posts }) {
  return (
    <div className="posts-list">
      <h3>Posts ({posts.length})</h3>
      <div className="posts-list__grid">
        {posts.map((post) => (
          <Link to={`/post/${post.id}`} key={post.id} className="posts-list__item">
            <img src={post.imageUrl} alt={post.description} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PostsList;