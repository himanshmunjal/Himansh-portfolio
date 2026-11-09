import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '@/components/common/SEO';
import SectionHeading from '@/components/notebook/SectionHeading';
import PostCard, { LeadPost } from '@/components/notebook/PostCard';
import { allBlogs } from '@/data/blogs';

// Tags that appear on more than one post make useful filters
const tagCounts = allBlogs.flatMap((b) => b.tags).reduce<Record<string, number>>((acc, t) => {
  acc[t] = (acc[t] ?? 0) + 1;
  return acc;
}, {});
const filterTags = ['All', ...Object.keys(tagCounts).filter((t) => tagCounts[t] > 1).sort(), ...Array.from(new Set(allBlogs.map((b) => b.category)))];

const AllBlogs: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState('All');

  const filteredBlogs =
    selectedTag === 'All'
      ? allBlogs
      : allBlogs.filter(
          (blog) => blog.category === selectedTag || blog.tags.some((tag) => tag.toLowerCase().includes(selectedTag.toLowerCase()))
        );
  const [lead, ...rest] = filteredBlogs;

  return (
    <>
      <SEO
        title="Blog"
        description="Long-form notes by Himansh Munjal on machine learning, NLP, MLOps, concurrency and full-stack engineering."
        url="/blogs/all"
      />

      <div className="wrap pb-10 pt-28 sm:pt-32">
        <Link to="/#blog" viewTransition className="meta mb-10 inline-flex items-center gap-2 hover:text-ink">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to the notebook
        </Link>

        <SectionHeading n="B" kicker="Appendix" title={<>Every <em className="text-accent">entry</em></>} note={`${allBlogs.length} entries and counting`}>
          Real-world lessons from building AI systems: the failures, the rewrites, and what actually works in production.
        </SectionHeading>

        <div className="mb-12 flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
          {filterTags.map((t) => (
            <button key={t} type="button" className="chip" aria-pressed={selectedTag === t} onClick={() => setSelectedTag(t)}>
              {t === 'All' ? 'All' : t}
            </button>
          ))}
        </div>

        {lead ? (
          <>
            <LeadPost post={lead} />
            {rest.length > 0 && (
              <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {rest.map((post, i) => (
                  <PostCard key={post.slug} post={post} tilt={[-1, 1.2, -0.6][i % 3]} />
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="hand py-16 text-center text-3xl">No entries with that tag — yet.</p>
        )}
      </div>
    </>
  );
};

export default AllBlogs;
