import { useState } from 'react';
import './CreatePost.css';

function CreatePost(){

  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [imageFile, setImageFile] = useState(null);

  function handleSubmit(e){

    e.preventDefault();
    console.log('New post (dummy):', { description, hashtags, imageFile });

  }

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <h3>Create a Post</h3>

      <label htmlFor="post-image">Image</label>
      <input
        type="file"
        id="post-image"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
      />

      <label htmlFor="post-description">Description</label>
      <textarea
        id="post-description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />

      <label htmlFor="post-hashtags">Hashtags (comma separated)</label>
      <input
        type="text"
        id="post-hashtags"
        placeholder="#ocean, #sunset"
        value={hashtags}
        onChange={(e) => setHashtags(e.target.value)}
      />

      <button type="submit">Post</button>
    </form>
  );
  
}

export default CreatePost;