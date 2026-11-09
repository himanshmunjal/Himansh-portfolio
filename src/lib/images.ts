/** Unsplash serves WebP/AVIF at the requested width with auto=format; other URLs pass through */
export const sizedImage = (src: string, width: number) => {
  if (!src.startsWith('https://images.unsplash.com/')) return src;
  const u = new URL(src);
  u.searchParams.set('w', String(width));
  u.searchParams.delete('h');
  u.searchParams.set('auto', 'format');
  return u.toString();
};
