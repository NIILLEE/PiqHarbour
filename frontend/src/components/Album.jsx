/* Shariff Muhammad u23611732 */

import { useState } from 'react';
import { Link } from 'react-router-dom';

import AlbumForm from './AlbumForm';
import AddPostsToAlbum from './AddPostsToAlbum';

import { imageSrc } from '../api';
import { formatHashtag } from '../utils/hashtags';

import './Album.css';

function Album({ album, isOwner, availablePosts, onSave, onDelete, onAddPost, onRemovePost }){

  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [actionError, setActionError] = useState('');

  async function handleSave(values){

    const message = await onSave(values);

    if (!message) setEditing(false);

    return message;

  }

  async function handleDelete(){
    const message = await onDelete();

    if (message) {
      setActionError(message);
      setConfirmingDelete(false);
    }

  }

  async function handleAdd(postId){

    const message = await onAddPost(postId);

    setActionError(message || '');

  }

  async function handleRemove(postId){

    const message = await onRemovePost(postId);

    setActionError(message || '');

  }

  if (editing){
    return (
      <AlbumForm
        initialValues={album}
        submitLabel="Save Changes"
        onSubmit={handleSave}
        onCancel={() => setEditing(false)}
      />
    );
  }

  const count = album.posts.length;

  return (
    <section className="album">
      <Link
        to={`/profile/${album.owner._id}`}
        state={{ tab: 'albums' }}
        className="album__back"
      >
        &larr; Back to albums
      </Link>

      <header className="album__header">
        <h1 className="album__name">{album.name}</h1>
        <Link to={`/profile/${album.owner._id}`} className="album__owner">
          by @{album.owner.username}
        </Link>

        {album.description && <p className="album__description">{album.description}</p>}

        {album.hashtags.length > 0 && (
          <div className="album__hashtags">
            {album.hashtags.map((tag) => (
              <Link
                key={tag}
                to={`/search?q=${encodeURIComponent(formatHashtag(tag))}`}
                className="album__hashtag"
              >
                {formatHashtag(tag)}
              </Link>
            ))}
          </div>
        )}

        <span className="album__count">
          {count} {count === 1 ? 'post' : 'posts'}
        </span>

        {isOwner && !confirmingDelete && (
          <div className="album__actions">
            <button className="album__btn" onClick={() => setEditing(true)}>Edit album</button>
            <button className="album__btn" onClick={() => setAdding((open) => !open)}>
              {adding ? 'Hide picker' : 'Add posts'}
            </button>
            <button className="album__btn album__btn--danger" onClick={() => setConfirmingDelete(true)}>
              Delete album
            </button>
          </div>
        )}

        {isOwner && confirmingDelete && (
          <div className="album__actions">
            <span className="album__confirm-text">
              Delete this album? Your posts will not be deleted.
            </span>
            <button className="album__btn album__btn--danger" onClick={handleDelete}>Yes, delete</button>
            <button className="album__btn" onClick={() => setConfirmingDelete(false)}>Cancel</button>
          </div>
        )}

        {actionError && <p className="album__error">{actionError}</p>}
      </header>

      {isOwner && adding && (
        <AddPostsToAlbum
          posts={availablePosts}
          onAdd={handleAdd}
          onClose={() => setAdding(false)}
        />
      )}

      {count === 0 ? (
        <p className="album__empty">
          This album is empty.{isOwner && ' Use "Add posts" to put some photos in it.'}
        </p>
      ) : (
        <ul className="album__grid">
          {album.posts.map((post) => (
            <li key={post._id} className="album__item">
              <Link to={`/post/${post._id}`}>
                <img src={imageSrc(post.imageUrl)} alt={post.description} />
              </Link>
              {isOwner && (
                <button
                  className="album__remove"
                  onClick={() => handleRemove(post._id)}
                  aria-label={`Remove post from album: ${post.description}`}
                >
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
  
}

export default Album;