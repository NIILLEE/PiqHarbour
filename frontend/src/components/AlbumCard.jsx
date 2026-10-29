/* Shariff Muhammad 23611732 */

import { Link } from 'react-router-dom';
import { imageSrc } from '../api';

import './AlbumCard.css';

function AlbumCard({ album }){

  const cover = album.posts[0];
  const count = album.posts.length;

  return (
    <Link to={`/album/${album._id}`} className="album-card">

      {cover ? (
        <img src={imageSrc(cover.imageUrl)} alt="" className="album-card__cover" />
      ) : (
        <div className="album-card__cover album-card__cover--empty">Empty album</div>
      )}

      <div className="album-card__info">
        <h4 className="album-card__name">{album.name}</h4>
        <span className="album-card__count">
          {count} {count === 1 ? 'post' : 'posts'}
        </span>
      </div>
      
    </Link>
  );

}

export default AlbumCard;