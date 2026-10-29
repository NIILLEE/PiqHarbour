/* Shariff Muhammad u23611732 */

import ProfilePreview from './ProfilePreview';
import './FriendRequests.css';

function FriendRequests({ requests, onAccept, onDecline }){

  if (requests.length === 0){
    return null;
  }

  return (
    <section className="friend-requests">
      <h3>Friend requests ({requests.length})</h3>

      <ul className="friend-requests__list">
        {requests.map((request) => (
          <li key={request._id} className="friend-requests__item">
            <ProfilePreview user={request} />
            <div className="friend-requests__actions">
              <button onClick={() => onAccept(request._id)}>Accept</button>
              <button onClick={() => onDecline(request._id)}>Decline</button>
            </div>
          </li>
        ))}
      </ul>
      
    </section>
  );

}

export default FriendRequests;