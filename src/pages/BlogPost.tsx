import React from 'react';
import { Link, useLoaderData, type LoaderFunctionArgs } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Home } from 'lucide-react';
import SEO from '@/components/common/SEO';
import { PostMeta, TapedPhoto, titleTransition } from '@/components/notebook/PostCard';
import { sizedImage } from '@/lib/images';
import { allBlogs, blogLoaders, postNo, type Blog } from '@/data/blogs';
import { allProjects, expNo, projectPath, shortTitle } from '@/data/projects';
import { parseMarkdown } from '@/lib/markdown';

interface Data {
  post: Blog;
  html: string;
  index: number;
}

// Runs before navigation commits, so the page (and its view transition) arrives complete
export async function loader({ params }: LoaderFunctionArgs): Promise<Data> {
  const index = allBlogs.findIndex((b) => b.slug === params.slug);
  const load = blogLoaders[params.slug ?? ''];
  if (index === -1 || !load) throw new Response('Not found', { status: 404 });

  const { default: md } = await load();
  // The page renders the title itself, so drop the post's leading "# Title"
  return { post: allBlogs[index], index, html: parseMarkdown(md.replace(/^\s*# .*\n/, '')) };
}

const BlogPost: React.FC = () => {
  const { post, html, index } = useLoaderData() as Data;
  const prev = allBlogs[index - 1];
  const next = allBlogs[index + 1];
  const related = allBlogs.filter((b) => b.id !== post.id).slice(0, 2);
  const project = allProjects.find((p) => p.writeup === post.slug);

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        url={`/blog/${post.slug}`}
        image={post.image}
        type="article"
        keywords={post.tags}
        article={{ tags: post.tags }}
      />

      {/* Reading progress, driven by scroll position (CSS scroll timeline; stays hidden where unsupported) */}
      <div
        aria-hidden="true"
        className="read-progress fixed inset-x-0 top-16 z-40 h-0.5"
        style={{ background: 'var(--accent)', transform: 'scaleX(0)' }}
      />

      <article className="wrap pb-10 pt-28 sm:pt-32">
        <div className="mx-auto max-w-[46rem]">
          <Link to="/blogs/all" viewTransition className="meta inline-flex items-center gap-2 hover:text-ink">
            <ArrowLeft className="h-3.5 w-3.5" /> All posts
            <span className="ml-3">{index + 1} / {allBlogs.length}</span>
          </Link>

          <header className="mt-10">
            <PostMeta post={post} />
            <h1 className="serif mt-4 text-[2.6rem] leading-[1.04] sm:text-[3.6rem]" style={titleTransition(post.slug)}>
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-3">{post.excerpt}</p>
            <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tags">
              {post.tags.map((t) => (
                <li key={t} className="tag">#{t}</li>
              ))}
            </ul>
          </header>
        </div>

        <div className="mx-auto my-12 max-w-[54rem]">
          <TapedPhoto src={post.image} tilt={-0.8} eager />
          <p className="meta mt-3 text-center">
            <span className="accent">Plate {postNo(post.id).replace('No. ', '')}</span> · {post.category}
          </p>
        </div>

        {/* Post HTML comes from our own markdown files and is escaped by parseMarkdown */}
        <div className="prose mx-auto max-w-[46rem]" dangerouslySetInnerHTML={{ __html: html }} />

        <div className="mx-auto mt-16 max-w-[46rem] space-y-16">
          {project && (
            <aside className="index-card p-6 pt-0">
              <p className="eyebrow flex h-[2.6rem] items-center"><span className="accent">Related experiment</span>&nbsp;· {expNo(project.id)}</p>
              <Link
                to={projectPath(project)}
                viewTransition
                className="serif mt-4 block text-3xl text-ink transition-colors hover:text-accent"
              >
                {shortTitle(project.title)} →
              </Link>
              <p className="mt-2 text-[0.9375rem]">{project.result}</p>
            </aside>
          )}

          {/* You might also enjoy */}
          <section aria-labelledby="related-title">
            <h2 id="related-title" className="serif text-3xl">You might also enjoy</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {related.map((r) => (
                <Link key={r.id} to={`/blog/${r.slug}`} viewTransition className="group sheet flex flex-col overflow-hidden">
                  <img src={sizedImage(r.image, 480)} width={480} height={270} alt="" loading="lazy" decoding="async" className="aspect-[16/9] h-auto w-full object-cover saturate-[0.85]" />
                  <div className="p-4">
                    <p className="meta">{r.category} · {r.readTime}</p>
                    <p className="serif mt-1 text-xl leading-snug text-ink transition-colors group-hover:text-accent">{r.title}</p>
                    <p className="mt-2 flex flex-wrap gap-1">
                      {r.tags.slice(0, 2).map((t) => <span key={t} className="tag">#{t}</span>)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Prev / next */}
          <nav aria-label="More entries" className="grid gap-4 sm:grid-cols-2">
            {prev ? (
              <Link to={`/blog/${prev.slug}`} viewTransition className="group sheet p-5">
                <span className="meta inline-flex items-center gap-1"><ArrowLeft className="h-3 w-3" /> Previous · {postNo(prev.id)}</span>
                <span className="serif mt-1 block text-xl leading-snug text-ink transition-colors group-hover:text-accent">{prev.title}</span>
              </Link>
            ) : <span />}
            {next && (
              <Link to={`/blog/${next.slug}`} viewTransition className="group sheet p-5 sm:text-right">
                <span className="meta inline-flex items-center gap-1">Next · {postNo(next.id)} <ArrowRight className="h-3 w-3" /></span>
                <span className="serif mt-1 block text-xl leading-snug text-ink transition-colors group-hover:text-accent">{next.title}</span>
              </Link>
            )}
          </nav>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/blogs/all" viewTransition className="btn-ghost"><BookOpen className="h-4 w-4" /> All posts</Link>
            <Link to="/" viewTransition className="btn"><Home className="h-4 w-4" /> Portfolio</Link>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
