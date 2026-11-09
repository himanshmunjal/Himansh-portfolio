import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/notebook/SectionHeading';
import PostCard, { LeadPost, PostRow } from '@/components/notebook/PostCard';
import { allBlogs } from '@/data/blogs';

const [lead, ...others] = allBlogs;

const BlogSection: React.FC = () => (
  <section id="blog" className="relative scroll-mt-16 py-24 sm:py-32">
    <div className="wrap">
      <SectionHeading n="05" kicker="My blog" title={<>From the <em className="text-accent">notebook</em></>} note="long-form, with the failures left in">
        Real-world lessons from building AI systems: the failures, the rewrites, and what actually works in production.
      </SectionHeading>

      <LeadPost post={lead} />

      <div className="mt-20 grid gap-8 md:grid-cols-2">
        {others.slice(0, 2).map((post, i) => (
          <PostCard key={post.slug} post={post} tilt={i % 2 ? 1.5 : -1} />
        ))}
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow">More entries</p>
          <p className="hand mt-2 text-2xl">keep reading →</p>
        </div>
        <ol className="border-b border-dashed rule">
          {others.slice(2).map((post) => (
            <PostRow key={post.slug} post={post} />
          ))}
        </ol>
      </div>

      <div className="mt-12 text-center">
        <Link to="/blogs/all" viewTransition className="btn">
          View all blogs <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default BlogSection;
