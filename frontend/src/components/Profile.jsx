import { useState } from 'react';
import EditProfile from './EditProfile';

import './Profile.css';

function Profile({ user, isOwnProfile }){

  const [editing, setEditing] = useState(false);

  if (editing){
    return <EditProfile user={user} onClose={() => setEditing(false)} />;
  }

  return (
    <div className="profile">
      <img src={user.avatarUrl} alt={`${user.username}'s avatar`} className="profile__avatar" />
      <h1 className="profile__fullname">{user.fullName}</h1>
      <p className="profile__username">@{user.username}</p>
      <p className="profile__bio">{user.bio}</p>

      {user.links.length > 0 && (
        <div className="profile__links">
          {user.links.map((link) => (
            <a key={link} href={link} target="_blank" rel="noreferrer">
              {link}
            </a>
          ))}
        </div>
      )}

      {isOwnProfile && (
        <button className="profile__edit-btn" onClick={() => setEditing(true)}>
          Edit Profile
        </button>
      )}
    </div>
  );
  
}

export default Profile;