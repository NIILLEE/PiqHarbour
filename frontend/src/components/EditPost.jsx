import './AuthForm.css';

function EditPost({ post, onClose }){

  return (
    <form className="auth-form">
      <h2>Edit Post</h2>

      <label htmlFor="edit-post-description">Description</label>
      <input type="text" id="edit-post-description" defaultValue={post.description} />

      <label htmlFor="edit-post-hashtags">Hashtags</label>
      <input type="text" id="edit-post-hashtags" defaultValue={post.hashtags.join(', ')} />

      <button type="submit">Save Changes</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
  
}

export default EditPost;