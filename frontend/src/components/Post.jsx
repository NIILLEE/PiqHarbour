/* Shariff Muhammad u23611732 */

import { useState } from 'react';
import { Link } from 'react-router-dom';

import Image from './Image';
import Comments from './Comments';
import EditPost from './EditPost';
import ReportPost from './ReportPost';
import PostAlbums from './PostAlbums';

import { formatHashtag } from '../utils/hashtags';

import './Post.css';

function Post({ post, albums, isOwner, alreadyReported, onPrev, onNext, onSave, onDelete, onAddComment, onReport }){

  const [editing, setEditing] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  async function handleSave(updates){

    const message = await onSave(updates);

    if (!message) setEditing(false);

    return message;

  }

  async function handleDelete(){

    const message = await onDelete();

    if (message){
      setDeleteError(message);
      setConfirmingDelete(false);
    }

  }

  if (editing){
    return <EditPost post={post} onSave={handleSave} onClose={() => setEditing(false)} />;
  }

  return (
    <article className="post">
      <Image imageUrl={post.imageUrl} description={post.description} onPrev={onPrev} onNext={onNext} />

      <div className="post__body">
        <Link to={`/profile/${post.owner._id}`} className="post__author">
          @{post.owner.username}
        </Link>
        <p className="post__description">{post.description}</p>

        <div className="post__hashtags">
          {post.hashtags.map((tag) => (
            <Link
              key={tag}
              to={`/search?q=${encodeURIComponent(formatHashtag(tag))}`}
              className="post__hashtag"
            >
              {formatHashtag(tag)}
            </Link>
          ))}
        </div>

        <time className="post__date" dateTime={post.createdAt}>
          {new Date(post.createdAt).toLocaleDateString()}
        </time>

        <PostAlbums albums={albums} />

        {isOwner && !confirmingDelete && (
          <div className="post__actions">
            <button className="post__edit-btn" onClick={() => setEditing(true)}>Edit Post</button>
            <button className="post__delete-btn" onClick={() => setConfirmingDelete(true)}>Delete Post</button>
          </div>
        )}

        {isOwner && confirmingDelete && (
          <div className="post__actions">
            <span className="post__confirm-text">Delete this post for good?</span>
            <button className="post__delete-btn" onClick={handleDelete}>Yes, delete</button>
            <button className="post__edit-btn" onClick={() => setConfirmingDelete(false)}>Cancel</button>
          </div>
        )}

        {!isOwner && (
          <ReportPost alreadyReported={alreadyReported} onSubmit={onReport} />
        )}

        {deleteError && <p className="post__error">{deleteError}</p>}
      </div>

      <Comments comments={post.comments} onAddComment={onAddComment} />
    </article>
  );

}

export default Post;