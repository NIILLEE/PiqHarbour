import './Image.css';

function Image({ imageUrl, description, onPrev, onNext }){

  return (
    <div className="post-image">
      <button className="post-image__nav post-image__nav--prev" onClick={onPrev} aria-label="Previous">
        &lt;
      </button>

      <img src={imageUrl} alt={description} />

      <button className="post-image__nav post-image__nav--next" onClick={onNext} aria-label="Next">
        &gt;
      </button>
    </div>
  );
  
}

export default Image;