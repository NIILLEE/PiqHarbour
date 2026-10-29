/* Shariff Muhammad u23611732 */

import { useState } from 'react';

import Avatar from './Avatar';
import EditProfile from './EditProfile';

import './Profile.css';

function Profile({ user, isOwnProfile, canViewFull, onSave }){

  const [editing, setEditing] = useState(false);

  async function handleSave(updates){

    const message = await onSave(updates);

    if (!message){
      setEditing(false);
    }

    return message;

  }

  if (editing){
    return <EditProfile user={user} onSave={handleSave} onClose={() => setEditing(false)} />;
  }

  return (
    <div className="profile">
      <Avatar user={user} size="lg" />
      <h1 className="profile__fullname">{user.fullName || user.username}</h1>
      <p className="profile__username">@{user.username}</p>

      {canViewFull && (
        <>
          {user.bio && <p className="profile__bio">{user.bio}</p>}

          {user.links.length > 0 && (
            <div className="profile__links">
              {user.links.map((link) => (
                <a key={link} href={link} target="_blank" rel="noreferrer">
                  {link}
                </a>
              ))}
            </div>
          )}
        </>
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