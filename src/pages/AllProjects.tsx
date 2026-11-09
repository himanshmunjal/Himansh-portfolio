import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '@/components/common/SEO';
import SectionHeading from '@/components/notebook/SectionHeading';
import ExperimentCard from '@/components/notebook/ExperimentCard';
import { allProjects } from '@/data/projects';

const categories = ['All', ...Array.from(new Set(allProjects.map((p) => p.category)))];

const stats = [
  { value: allProjects.length, label: 'Total Projects' },
  { value: allProjects.filter((p) => p.ongoing).length, label: 'Ongoing' },
  { value: new Set(allProjects.flatMap((p) => p.tech)).size, label: 'Technologies' },
  { value: categories.length - 1, label: 'Categories' },
];

const AllProjects: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const shown = useMemo(() => (filter === 'All' ? allProjects : allProjects.filter((p) => p.category === filter)), [filter]);

  return (
    <>
      <SEO
        title="All Projects"
        description="Every project by Himansh Munjal, logged as an experiment: the question, the method and the result. Machine learning, NLP, systems, full stack and iOS."
        url="/projects/all"
      />

      <div className="wrap pb-10 pt-28 sm:pt-32">
        <Link to="/#projects" viewTransition className="meta mb-10 inline-flex items-center gap-2 hover:text-ink">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to the notebook
        </Link>

        <SectionHeading n="A" kicker="Appendix" title={<>The full <em className="text-accent">lab index</em></>} note="every experiment, in one place">
          All {allProjects.length} projects, each written up as an experiment. Open any card for the full entry: what it is, how
          it&apos;s built, the architecture and the results.
        </SectionHeading>

        <dl className="reveal mb-12 grid grid-cols-2 border-y rule sm:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`flex flex-col-reverse py-5 ${i % 2 ? 'border-l border-dashed rule pl-5' : ''} ${i === 2 ? 'sm:border-l sm:border-dashed sm:pl-5' : ''}`}>
              <dt className="meta">{s.label}</dt>
              <dd className="serif text-5xl leading-none text-ink">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {categories.map((c) => (
            <button key={c} type="button" className="chip" aria-pressed={filter === c} onClick={() => setFilter(c)}>
              {c}
              <span className="ml-1.5 tabular-nums">
                {c === 'All' ? allProjects.length : allProjects.filter((p) => p.category === c).length}
              </span>
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {shown.map((p) => (
            <ExperimentCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllProjects;
