/* Shariff Muhammad u23611732 */

import { useState } from 'react';
import AlbumForm from './AlbumForm';
import { sendJson } from '../api';
import { useAuth } from '../context/AuthContext';

import './CreateAlbum.css';

function CreateAlbum({ onAlbumCreated }){

  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  async function handleCreate(values){

    const message = await sendJson('/albums', 'POST', { owner: user._id, ...values });

    if (!message) {
      setOpen(false);
      onAlbumCreated();
    }

    return message;

  }

  if (!open){

    return (
      <button className="create-album__btn" onClick={() => setOpen(true)}>
        + New album
      </button>
    );

  }

  return (
    <AlbumForm
      submitLabel="Create Album"
      onSubmit={handleCreate}
      onCancel={() => setOpen(false)}
    />
  );
  
}

export default CreateAlbum;