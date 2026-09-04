import { useState } from 'react';

import Image from './Image';
import Comments from './Comments';
import EditPost from './EditPost';

import './Post.css';

function Post({ post, isOwner, onPrev, onNext }){

  const [editing, setEditing] = useState(false);

  if (editing){
    return <EditPost post={post} onClose={() => setEditing(false)} />;
  }

  return (
    <article className="post">
      <Image imageUrl={post.imageUrl} description={post.description} onPrev={onPrev} onNext={onNext} />

      <div className="post__body">
        <span className="post__author">@{post.username}</span>
        <p className="post__description">{post.description}</p>

        <div className="post__hashtags">
          {post.hashtags.map((tag) => (
            <span key={tag} className="post__hashtag">{tag}</span>
          ))}
        </div>

        <div className="post__meta">
          <span>{post.likes} likes</span>
        </div>

        {isOwner && (
          <button className="post__edit-btn" onClick={() => setEditing(true)}>
            Edit Post
          </button>
        )}
      </div>

      <Comments comments={post.comments} />
    </article>
  );
  
}

export default Post;