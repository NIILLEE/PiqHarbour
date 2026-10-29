/* Shariff Muhammad 23611732 */

import { imageSrc } from '../api';

import './AddPostsToAlbum.css';

function AddPostsToAlbum({ posts, onAdd, onClose }){

  return (
    <div className="add-posts">
      <div className="add-posts__top">
        <h3>Add posts to this album</h3>
        <button className="add-posts__done" onClick={onClose}>Done</button>
      </div>

      {posts.length === 0 ? (
        <p className="add-posts__empty">
          Every post you have is already in this album (or you have no posts yet).
        </p>
      ) : (
        <ul className="add-posts__grid">
          {posts.map((post) => (
            <li key={post._id}>
              <button
                className="add-posts__tile"
                onClick={() => onAdd(post._id)}
                aria-label={`Add post: ${post.description}`}
              >
                <img src={imageSrc(post.imageUrl)} alt="" />
                <span className="add-posts__plus">+</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
}

export default AddPostsToAlbum;