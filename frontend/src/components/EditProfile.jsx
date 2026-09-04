import './AuthForm.css';

function EditProfile({ user, onClose }){

  return (
    <form className="auth-form">
    
      <h2>Edit Profile</h2>

      <label htmlFor="edit-fullname">Full name</label>
      <input type="text" id="edit-fullname" defaultValue={user.fullName} />

      <label htmlFor="edit-username">Username</label>
      <input type="text" id="edit-username" defaultValue={user.username} />

      <label htmlFor="edit-bio">Bio</label>
      <input type="text" id="edit-bio" defaultValue={user.bio} />

      <label htmlFor="edit-links">Links</label>
      <input type="text" id="edit-links" defaultValue={user.links.join(', ')} />

      <button type="submit">Save Changes</button>
      <button type="button" onClick={onClose}>Cancel</button>
      
    </form>
  );

}

export default EditProfile;