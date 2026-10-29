/* Shariff Muhammad u23611732 */

import { useState } from 'react';
import './AuthForm.css';


function EditProfile({ user, onSave, onClose }){

  const [fullName, setFullName] = useState(user.fullName);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const [links, setLinks] = useState(user.links.join(', '));
  const [error, setError] = useState('');

  async function handleSubmit(e){

    e.preventDefault();
    setError('');

    if (username.trim().length < 3){
      setError('Username must be at least 3 characters.');
      return;
    }

    const message = await onSave({
      username: username.trim(),
      fullName: fullName.trim(),
      bio: bio.trim(),
      avatarUrl: avatarUrl.trim(),
      links: links.split(',').map((l) => l.trim()).filter(Boolean),
    });

    if (message){
      setError(message);
    }

  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
    
      <h2>Edit Profile</h2>

      <label htmlFor="edit-fullname">Full name</label>
      <input type="text" id="edit-fullname" value={fullName} onChange={(e) => setFullName(e.target.value)} />

      <label htmlFor="edit-username">Username</label>
      <input type="text" id="edit-username" value={username} onChange={(e) => setUsername(e.target.value)} />

      <label htmlFor="edit-bio">Bio</label>
      <input type="text" id="edit-bio" value={bio} onChange={(e) => setBio(e.target.value)} />

      <label htmlFor="edit-avatar">Profile image URL</label>
      <input type="text" id="edit-avatar" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />

      <label htmlFor="edit-links">Links (comma separated)</label>
      <input type="text" id="edit-links" value={links} onChange={(e) => setLinks(e.target.value)} />

      {error && <span className="auth-form__error">{error}</span>}

      <button type="submit">Save Changes</button>
      <button type="button" onClick={onClose}>Cancel</button>
      
    </form>
  );

}

export default EditProfile;