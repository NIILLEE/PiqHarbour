/* Shariff Muhammad 23611732 */

import { useState } from 'react';
import { Link } from 'react-router-dom';

import ActivityHeader from './ActivityHeader';

import { imageSrc } from '../api';
import { formatHashtag } from '../utils/hashtags';

import './PostPreview.css';

const HIDE_AFTER_REPORTS = 2;

function PostPreview({ post }){

  const [showAnyway, setShowAnyway] = useState(false);
  const isHidden = post.reportCount > HIDE_AFTER_REPORTS && !showAnyway;

  return (
    <article className="post-preview">
      <ActivityHeader owner={post.owner} date={post.createdAt}>
        shared a photo
      </ActivityHeader>

      {isHidden ? (
        <div className="post-preview__hidden">
          <p>This post has been reported by several users and is hidden.</p>
          <button onClick={() => setShowAnyway(true)}>View post anyway</button>
        </div>
      ) : (
        <>
          <Link to={`/post/${post._id}`}>
            <img
              src={imageSrc(post.imageUrl)}
              alt={post.description}
              className="post-preview__image"
            />
          </Link>

          <p className="post-preview__description">{post.description}</p>

          <div className="post-preview__hashtags">
            {post.hashtags.map((tag) => (
              <Link
                key={tag}
                to={`/search?q=${encodeURIComponent(formatHashtag(tag))}`}
                className="post-preview__hashtag"
              >
                {formatHashtag(tag)}
              </Link>
            ))}
          </div>

          {post.comments.length > 0 && (
            <ul className="post-preview__comments">
              {post.comments.map((comment) => (
                <li key={comment._id}>
                  <strong>@{comment.user ? comment.user.username : 'deleted user'}</strong>{' '}
                  {comment.text}
                </li>
              ))}
            </ul>
          )}

          <Link to={`/post/${post._id}`} className="post-preview__link">
            View post and comments ({post.commentCount})
          </Link>
        </>
      )}
    </article>
  );
  
}

export default PostPreview;