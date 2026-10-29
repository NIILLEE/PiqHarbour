/* Shariff Muhammad u23611732 */

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../api';
import { parseHashtags } from '../utils/hashtags';

import './CreatePost.css';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

function CreatePost({ onPostCreated }){

  const { user } = useAuth();
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [fileInputKey, setFileInputKey] = useState(0);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleFileChange(e){

    const file = e.target.files[0];

    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setImageFile(file || null);
    setPreviewUrl(file ? URL.createObjectURL(file) : '');

  }

  function resetForm(){

    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setDescription('');
    setHashtags('');
    setImageFile(null);
    setPreviewUrl('');
    setFileInputKey((key) => key + 1);

  }

  async function handleSubmit(e){

    e.preventDefault();
    setError('');

    const tags = parseHashtags(hashtags);

    if (!imageFile){
      setError('Please choose an image.');
      return;
    }

    if (!imageFile.type.startsWith('image/')){
      setError('The selected file must be an image.');
      return;
    }

    if (imageFile.size > MAX_IMAGE_SIZE){
      setError('Image must be 5MB or smaller.');
      return;
    }

    if (description.trim().length === 0){
      setError('Please add a description.');
      return;
    }

    if (tags.length === 0){
      setError('Please add at least one hashtag.');
      return;
    }

    const formData = new FormData();

    formData.append('owner', user._id);
    formData.append('description', description.trim());
    formData.append('hashtags', JSON.stringify(tags));
    formData.append('image', imageFile);

    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!data.success){
        setError(data.message);
        return;
      }

      resetForm();
      if (onPostCreated) onPostCreated(data.post);
    } catch {
      setError('Could not create your post. Please try again.');
    } finally {
      setSubmitting(false);
    }

  }

  return (
    <form className="create-post" onSubmit={handleSubmit} noValidate>
      <h3>Create a Post</h3>

      <label htmlFor="post-image">Image</label>
      <input
        key={fileInputKey}
        type="file"
        id="post-image"
        accept="image/*"
        onChange={handleFileChange}
      />

      {previewUrl && <img src={previewUrl} alt="Preview of your upload" className="create-post__preview" />}

      <label htmlFor="post-description">Description</label>
      <textarea
        id="post-description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />

      <label htmlFor="post-hashtags">Hashtags</label>
      <input
        type="text"
        id="post-hashtags"
        placeholder="ocean, sunset, #harbour"
        value={hashtags}
        onChange={(e) => setHashtags(e.target.value)}
      />

      {error && <span className="create-post__error">{error}</span>}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Posting...' : 'Post'}
      </button>
    </form>
  );
  
}

export default CreatePost;