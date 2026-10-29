/* Shariff Muhammad u23611732 */

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Post from '../components/Post';

import { useAuth } from '../context/AuthContext';
import { API_URL, sendJson } from '../api';

function PostPage(){

  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [siblingIds, setSiblingIds] = useState([]);
  const [error, setError] = useState('');
  const [reloadCount, setReloadCount] = useState(0);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {

    async function loadPost(){

      try {
        const response = await fetch(`${API_URL}/posts/${id}`);
        const data = await response.json();

        if (!data.success) {
          setError(data.message);
          return;
        }

        const [siblingsRes, albumsRes] = await Promise.all([
          fetch(`${API_URL}/posts/user/${data.post.owner._id}`),
          fetch(`${API_URL}/albums/post/${id}`),
        ]);

        const siblingsData = await siblingsRes.json();
        const albumsData = await albumsRes.json();

        setError('');
        setPost(data.post);
        setSiblingIds(
          siblingsData.success ? siblingsData.posts.map((p) => p._id) : []
        );

        setAlbums(albumsData.success ? albumsData.albums : []);
      } catch {
        setError('Could not load this post.');
      }

    }

    loadPost();
  }, [id, reloadCount]);

  async function savePost(updates){

    const message = await sendJson(`/posts/${id}`, 'PUT', updates);

    if (!message) setReloadCount((count) => count + 1);

    return message;

  }

  async function deletePost(){

    const message = await sendJson(`/posts/${id}`, 'DELETE');

    if (!message){
      navigate(`/profile/${user._id}`);
    }

    return message;

  }

  async function addComment(text){

    const message = await sendJson(`/posts/${id}/comments`, 'POST', { user: user._id, text });

    if (!message){
      setReloadCount((count) => count + 1);
    }

    return message;

  }

  async function reportPost(reason) {
    const message = await sendJson(`/posts/${id}/report`, 'POST', { user: user._id, reason });

    if (!message){
      setReloadCount((count) => count + 1);
    }

    return message;
  }

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

  if (!post){
    return (
      <div>
        <Header />
        <main className="page-main">
          <p className="page-message">Loading post...</p>
        </main>
      </div>
    );
  }

  const index = siblingIds.indexOf(post._id);
  const hasNeighbours = siblingIds.length > 1 && index !== -1;

  const goTo = (offset) =>
    navigate(`/post/${siblingIds[(index + offset + siblingIds.length) % siblingIds.length]}`);

  return (
    <div>
      <Header />
      <main className="page-main">
        <Post
          post={post}
          isOwner={post.owner._id === user._id}
          onPrev={hasNeighbours ? () => goTo(-1) : undefined}
          onNext={hasNeighbours ? () => goTo(1) : undefined}
          onSave={savePost}
          onDelete={deletePost}
          onAddComment={addComment}
          alreadyReported={post.reports.some((r) => r.user === user._id)}
          onReport={reportPost}
          albums={albums}
        />
      </main>
    </div>
  );

}

export default PostPage;