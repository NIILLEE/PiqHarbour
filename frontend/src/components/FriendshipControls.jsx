/* Shariff Muhammad u23611732 */

import './FriendshipControls.css';

function FriendshipControls({ status, onSend, onAccept, onDecline, onUnfriend }){

  return (
    <div className="friendship">
      {status === 'none' && (
        <>
          <span className="friendship__status">Not friends</span>
          <button onClick={onSend}>Add friend</button>
        </>
      )}

      {status === 'pending-sent' && (
        <span className="friendship__status">Friend request sent</span>
      )}

      {status === 'pending-received' && (
        <>
          <span className="friendship__status">Wants to be your friend</span>
          <button onClick={onAccept}>Accept</button>
          <button onClick={onDecline}>Decline</button>
        </>
      )}

      {status === 'friends' && (
        <>
          <span className="friendship__status">Friends</span>
          <button onClick={onUnfriend}>Unfriend</button>
        </>
      )}
    </div>
  );
  
}

export default FriendshipControls;