import React from 'react';
import { sizedImage } from '@/lib/images';
import { Link } from 'react-router-dom';
import { Clock, Eye, ArrowRight } from 'lucide-react';
import { postNo, type Blog } from '@/data/blogs';

// Matching view-transition-name on the card title and the post page <h1>,
// so the title glides into place when a post opens.
export const titleTransition = (slug: string): React.CSSProperties => ({ viewTransitionName: `post-${slug}` });

export const PostMeta: React.FC<{ post: Blog; className?: string }> = ({ post, className = '' }) => (
  <p className={`meta flex flex-wrap items-center gap-x-2 gap-y-1 ${className}`}>
    <span className="accent">{postNo(post.id)}</span>
    <span aria-hidden="true">·</span>
    <span>{post.category}</span>
    <span aria-hidden="true">·</span>
    <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
    <span aria-hidden="true">·</span>
    <span className="inline-flex items-center gap-1"><Eye className="h-3 w-3" />{post.views}</span>
  </p>
);

/** Photo pinned to the page with tape */
export const TapedPhoto: React.FC<{ src: string; className?: string; tilt?: number; eager?: boolean }> = ({ src, className = '', tilt = -1.5, eager }) => (
  <div className={`tape relative bg-card p-2 shadow-[var(--shadow)] ${className}`} style={{ transform: `rotate(${tilt}deg)` }}>
    <div className="overflow-hidden">
      <img
        src={sizedImage(src, 800)}
        srcSet={`${sizedImage(src, 480)} 480w, ${sizedImage(src, 800)} 800w, ${sizedImage(src, 1200)} 1200w`}
        sizes="(min-width: 1024px) 40vw, 90vw"
        width={800}
        height={500}
        alt=""
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="aspect-[16/10] w-full object-cover saturate-[0.85] transition-transform duration-700 group-hover:scale-[1.04]"
      />
    </div>
  </div>
);

const Tags: React.FC<{ tags: string[]; max?: number }> = ({ tags, max = 3 }) => (
  <ul className="flex flex-wrap gap-1.5">
    {tags.slice(0, max).map((t) => (
      <li key={t} className="tag">#{t}</li>
    ))}
    {tags.length > max && <li className="tag">+{tags.length - max}</li>}
  </ul>
);

/** Large lead story */
export const LeadPost: React.FC<{ post: Blog }> = ({ post }) => (
  <Link to={`/blog/${post.slug}`} viewTransition className="group reveal grid gap-8 md:grid-cols-[1.05fr_1fr] md:items-center md:gap-12">
    <TapedPhoto src={post.image} tilt={-2} />
    <div>
      <PostMeta post={post} />
      <h3 className="serif mt-3 text-4xl leading-[1.05] transition-colors group-hover:text-accent sm:text-5xl" style={titleTransition(post.slug)}>
        {post.title}
      </h3>
      <p className="mt-4 line-clamp-4 text-[1.0625rem] leading-relaxed">{post.excerpt}</p>
      <div className="mt-5"><Tags tags={post.tags} max={4} /></div>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink">
        <span className="link">Read the entry</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </div>
  </Link>
);

/** Standard card with photo */
const PostCard: React.FC<{ post: Blog; tilt?: number }> = ({ post, tilt = 1 }) => (
  <Link to={`/blog/${post.slug}`} viewTransition className="group sheet reveal flex h-full min-w-0 flex-col p-4 pb-6 transition-transform duration-300 hover:-translate-y-1">
    <TapedPhoto src={post.image} tilt={tilt} />
    <div className="mt-6 flex flex-1 flex-col px-1">
      <PostMeta post={post} />
      <h3 className="serif mt-2 text-[1.7rem] leading-[1.1] transition-colors group-hover:text-accent" style={titleTransition(post.slug)}>
        {post.title}
      </h3>
      <p className="mt-3 line-clamp-3 text-[0.9375rem] leading-relaxed">{post.excerpt}</p>
      <div className="mt-auto pt-5"><Tags tags={post.tags} /></div>
    </div>
  </Link>
);

/** Compact text row */
export const PostRow: React.FC<{ post: Blog }> = ({ post }) => (
  <li className="reveal">
    <Link to={`/blog/${post.slug}`} viewTransition className="group grid grid-cols-[3.5rem_1fr] gap-4 border-t border-dashed rule py-5 sm:grid-cols-[5rem_1fr_auto] sm:gap-6">
      <img src={sizedImage(post.image, 320)} width={160} height={160} alt="" loading="lazy" decoding="async" className="aspect-square w-full rounded-[2px] object-cover saturate-[0.8]" />
      <span className="min-w-0">
        <span className="serif block text-2xl leading-tight text-ink transition-colors group-hover:text-accent" style={titleTransition(post.slug)}>
          {post.title}
        </span>
        <span className="mt-1 line-clamp-2 text-sm text-ink-3">{post.excerpt}</span>
      </span>
      <span className="meta col-start-2 sm:col-start-3 sm:text-right">
        {postNo(post.id)}
        <br className="hidden sm:block" /> <span className="sm:hidden">·</span> {post.readTime}
      </span>
    </Link>
  </li>
);

export default PostCard;
