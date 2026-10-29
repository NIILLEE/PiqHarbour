/* Shariff Muhammad u23611732 */

import { useState } from 'react';
import { Link } from 'react-router-dom';

import './Comments.css';

function Comments({ comments, onAddComment }){

  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e){

    e.preventDefault();

    const text = newComment.trim();

    if (!text){
      setError('Write something before posting.');
      return;
    }

    const message = await onAddComment(text);

    if (message){
      setError(message);
      return;
    }

    setNewComment('');
    setError('');

  }

  return (
    <div className="comments">
      <h3>Comments ({comments.length})</h3>

      {comments.length === 0 ? (
        <p className="comments__empty">No comments yet. Be the first!</p>
      ) : (
        <ul className="comments__list">
          {comments.map((comment) => (
            <li key={comment._id}>
              {comment.user ? (
                <Link to={`/profile/${comment.user._id}`}>
                  <strong>@{comment.user.username}</strong>
                </Link>
              ) : (
                <strong>deleted user</strong>
              )}{' '}
              {comment.text}
            </li>
          ))}
        </ul>
      )}

      <form className="comments__form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="new-comment" className="comments__label">Add a comment</label>
        <input
          type="text"
          id="new-comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Post</button>
        {error && <span className="comments__error">{error}</span>}
      </form>
    </div>
  );
  
}

export default Comments;