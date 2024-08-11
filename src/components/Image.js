import { h } from 'preact';
import WebpDetect from 'webp-detect';

function Image({ src, alt, className }) {
  const webpSrcSet = src.srcSet.split(',').map(s => s.replace(/\.(png|jpg|jpeg)/, '.webp')).join(',');
  
  return (
    <img 
      src={src.src}
      srcSet={WebpDetect.isSupported ? webpSrcSet : src.srcSet}
      sizes="(max-width: 300px) 300px, (max-width: 600px) 600px, (max-width: 1200px) 1200px, 2000px"
      alt={alt}
      className={className}
    />
  );
}

export default Image;
