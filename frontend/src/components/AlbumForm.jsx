/* Shariff Muhammad 23611732 */

import { useState } from 'react';
import { parseHashtags } from '../utils/hashtags';

import './AuthForm.css';

function AlbumForm({ initialValues, submitLabel, onSubmit, onCancel }){

  const [name, setName] = useState(initialValues?.name ?? '');
  const [description, setDescription] = useState(initialValues?.description ?? '');
  const [hashtags, setHashtags] = useState((initialValues?.hashtags ?? []).join(', '));
  const [error, setError] = useState('');

  async function handleSubmit(e){

    e.preventDefault();

    setError('');

    if (name.trim().length === 0){
      setError('Please give your album a name.');
      return;
    }

    if (name.trim().length > 60){
      setError('The album name must be 60 characters or fewer.');
      return;
    }

    const message = await onSubmit({
      name: name.trim(),
      description: description.trim(),
      hashtags: parseHashtags(hashtags),
    });

    if (message) setError(message);

  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <h2>{submitLabel}</h2>

      <label htmlFor="album-form-name">Name</label>
      <input
        type="text"
        id="album-form-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="album-form-description">Description</label>
      <input
        type="text"
        id="album-form-description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label htmlFor="album-form-hashtags">Hashtags</label>
      <input
        type="text"
        id="album-form-hashtags"
        placeholder="travel, summer, #harbour"
        value={hashtags}
        onChange={(e) => setHashtags(e.target.value)}
      />

      {error && <span className="auth-form__error">{error}</span>}

      <button type="submit">{submitLabel}</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
  
}

export default AlbumForm;