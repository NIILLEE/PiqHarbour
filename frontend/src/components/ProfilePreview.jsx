import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import './ProfilePreview.css';

function ProfilePreview({ user }){

  return (
    <Link to={`/profile/${user._id}`} className="profile-preview">
      <Avatar user={user} size="sm" />
      <div className="profile-preview__info">
        <span className="profile-preview__fullname">{user.fullName || user.username}</span>
        <span className="profile-preview__username">@{user.username}</span>
      </div>
    </Link>
  );
  
}

export default ProfilePreview;