import { Link } from 'react-router-dom';
import './ProfilePreview.css';

function ProfilePreview({ user }){

  return (
    <Link to={`/profile/${user.id}`} className="profile-preview">
      <img
        src={user.avatarUrl}
        alt={`${user.username}'s avatar`}
        className="profile-preview__avatar"
      />
      <div className="profile-preview__info">
        <span className="profile-preview__fullname">{user.fullName}</span>
        <span className="profile-preview__username">@{user.username}</span>
      </div>
    </Link>
  );
  
}

export default ProfilePreview;