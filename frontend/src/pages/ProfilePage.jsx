/* Shariff Muhammad 23611732 */

import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import Header from '../components/Header';
import Profile from '../components/Profile';
import FriendshipControls from '../components/FriendshipControls';
import FriendRequests from '../components/FriendRequests';
import Friends from '../components/Friends';
import ProfileTabs from '../components/ProfileTabs';
import PostsList from '../components/PostsList';
import CreatePost from '../components/CreatePost';
import AlbumsList from '../components/AlbumsList';
import CreateAlbum from '../components/CreateAlbum';

import { useAuth } from '../context/AuthContext';
import { API_URL, sendJson } from '../api';

function ProfilePage(){

  const { id } = useParams();
  const { user, updateUser } = useAuth();

  const location = useLocation();
  
  const [profileUser, setProfileUser] = useState(null);
  const [viewer, setViewer] = useState(null);
  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [tab, setTab] = useState(location.state?.tab ?? 'posts');

  useEffect(() => {
    setTab(location.state?.tab ?? 'posts');
  }, [location.key, location.state]);
  
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {

    async function loadProfile(){

      try {
        const [userRes, viewerRes, postsRes, albumsRes] = await Promise.all([
          fetch(`${API_URL}/users/${id}`),
          fetch(`${API_URL}/users/${user._id}`),
          fetch(`${API_URL}/posts/user/${id}`),
          fetch(`${API_URL}/albums/user/${id}`),
        ]);

        const userData = await userRes.json();
        const viewerData = await viewerRes.json();
        const postsData = await postsRes.json();
        const albumsData = await albumsRes.json();

        if (!userData.success) {
          setError(userData.message);
          return;
        }

        setError('');

        setProfileUser(userData.user);
        setViewer(viewerData.success ? viewerData.user : null);
        setPosts(postsData.success ? postsData.posts : []);
        setAlbums(albumsData.success ? albumsData.albums : []);
      } catch {
        setError('Could not load this profile.');
      }

    }

    loadProfile();
  }, [id, user._id, reloadCount]);

  const reload = () => setReloadCount((count) => count + 1);

  async function handleSave(updates){

    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!data.success){
        return data.message;
      }

      setProfileUser((prev) => ({
        ...prev,
        ...data.user,
        friends: prev.friends,
        friendRequests: prev.friendRequests,
      }));
      updateUser(data.user);
      return null;
    } catch {
      return 'Could not save your changes. Please try again.';
    }

  }

  async function friendAction(path, method){

    const message = await sendJson(path, method);

    setActionError(message || '');

    if (!message){
      return data.message;
    }

  }

  const sendRequest = () =>
    friendAction(`/users/${user._id}/friend-requests/${profileUser._id}`, 'POST');
  const acceptRequest = (requesterId) =>
    friendAction(`/users/${user._id}/friend-requests/${requesterId}/accept`, 'POST');
  const declineRequest = (requesterId) =>
    friendAction(`/users/${user._id}/friend-requests/${requesterId}`, 'DELETE');
  const unfriend = (friendId) =>
    friendAction(`/users/${user._id}/friends/${friendId}`, 'DELETE');

  if (error){
    return (
      <div>
        <Header />
        <main className="page-main">
          <p className="page-message">{error}</p>
        </main>
      </div>
    );
  }

  if (!profileUser){
    return (
      <div>
        <Header />
        <main className="page-main">
          <p className="page-message">Loading profile...</p>
        </main>
      </div>
    );
  }

  const isOwnProfile = user._id === profileUser._id;
  const isFriend = profileUser.friends.some((f) => f._id === user._id);
  const canViewFull = isOwnProfile || isFriend;

  let status = 'none';

  if (isFriend){
    status = 'friends';
  } else if (profileUser.friendRequests.some((r) => r._id === user._id)) {
    status = 'pending-sent';
  } else if (viewer && viewer.friendRequests.some((r) => r._id === profileUser._id)) {
    status = 'pending-received';
  }

  return (
    <div>
      <Header />
      <main className="page-main">
        <Profile
          user={profileUser}
          isOwnProfile={isOwnProfile}
          canViewFull={canViewFull}
          onSave={handleSave}
        />

        {!isOwnProfile && (
          <FriendshipControls
            status={status}
            onSend={sendRequest}
            onAccept={() => acceptRequest(profileUser._id)}
            onDecline={() => declineRequest(profileUser._id)}
            onUnfriend={() => unfriend(profileUser._id)}
          />
        )}

        {actionError && <p className="page-message">{actionError}</p>}

        {isOwnProfile && (
          <FriendRequests
            requests={profileUser.friendRequests}
            onAccept={acceptRequest}
            onDecline={declineRequest}
          />
        )}

        {canViewFull ? (
          <>
            <Friends friends={profileUser.friends} visible />

            <ProfileTabs
              tab={tab}
              onChange={setTab}
              postCount={posts.length}
              albumCount={albums.length}
            />

            {tab === 'posts' ? (
              <>
                {isOwnProfile && <CreatePost onPostCreated={reload} />}
                <PostsList posts={posts} />
              </>
            ) : (
              <>
                {isOwnProfile && <CreateAlbum onAlbumCreated={reload} />}
                <AlbumsList albums={albums} />
              </>
            )}
          </>
        ) : (
          <p className="page-message">Become friends to see the rest of this profile.</p>
        )}
      </main>
    </div>
  );

}

export default ProfilePage;