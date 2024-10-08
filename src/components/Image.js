import { h } from 'preact';

function Image({ src, alt, className }) {
  const webpImage = require(`../assets/${src}?sizes[]=300,sizes[]=600,sizes[]=1200,sizes[]=2000&format=webp`);
  const fallbackImage = require(`../assets/${src}?sizes[]=300,sizes[]=600,sizes[]=1200,sizes[]=2000&format=fallback`);

  return (
    <img 
      src={webpImage.src}
      srcSet={webpImage.srcSet}
      sizes="(max-width: 300px) 300px, (max-width: 600px) 600px, (max-width: 1200px) 1200px, 2000px"
      alt={alt}
      className={className}
    />
  );
}

export default Image;
