/* Shariff Muhammad u23611732 */

import { useState } from 'react';
import { parseHashtags } from '../utils/hashtags';

import './AuthForm.css';

function EditPost({ post, onSave, onClose }){

  const [description, setDescription] = useState(post.description);
  const [hashtags, setHashtags] = useState(post.hashtags.join(', '));
  const [error, setError] = useState('');

  async function handleSubmit(e){

    e.preventDefault();

    setError('');

    const tags = parseHashtags(hashtags);

    if (description.trim().length === 0){
      setError('Please add a description.');
      return;
    }

    if (tags.length === 0){
      setError('Please add at least one hashtag.');
      return;
    }

    const message = await onSave({ description: description.trim(), hashtags: tags });

    if (message) setError(message);

  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <h2>Edit Post</h2>

      <label htmlFor="edit-post-description">Description</label>
      <input
        type="text"
        id="edit-post-description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label htmlFor="edit-post-hashtags">Hashtags</label>
      <input
        type="text"
        id="edit-post-hashtags"
        value={hashtags}
        onChange={(e) => setHashtags(e.target.value)}
      />

      {error && <span className="auth-form__error">{error}</span>}

      <button type="submit">Save Changes</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
  
}

export default EditPost;