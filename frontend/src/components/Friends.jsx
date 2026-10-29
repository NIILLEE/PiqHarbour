import ProfilePreview from './ProfilePreview';
import './Friends.css';

function Friends({ friends, visible }){

  if (!visible){

    return (
      <div className="friends friends--hidden">
        <p>Friends list is only visible to friends.</p>
      </div>
    );

  }

  return (
    <div className="friends">
      <h3>Friends ({friends.length})</h3>
      <div className="friends__list">
        {friends.map((friend) => (
          <ProfilePreview key={friend._id} user={friend} />
        ))}
      </div>
    </div>
  );
  
}

export default Friends;