export function getImageUrl(src, format, width) {
  const baseName = src.split('/').pop().split('.')[0];
  return `/images/${baseName}-${width}.${format}`;
}

export function getSrcSet(src, format) {
  const sizes = [300, 600, 1200, 2000];
  return sizes.map(size => `${getImageUrl(src, format, size)} ${size}w`).join(', ');
}
