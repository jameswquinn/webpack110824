import { h } from 'preact';
import { getImageUrl, getSrcSet } from '../utils/imageUtils';

function Image({ src, alt, className }) {
  const webpSrcSet = getSrcSet(src, 'webp');
  const fallbackSrcSet = getSrcSet(src, 'png');
  const fallbackSrc = getImageUrl(src, 'png', 1200);

  return (
    <picture>
      <source srcSet={webpSrcSet} type="image/webp" />
      <img 
        src={fallbackSrc}
        srcSet={fallbackSrcSet}
        sizes="(max-width: 300px) 300px, (max-width: 600px) 600px, (max-width: 1200px) 1200px, 2000px"
        alt={alt}
        className={className}
      />
    </picture>
  );
}

export default Image;
