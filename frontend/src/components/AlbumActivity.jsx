/* Shariff Muhammad 23611732 */

import { Link } from 'react-router-dom';

import ActivityHeader from './ActivityHeader';
import AlbumCard from './AlbumCard';

import './AlbumActivity.css';

function AlbumActivity({ album }){

  return (
    <article className="album-activity">
      <ActivityHeader owner={album.owner} date={album.createdAt}>
        created the album <Link to={`/album/${album._id}`}>{album.name}</Link>
      </ActivityHeader>

      {album.description && (
        <p className="album-activity__description">{album.description}</p>
      )}

      <div className="album-activity__card">
        <AlbumCard album={album} />
      </div>
    </article>
  );
  
}

export default AlbumActivity;