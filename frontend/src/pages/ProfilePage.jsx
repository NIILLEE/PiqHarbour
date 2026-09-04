import { useParams } from 'react-router-dom';

import Header from '../components/Header';
import Profile from '../components/Profile';
import Friends from '../components/Friends';
import PostsList from '../components/PostsList';
import CreatePost from '../components/CreatePost';

import { dummyUser, dummyFriends, dummyPosts } from '../assets/dummyData';

function ProfilePage(){

  const { id } = useParams();
  const isOwnProfile = id === dummyUser.id;
  const isFriend = true;

  return (
    <div>
      <Header />
      <main style={{ padding: '2rem' }}>
        <Profile user={dummyUser} isOwnProfile={isOwnProfile} />
        <Friends friends={dummyFriends} visible={isOwnProfile || isFriend} />
        {isOwnProfile && <CreatePost />}
        <PostsList posts={dummyPosts} />
      </main>
    </div>
  );
  
}

export default ProfilePage;