/* Shariff Muhammad u23611732 */

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Album from '../components/Album';
import { useAuth } from '../context/AuthContext';

import { API_URL, sendJson } from '../api';

function AlbumPage(){

  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [album, setAlbum] = useState(null);
  const [ownerPosts, setOwnerPosts] = useState([]);
  const [error, setError] = useState('');
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {

    async function loadAlbum(){
      try {
        const response = await fetch(`${API_URL}/albums/${id}`);
        const data = await response.json();

        if (!data.success){
          setError(data.message);
          return;
        }

        let posts = [];

        if (data.album.owner._id === user._id){
          const postsRes = await fetch(`${API_URL}/posts/user/${user._id}`);
          const postsData = await postsRes.json();
          if (postsData.success) posts = postsData.posts;
        }

        setError('');

        setAlbum(data.album);
        setOwnerPosts(posts);
      } catch {
        setError('Could not load this album.');
      }
    }

    loadAlbum();
  }, [id, user._id, reloadCount]);

  const reload = () => setReloadCount((count) => count + 1);

  async function saveAlbum(values){

    const message = await sendJson(`/albums/${id}`, 'PUT', values);

    if (!message) reload();

    return message;

  }

  async function deleteAlbum(){

    const message = await sendJson(`/albums/${id}`, 'DELETE');

    if (!message) navigate(`/profile/${user._id}`, { state: { tab: 'albums' } });
    
    return message;

  }

  async function addPost(postId){

    const message = await sendJson(`/albums/${id}/posts`, 'POST', { postId });
    
    if (!message) reload();

    return message;

  }

  async function removePost(postId){

    const message = await sendJson(`/albums/${id}/posts/${postId}`, 'DELETE');
    
    if (!message) reload();

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

  if (!album) {
    return (
      <div>
        <Header />
        <main className="page-main">
          <p className="page-message">Loading album...</p>
        </main>
      </div>
    );
  }

  const availablePosts = ownerPosts.filter(
    (post) => !album.posts.some((albumPost) => albumPost._id === post._id)
  );

  return (
    <div>
      <Header />
      <main className="page-main">
        <Album
          album={album}
          isOwner={album.owner._id === user._id}
          availablePosts={availablePosts}
          onSave={saveAlbum}
          onDelete={deleteAlbum}
          onAddPost={addPost}
          onRemovePost={removePost}
        />
      </main>
    </div>
  );
  
}

export default AlbumPage;