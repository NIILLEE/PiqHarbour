/* Shariff Muhammad u23611732 */

import AlbumCard from './AlbumCard';

import './AlbumsList.css';

function AlbumsList({ albums }){

  return (
    <div className="albums-list">
      <h3>Albums ({albums.length})</h3>

      {albums.length === 0 ? (
        <p className="albums-list__empty">No albums yet.</p>
      ) : (
        <div className="albums-list__grid">
          {albums.map((album) => (
            <AlbumCard key={album._id} album={album} />
          ))}
        </div>
      )}
    </div>
  );
  
}

export default AlbumsList;