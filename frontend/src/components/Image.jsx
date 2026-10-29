/* Shariff Muhammad u23611732 */

import { imageSrc } from '../api';
import './Image.css';

function Image({ imageUrl, description, onPrev, onNext }){

  return (
    <div className="post-image">
      {onPrev && (
        <button className="post-image__nav post-image__nav--prev" onClick={onPrev} aria-label="Previous post">
          &lt;
        </button>
      )}

      <img src={imageSrc(imageUrl)} alt={description} />

      {onNext && (
        <button className="post-image__nav post-image__nav--next" onClick={onNext} aria-label="Next post">
          &gt;
        </button>
      )}
    </div>
  );
  
}

export default Image;