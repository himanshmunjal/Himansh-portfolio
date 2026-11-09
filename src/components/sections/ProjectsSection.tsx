import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/notebook/SectionHeading';
import ExperimentCard from '@/components/notebook/ExperimentCard';
import { allProjects, expNo, shortTitle } from '@/data/projects';

// The top five get the same card each; the rest are listed in the index, which opens /projects/all
const cards = allProjects.slice(0, 5);
const rest = allProjects.slice(5);

const ProjectsSection: React.FC = () => (
  <section id="projects" className="relative scroll-mt-16 py-24 sm:py-32">
    <div className="wrap">
      <SectionHeading
        n="04"
        kicker="Projects"
        title={<>Experiments, <em className="text-accent">with results</em></>}
        note="question → method → result, every time"
      >
        Each project is logged the same way: the question it set out to answer, how I approached it, and what came
        out. Where there&apos;s a number, it was measured.
      </SectionHeading>

      <div>
        <div className="mb-10 flex flex-wrap items-end justify-end gap-4">
          <Link to="/projects/all" viewTransition className="link hidden items-center gap-2 text-sm sm:inline-flex">
            All {allProjects.length} experiments <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((p) => (
            <ExperimentCard key={p.id} project={p} />
          ))}

          {/* The rest of the index; every row opens the full list */}
          <aside className="sheet ruled reveal relative flex flex-col p-6 pt-5">
            <p className="eyebrow"><span className="accent">Index</span> · also in the notebook</p>
            <ol className="mt-4 flex-1">
              {rest.map((p) => (
                <li key={p.id}>
                  <span className="flex h-[28px] items-baseline gap-3 text-[0.9375rem]">
                    <span className="meta accent w-12 shrink-0">{expNo(p.id)}</span>
                    <Link to="/projects/all" viewTransition className="block truncate text-ink transition-colors hover:text-accent">
                      {shortTitle(p.title)}
                    </Link>
                    {p.ongoing && <span className="meta ml-auto shrink-0">· wip</span>}
                  </span>
                </li>
              ))}
            </ol>
            <Link to="/projects/all" viewTransition className="btn mt-6 self-start">
              Open the full index <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </div>
    </div>
  </section>
);

export default ProjectsSection;
