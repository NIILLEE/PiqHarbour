/* Shariff Muhammad u23611732 */

import { Link } from 'react-router-dom';
import './PostAlbums.css';

function PostAlbums({ albums }){

  if (albums.length === 0) return null;

  return (
    <div className="post-albums">
      <span className="post-albums__label">In albums:</span>
      {albums.map((album) => (
        <Link key={album._id} to={`/album/${album._id}`} className="post-albums__link">
          {album.name}
        </Link>
      ))}
    </div>
  );
  
}

export default PostAlbums;