import { h } from 'preact';

function Image({ src, alt, className }) {
  const baseName = src.split('/').pop().split('.')[0];
  const sizes = [300, 600, 1200, 2000];
  
  const webpSrcSet = sizes
    .map(size => `${require(`../assets/${baseName}-${size}.webp`)} ${size}w`)
    .join(', ');

  return (
    <img 
      src={require(`../assets/${baseName}-1200.webp`)}
      srcSet={webpSrcSet}
      sizes="(max-width: 300px) 300px, (max-width: 600px) 600px, (max-width: 1200px) 1200px, 2000px"
      alt={alt}
      className={className}
    />
  );
}

export default Image;
