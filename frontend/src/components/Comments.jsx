import { useState } from 'react';
import './Comments.css';

function Comments({ comments }){
    
  const [newComment, setNewComment] = useState('');

  function handleSubmit(e){

    e.preventDefault();
    console.log('New comment (dummy):', newComment);
    setNewComment('');

  }

  return (
    <div className="comments">
      <h3>Comments ({comments.length})</h3>

      <ul className="comments__list">
        {comments.map((comment) => (
          <li key={comment.id}>
            <strong>@{comment.username}</strong> {comment.text}
          </li>
        ))}
      </ul>

      <form className="comments__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );

}

export default Comments;