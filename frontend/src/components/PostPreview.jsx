import { Link } from 'react-router-dom';
import './PostPreview.css';

function PostPreview({ post }){

  const visibleComments = post.comments.slice(0, 2);

  return (
    <article className="post-preview">
      <Link to={`/profile/${post.username}`} className="post-preview__author">
        @{post.username}
      </Link>

      <Link to={`/post/${post.id}`}>
        <img
          src={post.imageUrl}
          alt={post.description}
          className="post-preview__image"
        />
      </Link>

      <p className="post-preview__description">{post.description}</p>

      <div className="post-preview__hashtags">
        {post.hashtags.map((tag) => (
          <span key={tag} className="post-preview__hashtag">
            {tag}
          </span>
        ))}
      </div>

      <div className="post-preview__meta">
        <span>{post.likes} likes</span>
        <Link to={`/post/${post.id}`}>
          {post.comments.length} comments
        </Link>
      </div>

      {visibleComments.length > 0 && (
        <ul className="post-preview__comments">
          {visibleComments.map((comment) => (
            <li key={comment.id}>
              <strong>@{comment.username}</strong> {comment.text}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
  
}

export default PostPreview;