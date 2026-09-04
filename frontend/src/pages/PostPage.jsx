import { useParams, useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Post from '../components/Post';

import { dummyPosts, dummyUser } from '../assets/dummyData';

function PostPage(){

  const { id } = useParams();
  const navigate = useNavigate();

  const currentIndex = dummyPosts.findIndex((p) => String(p.id) === id);
  const post = dummyPosts[currentIndex] || dummyPosts[0];
  const isOwner = post.username === dummyUser.username;

  function goToPrev() {
    const prevIndex = (currentIndex - 1 + dummyPosts.length) % dummyPosts.length;
    navigate(`/post/${dummyPosts[prevIndex].id}`);
  }

  function goToNext() {
    const nextIndex = (currentIndex + 1) % dummyPosts.length;
    navigate(`/post/${dummyPosts[nextIndex].id}`);
  }

  return (
    <div>
      <Header />
      <main style={{ padding: '2rem' }}>
        <Post post={post} isOwner={isOwner} onPrev={goToPrev} onNext={goToNext} />
      </main>
    </div>
  );
  
}

export default PostPage;